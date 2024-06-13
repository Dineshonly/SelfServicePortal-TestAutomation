class TimesheetsPage {

    constructor(page) {
        this.page = page;
        this.timesheetsLink = page.getByRole('link',{name:'Timesheets'});
        this.timesheetsLinkHeader = page.locator('h2',{hasText:'Timesheets'});
    }
    
    // Functions/Methods 

}
export {TimesheetsPage};