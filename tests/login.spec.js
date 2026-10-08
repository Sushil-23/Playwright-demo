import { test, expect } from '@playwright/test'
const testdata = JSON.parse(JSON.stringify(require('../logindata.json')))

test.describe("Data Drivern Login Test", () => {

    for (const data of testdata) {

        test.describe(`Login with user with id = ${data.id}`, () => {

            test("Login to application", async ({ page }) => {

                await page.goto('https://freelance-learn-automation.vercel.app/login');
                await page.getByPlaceholder('Enter Email').fill(data.username)
                await page.getByPlaceholder('Enter Password').fill(data.password)
                await page.getByRole('button', { name: 'Sign in' }).click()
            })

        });
    }


})
