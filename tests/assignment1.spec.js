import {test, expect} from '@playwright/test';

test('Lesson 1 assignment', async ({ page })=>{

    await page.goto('https://playwright.dev/')

    await expect(page).toHaveTitle(/Playwright/)

    await page.getByRole('link', {name: 'Get started'}).click()

    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible()
})