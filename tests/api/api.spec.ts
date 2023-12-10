import { test, expect } from '@playwright/test'

test.describe.parallel('API', () => {
  let URL = 'https://reqres.in/api/'

  test('Simple API test - Assert Responce Status', async ({ request }) => {
    const response = await request.get(URL + 'users/2')
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
  })

  test('Simple API test - Assert Invalid endpoint', async ({ request }) => {
    const response = await request.get(URL + 'users/2sdfggsdfgsdfgg')
    expect(response.status()).toBe(404)
    expect(response.ok()).toBeFalsy()
  })

  test('Simple API test - Assert Responce JSON Schema', async ({ request }) => {
    const response = await request.get(URL + 'users/2')
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
    const responceBody = JSON.parse(await response.text())
    // console.log(responceBody)
    expect(responceBody.data.id).toBe(2)
    expect(responceBody.data.first_name).toBe('Janet')
    expect(responceBody.data.email).toBe('janet.weaver@reqres.in')
  })

  test('POST request', async ({ request }) => {
    const response = await request.post(URL + 'users', {
      data: {
        id: 1230000,
      },
    })
    expect(response.status()).toBe(201)
    expect(response.ok()).toBeTruthy()
    const responceBody = JSON.parse(await response.text())
    // console.log(responceBody)
    expect(responceBody.id).toBe(1230000)
    // If data is unic generated - than just check it's existing in data. Not possible to parce answer and compare
    expect(responceBody.createdAt).toBeTruthy()
  })

  test('POST request login', async ({ request }) => {
    const response = await request.post(URL + 'login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    expect(response.status()).toBe(200)
    const responceBody = JSON.parse(await response.text())
    console.log(responceBody)
    expect(responceBody.token).toBeTruthy()
  })

  test('POST reauest Login - failure', async ({ request }) => {
    const response = await request.post(URL + 'login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: '',
      },
    })
    expect(response.status()).toBe(400)
    const responceBody = JSON.parse(await response.text())

    expect(responceBody.error).toBe('Missing password')
  })

  test('PUT - update user', async ({ request }) => {
    const response = await request.put(URL + 'users/2', {
      data: {
        name: 'morpheus',
        job: 'zion resident',
      },
    })
    expect(response.status()).toBe(200)
    const responceBody = JSON.parse(await response.text())
    expect(responceBody.name).toBe('morpheus')
    expect(responceBody.job).toBe('zion resident')
  })

  test('DELETE request', async ({ request }) => {
    const response = await request.delete(URL + 'users/2')
    expect(response.status()).toBe(204)
  })
})
