class LoyaltyPage {

    constructor(page) {
        this.page = page;
        this.loyaltyPageLink = page.getByRole('link',{name:'Loyalty'});
        this.loyaltyPageLinkHeader = page.locator('h1',{hasText:'Loyalty Bonus'});

    }
    
    // Functions/Methods 

}
module.exports = {LoyaltyPage};