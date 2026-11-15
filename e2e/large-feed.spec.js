import { expect, test } from '@playwright/test'

/*
Почему здесь Playwright, а не Vitest?
Потому что проверяется поведение, зависящее от реального браузера: прокрутка, размеры элементов, их положение и срабатывание IntersectionObserver.
jsdom не воспроизводит полноценную геометрию страницы и настоящую прокрутку. Можно имитировать IntersectionObserver в Vitest, но это уже не будет проверкой реальной автоподгрузки при прокрутке.
*/
test('подгружает следующую страницу ленты при прокрутке', async ({ page }) => {
  await page.goto('/places/feed')

  await page.getByRole('button', { name: 'Автоподгрузка' }).click()

  await expect(page.getByText('Загружено карточек: 20 из 2000')).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(20)

  await page.getByRole('article').last().hover()
  await page.mouse.wheel(0, 2000)

  await expect(page.getByRole('article')).toHaveCount(40)
  await expect(page.getByText('Загружено карточек: 40 из 2000')).toBeVisible()
})
