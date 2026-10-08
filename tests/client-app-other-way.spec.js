import {test, expect} from '@playwright/test';

test('Client app login', async ({ page })=> {
    const emailId = "ksushil@gmail.com"
    const email = page.getByPlaceholder('email@example.com')
    const password = page.getByPlaceholder('enter your passsword')
    const loginBtn = page.locator('#login')
    const products = page.locator('div.card-body')
    const productTitles = page.locator('.card-body b')
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await expect(page).toHaveTitle("Let's Shop")
    await email.fill(emailId)
    await password.fill('Qwerty@123')
    await loginBtn.click()
    await productTitles.first().waitFor()

    await products.filter({hasText: 'ZARA COAT 3'}).getByRole('button', {name: 'Add To Cart'}).click()
    
    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click()

    await page.locator('.cart').first().waitFor()
    await expect(page.getByText('ZARA COAT 3')).toBeVisible()
    await page.getByRole('button', {name: 'Checkout'}).click()

    await page.getByPlaceholder('Select Country').pressSequentially('ind', {delay: 200})
    
    await page.getByRole('button', {name: 'India'}).nth(1).click()
    await expect(page.locator('[style*="lightgray"]')).toHaveText(emailId)
    await page.getByText('PLACE ORDER').click()

    await page.locator('td.box').first().waitFor();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible()

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    const actualOrderId = orderId.split('|')[1].trim()
    console.log("order id : "+actualOrderId)
    await page.locator('button[routerlink*="myorders"]').click()

    await page.locator('tbody tr').first().waitFor()

    const rows = await page.locator('tbody tr')
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