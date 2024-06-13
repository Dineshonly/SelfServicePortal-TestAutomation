class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    // You can add more generic methods here
    async waitForPageLoad() {
        await this.page.waitForLoadState("load");
    }

}

export {BasePage};