export async function loadingHomePage(page) {
  let URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo'
  await page.goto(URL)
}

export async function assertTitle(page) {
  await page.waitForSelector('h6')
}
