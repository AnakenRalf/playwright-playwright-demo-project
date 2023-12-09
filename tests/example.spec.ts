import { test, expect } from '@playwright/test'
import { loadingHomePage, assertTitle } from '../helpers'

// skip this test

test.skip('Selectors', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // get element by visible text
  await page.click('text=Get started')

  // css selector
  await page.click('button')
  //id
  await page.click('#id')
  //class
  await page.click('.class')

  // Only visible
  await page.click('.submit-button:visible')

  // Combination of css
  await page.click('#id .classFirst')

  //xpath
  await page.click('//button')
})

test.describe('My first suit of tests', () => {
  let URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo'

  test('work with inputs @smoke-test', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo')

    await page.fill('#user-message', 'Hello there')

    await page.click('#showInput')
    await expect(page.locator('#message')).toContainText('Hello there')
  })

  test('assertions', async ({ page }) => {
    let URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo'
    await page.goto(URL)
    await expect(page).toHaveURL(URL)
    await expect(page).toHaveTitle('Selenium Grid Online | Run Selenium Test On Cloud')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Simple Form Demo')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h6')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe('My second suit of tests', () => {
  test.beforeEach(async ({ page }) => {
    let URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo'
    await page.goto(URL)
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('single elem screenshot', async ({ page }) => {
    const element = await page.$('h1')
    await element.screenshot({ path: 'screenshot-single-elem.png' })
  })
})

test.only('custom helpers', async ({ page }) => {
  await loadingHomePage(page)
  await assertTitle(page)
})
