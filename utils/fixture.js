const { test: base, expect } = require('@playwright/test');

exports.customTest = base.extend({
    authenticatedPage: async ({ browser }, use) => {

        const emailId = "ksushil@gmail.com";

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://rahulshettyacademy.com/client');

        await expect(page).toHaveTitle("Let's Shop");

        const email = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const loginBtn = page.locator('#login');

        await email.fill(emailId);
        await password.fill('Qwerty@123');
        await loginBtn.click();

        await page.waitForLoadState('networkidle');

        await use(page);
    }
});