class Refer_EarnPage {

    constructor(page) {
        this.page = page;
        this.referEarnLink = page.getByRole('link',{name:'Refer & Earn'});
        this.referEarnLinkHeader = page.locator('h2',{hasText:'Refer and Earn'});

    }
    
    // Functions/Methods 

}
export {Refer_EarnPage};