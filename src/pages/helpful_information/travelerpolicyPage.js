class TravelerPolicyPage {

    constructor(page) {
        this.page = page;
        this.travelerPolicyLink = page.getByRole('link',{name:'Traveler Policy'});
        this.travelerPolicyLinkHeader = page.locator('h1',{hasText:'Traveler Policy'});
    }
    
    // Functions/Methods

}
export {TravelerPolicyPage};