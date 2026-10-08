import {expect} from '@playwright/test'

export class LoginPage {

    constructor(page){
        this.page = page
        this.username = "#email1"
        this.password = "#password1"
        this.signinbutton = ".submit-btn"
        this.header = ".content h2"
    }

    async loginToApplication(){

        await this.page.fill(this.username, "admin@email.com")
        await this.page.fill(this.password, "admin@123")
        await this.page.click(this.signinbutton)
    }

    async verifySignIn(){
        await expect(this.page.locator(this.header)).toBeVisible();
    }
}