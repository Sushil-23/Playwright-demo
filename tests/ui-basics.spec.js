const {test, expect}=require('@playwright/test')


test('Browser Playwright Test', async ({ browser })=> {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username')
    const password = page.locator('#password')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    await userName.fill('rahulshetty')
    await password.fill('Learning@830$3mK2')
    await signIn.click()
    const errorMessage = await page.locator('div[style*="display: block"]').textContent()
    await expect(page.locator('div[style*="display: block"]')).toContainText('Incorrect username/password.')
    await userName.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2')
    await signIn.click()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop')
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.allInnerTexts())
    
})

test('Page Playwright Test', async ({ page })=> {

    await page.goto('https://www.google.com/')
    await expect(page).toHaveTitle('Google')
})