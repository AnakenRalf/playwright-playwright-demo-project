import { test, expect } from '@playwright/test'
import { InventoryPage } from '../../page-objects/InventoryPage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Order complete', () => {
  let loginPage: LoginPage
  let inventoryPage: InventoryPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await inventoryPage.goto()
    await inventoryPage.validatePageURL()
  })

  test('Process order', async ({ page }) => {
    await inventoryPage.addToShoppingCart()
    await inventoryPage.openShoppingCart()
    await inventoryPage.checkOutBtnClick()
    await inventoryPage.fillOrderForm('test', 'name', '123456')
    await inventoryPage.continueBtnClick()

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
