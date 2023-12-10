import { test, expect } from '@playwright/test'
import { loginToPage } from '../../helpers'

test.describe('Sorting filter possibility', () => {
  // BEFORE
  test.beforeEach(async ({ page }) => {
    loginToPage(page)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  // TESTS
  test('Filter by A to Z', async ({ page }) => {
    await page.locator('[data-test="product_sort_container"]').selectOption('az')

    const firstItemOnThePage = await page.locator(
      'xpath=/html/body/div[1]/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/a/div',
    )

    await expect(firstItemOnThePage).toHaveText('Sauce Labs Backpack')

    await page.locator('[data-test="product_sort_container"]').selectOption('za')

    const lastItemOnThePage = await page.locator(
      'xpath=/html/body/div[1]/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/a/div',
    )

    await expect(lastItemOnThePage).toHaveText('Test.allTheThings() T-Shirt (Red)')
  })
})
