import { test, expect } from '@playwright/test'
import { loginToPage } from '../../helpers'

test.describe('Order complete', () => {
  test.beforeEach(async ({ page }) => {
    await loginToPage(page)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })

  test('Process order', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('a').filter({ hasText: '1' }).click()
    await page.locator('[data-test="checkout"]').click()
    await page.locator('[data-test="firstName"]').click()
    await page.locator('[data-test="firstName"]').fill('test')
    await page.locator('[data-test="lastName"]').click()
    await page.locator('[data-test="lastName"]').fill('name')
    await page.locator('[data-test="postalCode"]').click()
    await page.locator('[data-test="postalCode"]').fill('123456')
    await page.locator('[data-test="continue"]').click()
    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    await expect(page.locator('[data-test="finish"]')).toBeVisible()
    await page.locator('[data-test="finish"]').click()
    await expect(page.getByRole('img', { name: 'Pony Express' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible()
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
    await expect(page.getByText('Your order has been')).toBeVisible()
    await page.locator('[data-test="back-to-products"]').click()
    await expect(page.getByText('Swag Labs')).toBeVisible()
  })
})

// Interact with Keyboard
// use page.fill('.selector', 'data to input')
// use page.keyboard.press('Enter')

// Count of exact numbers of elements
// const numberOfLinks = await page.locator('ul > a')
// await expect(numberOfLinks).toHaveCount(3)

// option select
// await page.selectOption('[data-test="product_sort_container"]', 'az')
