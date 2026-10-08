
const { customTest } = require('../utils/fixture.js')


customTest('Fixtures demo', async ({ authenticatedPage }) => {

    //Login -create order - verify if order is created from history page
    await authenticatedPage.locator(".card-body b").first().waitFor();
})