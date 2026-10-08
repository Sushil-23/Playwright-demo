import {test, expect, request} from '@playwright/test';
const {ApiUtils}=require('../utils/ApiUtils')
const loginPayload = {userEmail:"ksushil@gmail.com",userPassword:"Qwerty@123"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960ea76c941646b7a8b3dd5"}]}

let token;
let orderId;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    apiUtils.createOrder(orderPayload)   

});

test('Place the order', async ({ page })=> {
    const emailId = "ksushil@gmail.com"
    // const email = page.locator('#userEmail')
    // const password = page.locator('#userPassword')
    // const loginBtn = page.locator('#login')
    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await expect(page).toHaveTitle("Let's Shop")
    // await email.fill(emailId)
    // await password.fill('Qwerty@123')
    // await loginBtn.click()
    // await expect(page).toHaveURL(/dashboard/);
    const apiUtils = new APIUtils(apiContext, loginPayload)
    const orderId = createOrder(orderPayload)
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('button[routerlink*="myorders"]').click()
    await page.locator('tbody tr').first().waitFor()

    const rows = page.locator('tbody tr')
    for(let i = 0; i< await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click()
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent()
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
})