import { test, expect } from '@playwright/test'
import { getAppSlugs } from '../../lib/getApps.js'

// Visual regression snapshots.
// Baselines live next to this file under __screenshots__/. First run creates them;
// later runs fail if the rendered page drifts beyond the tolerance below.
//
// Regenerate baselines intentionally with:
//   pnpm test:visual:update

const firstAppSlug = getAppSlugs()[0]

const routes = [
  { name: 'home', path: '/' },
  { name: 'planners', path: '/planners' },
  { name: 'app-detail', path: `/apps/${firstAppSlug}` },
]

for (const route of routes) {
  test(`visual: ${route.name}`, async ({ page }, testInfo) => {
    await page.goto(route.path)
    await page.waitForLoadState('networkidle')
    // Kill animations so screenshots are deterministic.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `,
    })
    // Small settle to let layout stabilize post-style injection.
    await page.waitForTimeout(300)

    const shot = await page.screenshot({ fullPage: true, animations: 'disabled' })
    expect(shot).toMatchSnapshot(`${route.name}-${testInfo.project.name}.png`, {
      maxDiffPixelRatio: 0.02,
    })
  })
}
