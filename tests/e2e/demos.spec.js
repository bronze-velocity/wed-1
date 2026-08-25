import { test, expect } from '@playwright/test'

// Interactive-demo mount test.
// The Love Letter Machine is the primary interactive demo on the homepage;
// its client-side hydration is the highest-risk piece of the marketing site.
// We verify:
//   - The page loads without console errors.
//   - The "Try it yourself →" button is present and clickable.
//   - Clicking it transitions the demo out of auto mode (the "Watch the auto-demo"
//     restart button appears — the copy on the restart CTA is the reliable
//     signal that interactive mode is engaged).

test.describe('homepage demos', () => {
  test('Love Letter Machine mounts and enters interactive mode', async ({ page }) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
    })

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const tryBtn = page.getByRole('button', { name: /try it yourself/i })
    await expect(tryBtn).toBeVisible({ timeout: 10_000 })
    await tryBtn.click()

    // After entering interactive mode the CTA swaps to the "watch the auto-demo" restart button.
    const restartBtn = page.getByRole('button', { name: /watch the auto-demo/i })
    await expect(restartBtn).toBeVisible({ timeout: 5_000 })

    // Filter out known noisy sources (e.g. third-party analytics blocked by browser).
    const relevant = errors.filter(
      (e) => !/posthog|analytics|favicon/i.test(e),
    )
    expect(relevant, `unexpected console errors:\n${relevant.join('\n')}`).toEqual([])
  })
})
