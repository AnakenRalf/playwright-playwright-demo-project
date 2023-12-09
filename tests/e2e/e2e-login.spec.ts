import { test, expect } from '@playwright/test'

test.describe('Login / Logout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
  })

  // negative
  test('Login error on empty fields', async ({ page }) => {
    const loginBtn = await page.locator('#login-button')
    await expect(loginBtn).toBeEnabled()
    await loginBtn.click()
    await expect(page.locator('h3')).toContainText('Epic sadface: Username is required')
  })

  test('Login error on empty password', async ({ page }) => {
    const userNameField = await page.locator('#user-name')
    await userNameField.fill('standard_user')
    const loginBtn = await page.locator('#login-button')
    await expect(loginBtn).toBeEnabled()
    await loginBtn.click()
    await expect(page.locator('h3')).toContainText('Epic sadface: Password is required')
  })

  //positive + logout

  test('Login success + logout', async ({ page }) => {
    const userNameField = await page.locator('#user-name')
    const passwordField = await page.locator('#password')
    const loginBtn = await page.locator('#login-button')

    await userNameField.fill('standard_user')
    await passwordField.fill('secret_sauce')
    await loginBtn.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    const hamburgerBtn = await page.locator('#react-burger-menu-btn')
    await hamburgerBtn.click()

    const logoutBtn2 = await page.locator('#logout_sidebar_link')
    await logoutBtn2.click()
    await expect(page).toHaveURL('https://www.saucedemo.com/')
  })
})
