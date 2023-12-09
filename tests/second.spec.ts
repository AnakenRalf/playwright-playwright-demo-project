import { test, expect } from '@playwright/test'

test.describe('My second suit of tests', () => {
  test('Incredble first smoke test @smoke-test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo')

    await page.fill('#user-message', 'Hello there')

    await page.click('#showInput')
    await expect(page.locator('#message')).toContainText('Hello there')
  })
})
