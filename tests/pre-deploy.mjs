// Pre-deploy test runner.
// 1. Builds the app (unless --skip-build).
// 2. Boots a production server on PORT (default 3999).
// 3. Runs, in sequence: route smoke, contact API contract, Playwright e2e.
// 4. Tears the server down and exits with the aggregate status.
//
// Usage:
//   node tests/pre-deploy.mjs
//   node tests/pre-deploy.mjs --skip-build
//   node tests/pre-deploy.mjs --skip-e2e         (skip Playwright entirely)
//   node tests/pre-deploy.mjs --skip-visual      (skip only the visual specs)
//   node tests/pre-deploy.mjs --update-snapshots (refresh visual baselines)

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const argv = new Set(process.argv.slice(2))
const flag = (name) => argv.has(`--${name}`)

const PORT = Number(process.env.PRE_DEPLOY_PORT || 3999)
const HOST = '127.0.0.1'
const BASE = `http://${HOST}:${PORT}`

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', cwd: ROOT, ...opts })
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} → exit ${code}`))))
    p.on('error', reject)
  })
}

async function waitForReady(url, timeoutMs = 60_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await sleep(500)
  }
  throw new Error(`server did not become ready at ${url} within ${timeoutMs}ms`)
}

async function main() {
  const results = []

  if (!flag('skip-build')) {
    console.log('\n=== [1/4] next build ===')
    await run('pnpm', ['exec', 'next', 'build'])
  } else {
    console.log('\n=== [1/4] next build — skipped ===')
  }

  console.log(`\n=== booting: next start -H ${HOST} -p ${PORT} ===`)
  const server = spawn('pnpm', ['exec', 'next', 'start', '-H', HOST, '-p', String(PORT)], {
    cwd: ROOT,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      // Disables the rate limiter (contact route) and forces the mailer's
      // log-only fallback so no real SMTP is attempted during tests.
      CONTACT_TEST_MODE: '1',
      SMTP_HOST: '',
      SMTP_USER: '',
      SMTP_PASS: '',
    },
  })

  server.on('exit', (code) => {
    if (code !== null && code !== 0 && !server.__killedIntentionally) {
      console.error(`server exited unexpectedly with code ${code}`)
    }
  })

  try {
    await waitForReady(BASE)
    console.log(`\n=== server ready at ${BASE} ===`)

    async function step(label, fn) {
      console.log(`\n=== ${label} ===`)
      try {
        await fn()
        results.push({ label, ok: true })
      } catch (e) {
        results.push({ label, ok: false, error: e.message })
      }
    }

    await step('[2/4] route smoke', () =>
      run('node', ['tests/smoke-routes.mjs', `--base=${BASE}`]),
    )
    await step('[3/4] contact API', () =>
      run('node', ['tests/contact-api.mjs', `--base=${BASE}`]),
    )

    if (!flag('skip-e2e')) {
      const specs = ['e2e/demos.spec.js']
      if (!flag('skip-visual')) specs.push('e2e/visual.spec.js')
      const pwArgs = ['exec', 'playwright', 'test', '--config=tests/playwright.config.js', ...specs]
      if (flag('update-snapshots')) pwArgs.push('--update-snapshots')
      await step('[4/4] playwright', () =>
        run('pnpm', pwArgs, { env: { ...process.env, SMOKE_BASE: BASE } }),
      )
    } else {
      console.log('\n=== [4/4] playwright — skipped ===')
    }
  } finally {
    server.__killedIntentionally = true
    server.kill('SIGTERM')
    await sleep(500)
    if (!server.killed) server.kill('SIGKILL')
  }

  console.log('\n=== summary ===')
  for (const r of results) {
    console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.label}${r.error ? `  —  ${r.error}` : ''}`)
  }
  const failed = results.filter((r) => !r.ok).length
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error('[pre-deploy] fatal:', err)
  process.exit(1)
})
