import { expect, test } from '@playwright/test'

test('Открывает страницу Санторини и возвращается к списку', async ({ page }) => {
  await page.goto('/places')

  await page.getByRole('link', { name: 'Санторини' }).click()

  await expect(page).toHaveURL('/places/1')
  await expect(page.getByRole('heading', { level: 1, name: 'Санторини' })).toBeVisible()

  await page.getByRole('link', { name: 'Назад к списку' }).click()

  await expect(page).toHaveURL('/places')
  await expect(page.getByRole('link', { name: 'Санторини' })).toBeVisible()
})
