import { expect, Locator, Page } from '@playwright/test'

export class InventoryPage {
  readonly page: Page
  readonly addToCartButtons: Locator
  readonly shoppingCartLink: Locator
  readonly shoppingCartBadge: Locator
  readonly removeButtons: Locator
  readonly checkoutButton: Locator
  readonly firstNameInput: Locator
  readonly logoutButton: Locator
  readonly hamburgerBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.addToCartButtons = page.locator('.btn_inventory')
    this.shoppingCartLink = page.locator('#shopping_cart_container a')
    this.shoppingCartBadge = page.locator('.shopping_cart_badge')
    this.removeButtons = page.locator('.btn_inventory')
    this.checkoutButton = page.locator('#checkout')
    this.firstNameInput = page.locator('#first-name')
    this.logoutButton = page.locator('#logout_sidebar_link')
    this.hamburgerBtn = page.locator('#react-burger-menu-btn')
  }

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
}
