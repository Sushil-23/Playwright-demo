import {test, expect} from '@playwright/test';

test('Popup validation', async({ page })=> {
    
    const hideShowInputField = page.locator('input#displayed-text');
    const hideBtn = page.locator('#hide-textbox');
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(hideShowInputField).toBeVisible();
    await hideBtn.click()
    await expect(hideShowInputField).toBeHidden();
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Hello , share this practice page and share your knowledge');
        await dialog.accept()
    
    });
    await page.locator('input#alertbtn').click()

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('ul.navigation li a[href*="lifetime-access"]:visible').click();

    const xyz = await framePage.locator('div.text h2').textContent();
    console.log(xyz.split(' ')[1].split(' ')[0])
})