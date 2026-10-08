class APIUtils {

    constructor(apiContext, loginPayload) {

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json()
        token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder() {
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    Authorization: this.getToken(),
                    'Content-Type': 'application/json',
                }
            })

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        orderId = orderResponseJson.orders[0];
        return orderId;

    }
}
module.exports = {APIUtils};