import {test, expect} from '@playwright/test';

test('Client app login', async ({ page })=> {
    const emailId = "ksushil@gmail.com"
    const email = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('#login')
    const products = page.locator('.card-body')
    const productTitles = page.locator('.card-body b')
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(page).toHaveTitle("Let's Shop")
    await email.fill(emailId)
    await password.fill('Qwerty@123')
    await loginBtn.click()
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('.card-body b').first()).toBeVisible();
    const count = await products.count();
    for(let i = 0; i<count; i++){
        const title = await products.nth(i).locator('b').textContent()
        if(title.trim().toUpperCase() === "ZARA COAT 3"){
            await products.nth(i).locator('text= Add To Cart').click()
            break;
        }
    }
    
    await page.locator('[routerlink*="cart"]').click()
    await page.locator('.cart').first().waitFor()
    expect(await page.locator('h3:has-text("ZARA COAT 3")').isVisible()).toBeTruthy()
    await page.locator('button:has-text("Checkout")').click()

    await page.locator('[placeholder="Select Country"]').pressSequentially('ind', {delay: 200})
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator('button').count()

    for(let i = 0; i<optionsCount; i++){
        const text = await dropdown.locator('button').nth(i).textContent()
        if(text.trim() === 'India'){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    await expect(page.locator('[style*="lightgray"]')).toHaveText(emailId)
    await page.locator('a.action__submit').click()

    await page.locator('td.box').first().waitFor();
    await expect(page.locator('h1.hero-primary')).toHaveText("Thankyou for the order.")
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    const actualOrderId = orderId.split('|')[1].trim()
    console.log("order id : "+actualOrderId)
    await page.locator('button[routerlink*="myorders"]').click()

    await page.locator('tbody tr').first().waitFor()

    const rows = page.locator('tbody tr')
    for(let i = 0; i< await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        console.log("Row order id : "+rowOrderId)
        if(actualOrderId === rowOrderId){
            await rows.nth(i).locator('button:has-text("View")').click()
            break;
        }
    }

    await expect(page.locator('div.col-text')).toContainText(actualOrderId);
})