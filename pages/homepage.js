import {expect} from '@playwright/test'

export class HomePage {

    constructor(page){

        this.page = page;
        this.menu = "img[alt='menu']";
        this.signoutbutton = ".sidebar-menu button";
        this.manageoption = ".nav-menu-item-manage"
    }

    async logoutFromApplication(){
        await this.page.click(this.menu);
        await this.page.click(this.signoutbutton);
    }

    async verifyManageOption(){
        await expect(this.page.locator(this.manageoption)).toBeVisible();
    }


}