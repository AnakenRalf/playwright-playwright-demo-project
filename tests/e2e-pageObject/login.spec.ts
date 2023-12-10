import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'

test.describe('Login / Logout flow', () => {
  let loginPage: LoginPage
  let inventoryPage: InventoryPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)

    await loginPage.goto()
  })

  // negative
  test('Login error on empty fields', async ({ page }) => {
    await loginPage.login('', '')
    await loginPage.assertErrorMessage('Epic sadface: Username is required')
  })

  test('Login error on empty password', async ({ page }) => {
    await loginPage.login('standard_user', '')
    await loginPage.assertErrorMessage('Epic sadface: Password is required')
  })

  //positive + logout

  test('Login success + logout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce')
    await inventoryPage.validatePageURL()
    await inventoryPage.logout()
    await loginPage.validatePageURL()
  })
})
