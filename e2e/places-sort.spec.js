import { expect, test } from '@playwright/test'

test('Сохраняет сортировку по названию после перезагрузки', async ({ page }) => {
  await page.goto('/places')

  await page.getByLabel('Сортировка').selectOption('title')

  await expect(page).toHaveURL('/places?sort=title')
  await expect(
    page.getByRole('article').first().getByRole('heading', { name: 'Амальфитанское побережье' }),
  ).toBeVisible()

  await page.reload()

  await expect(page.getByLabel('Сортировка')).toHaveValue('title')
  await expect(
    page.getByRole('article').first().getByRole('heading', { name: 'Амальфитанское побережье' }),
  ).toBeVisible()
})
