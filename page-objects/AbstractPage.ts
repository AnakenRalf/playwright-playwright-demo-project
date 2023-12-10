import { Page, expect } from '@playwright/test'

export class AbstractPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }
  async validatePageURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL)
  }
}
