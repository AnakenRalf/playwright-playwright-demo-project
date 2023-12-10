import { test, expect } from '@playwright/test'

test.describe('Visual tests', () => {
  test('Full page Snapshot', async ({ page }) => {
    await page.goto('https://www.toolsqa.com/selenium-training/')
    expect(await page.screenshot()).toMatchSnapshot('selenium-training.png')
  })

  test('Single element Snapshot', async ({ page }) => {
    await page.goto('https://www.toolsqa.com/selenium-training/')
    const element = await page.$('.enroll__heading')

    expect(await element.screenshot()).toMatchSnapshot('heading-page-selenium-training.png')
  })
})
