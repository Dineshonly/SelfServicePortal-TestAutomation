class RewardsPage {

    constructor(page) {
        this.page = page;
        this.perksExpand = page.getByText('PERKS',{exact:true});
        this.rewardsLink = page.getByRole('link',{name:'Rewards'});
        this.rewardsLinkHeader = page.locator('h1',{hasText:'Total Points'});
        this.collectPointsTab = page.locator('#tabs--1--tab--0');
        this.historyTab = page.locator('#tabs--1--tab--1');
        this.socialMediaBanner = page.locator('h1',{hasText:'Connect your accounts to start gaining more points'});
        this.frequentlyAskedQuestions = page.locator('h1',{hasText:'Frequently Asked Questions'});
        this.viewTermsConditionsLink = page.getByRole('link',{name:'View Terms and Conditions'});
    }
    
    // Functions/Methods 

}
export {RewardsPage};