export async function loadingHomePage(page) {
  let URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo'
  await page.goto(URL)
}

export async function assertTitle(page) {
  await page.waitForSelector('h6')
}

export async function loginToPage(page) {
  await page.goto('https://www.saucedemo.com/')
  const userNameField = await page.locator('#user-name')
  const passwordField = await page.locator('#password')
  const loginBtn = await page.locator('#login-button')

  await userNameField.fill('standard_user')
  await passwordField.fill('secret_sauce')
  await loginBtn.click()
}
