import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // define selectors
  // readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorText: Locator

  // Init selectors with constructor

  constructor(page: Page) {
    // this.page = page
    super(page)
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('#login-button')
    this.errorText = page.locator('.error-message-container > h3')
  }
  // Define login page methods

  // async validatePageURL() {
  //   await expect(this.page).toHaveURL('https://www.saucedemo.com/')
  // }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async assertErrorMessage(errorMessage) {
    await expect(this.errorText).toContainText(errorMessage)
  }
}
