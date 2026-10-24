import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  // M12: `/` redirect ke `/admin`; judul admin white-label "— Kagounga CMS".
  // Judulnya stabil di semua state DB (Create first user / Login / Dashboard).
  test('homepage redirects to admin', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveURL(/\/admin/)
    await expect(page).toHaveTitle(/Kagounga CMS/)
  })
})
