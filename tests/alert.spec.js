import {test, expect} from '@playwright/test';

test('Handle alert', async({ page })=> {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    page.on('dialog', async (dialog)=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Hello , share this practice page and share your knowledge');
        await dialog.accept();
    })
    await page.locator('input[id="alertbtn"]').click();
})

test.only('Handle confirm box', async({ page })=> {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    page.on('dialog', async (dialog)=>{
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Hello , Are you sure you want to confirm?');
        await dialog.dismiss();
    })
    await page.locator('input[id="confirmbtn"]').click();
})