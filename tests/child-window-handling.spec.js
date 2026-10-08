import { test, expect } from '@playwright/test';

test('Playwright Test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage();
    const userName = page.locator('#username')
    const documentLink = page.locator('[href*="documents-request"]')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')

    const [newPage] = await Promise.all([
        context.waitForEvent('popup'),
        documentLink.click(),
    ])

    const text = await newPage.locator('.red').textContent()
    const domain = text.split('@')[1].split(' ')[0]
    console.log(domain)
    await userName.fill(domain)
    console.log(await userName.inputValue());
    await page.pause();

})