import {test, expect} from '@playwright/test';

test('Playwright Test', async ({ page })=> {
    const userName = page.locator('#username')
    const password = page.locator('#password')
    const dropdown = page.locator('select.form-control')
    const radioButton = page.locator('input[value="user"]')
    const okButton = page.locator('#okayBtn')
    const termsAndCondition = page.locator('#terms')
    const documentLink = page.locator('[href*="documents-request"]')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    await userName.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2')
    dropdown.selectOption({ label: 'Consultant' })
    await radioButton.click()
    await expect(radioButton).toBeChecked();
    await okButton.click()
    await termsAndCondition.click()
    await expect(termsAndCondition).toBeChecked();
    await termsAndCondition.uncheck()
    expect(await termsAndCondition.isChecked()).toBeFalsy();
    expect(documentLink).toHaveAttribute('class', 'blinkingText')
    await signIn.click()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop')
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.allInnerTexts())
    
})