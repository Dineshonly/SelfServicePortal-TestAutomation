class AppsPage {

    constructor(page) {
        this.page = page;
        this.pulseApp = page.locator('[data-type="app-title"][title="Pulse"]');
    }
    async clickOnPulseApp(){
        await this.page.frameLocator('iframe[title="AppLandingPage"]').locator(this.pulseApp).click();
    }
}
export {AppsPage};