import {test, expect} from '@playwright/test';

test('special locators test', async({ page})=>{

    const iceCreamCheckbox = page.getByLabel('Check me out if you Love IceCreams!')
    const employed = page.getByLabel('Employed')
    const gender = page.getByLabel('Gender')
    const password = page.getByPlaceholder('Password')
    const submit = page.getByRole("button", { name: 'Submit' })
    const successMessage = page.getByText('Success! The Form has been submitted successfully!.')
    const shopLink = page.getByRole("link", { name : 'Shop'})

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await iceCreamCheckbox.click()
    await employed.check()
    await gender.selectOption('Female')
    await password.fill('Test@123')
    await submit.click()
    await expect(successMessage).toBeVisible();
    await shopLink.click();

    await page.locator('app-card').filter({ hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click()
})