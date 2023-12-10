import { expect, Locator, Page } from '@playwright/test'

export class InventoryPage {
  readonly page: Page
  readonly addToCartButtons: Locator
  readonly shoppingCartLink: Locator
  readonly shoppingCartBadge: Locator
  readonly removeButtons: Locator
  readonly checkoutButton: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly logoutButton: Locator
  readonly hamburgerBtn: Locator
  readonly contunueBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.addToCartButtons = page.getByText('Add to cart')
    this.shoppingCartLink = page.locator('#shopping_cart_container a')
    this.shoppingCartBadge = page.locator('.shopping_cart_badge')
    this.removeButtons = page.locator('.btn_inventory')
    this.checkoutButton = page.locator('[data-test="checkout"]')
    this.firstNameInput = page.locator('[data-test="firstName"]')
    this.lastNameInput = page.locator('[data-test="lastName"]')
    this.postalCodeInput = page.locator('[data-test="postalCode"]')
    this.logoutButton = page.locator('#logout_sidebar_link')
    this.hamburgerBtn = page.locator('#react-burger-menu-btn')
    this.contunueBtn = page.locator('[data-test="continue"]')
  }

  // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  //   await page.locator('a').filter({ hasText: '1' }).click()
  //   await page.locator('[data-test="checkout"]').click()
  //   await page.locator('[data-test="firstName"]').click()
  //   await page.locator('[data-test="firstName"]').fill('test')
  //   await page.locator('[data-test="lastName"]').click()
  //   await page.locator('[data-test="lastName"]').fill('name')
  //   await page.locator('[data-test="postalCode"]').click()
  //   await page.locator('[data-test="postalCode"]').fill('123456')
  //   await page.locator('[data-test="continue"]').click()
  //   await expect(page.getByText('Checkout: Overview')).toBeVisible()
  //   await expect(page.locator('[data-test="finish"]')).toBeVisible()
  //   await page.locator('[data-test="finish"]').click()
  //   await expect(page.getByRole('img', { name: 'Pony Express' })).toBeVisible()
  //   await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible()
  //   await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
  //   await expect(page.getByText('Your order has been')).toBeVisible()
  //   await page.locator('[data-test="back-to-products"]').click()
  //   await expect(page.getByText('Swag Labs')).toBeVisible()

  async validatePageURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html')
  }

  async logout() {
    await this.hamburgerBtn.click()
    await this.logoutButton.click()
  }
  async addToShoppingCart() {
    await this.addToCartButtons.first().click()
  }
  async openShoppingCart() {
    await this.shoppingCartLink.click()
  }
  async checkOutBtnClick() {
    await this.checkoutButton.click()
  }
  async fillOrderForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName)
    await this.firstNameInput.press('Tab')
    await this.lastNameInput.fill(lastName)
    await this.firstNameInput.press('Tab')
    await this.postalCodeInput.fill(postalCode)
  }
  async continueBtnClick() {
    await this.contunueBtn.click()
  }
}
