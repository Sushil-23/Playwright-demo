import {test, expect} from '@playwright/test'

test('Handle iframe', async ({ page }) => {

    await page.goto('https://docs.oracle.com/javase/8/docs/api/');
    const iframe = await page.frameLocator('[name="packageListFrame"]')
    await iframe.locator('li a[href*="java/applet/package"]').click();

})