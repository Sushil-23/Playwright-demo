import {test, expect} from '@playwright/test'

test('Handle file upload', async ({ page }) => {

    await page.goto('https://practice.expandtesting.com/upload');
    await page.locator('#fileInput').setInputFiles('./upload/file-examples.jpg');
    await page.locator('#fileSubmit').click();
    await expect(page.locator('div.container h1')).toHaveText("File Uploaded!");

})