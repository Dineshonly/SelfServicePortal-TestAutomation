class MentalHealthResourcesPage {

    constructor(page) {
        this.page = page;
        this.mentalHealthResourcesLink = page.getByRole('link',{name:'Mental Health'});
        this.mentalHealthResourcesLinkHeader = page.locator('h3',{hasText:'Mental Health Resources for Travelers'});
    }
    
    // Functions/Methods 


}
export {MentalHealthResourcesPage};