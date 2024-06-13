class JobSearchPage {

    constructor(page) {
        this.page = page;
        this.assignmentsExpand = page.getByText('ASSIGNMENTS');
        this.jobSearchLink = page.getByRole('link',{name:'Job Search'});
        this.jobSearchLinkHeader = page.locator('h2',{hasText:'Jobs Search'});
        this.breadcrumbJobSearch = page.locator('span').filter({ hasText: 'Job Search' }).nth(1);
        this.jobCardClass = page.locator('xpath=//div[@class=\'jobs-card-left-content\']');
        this.yourJobTitleButton = page.getByRole('button', { name: 'Your job title' });
        this.yourSpecialtyButton = page.getByRole('button', { name: 'Your specialty' });
        this.selectLocationButton = page.getByRole('button', { name: 'Select Location' });
    }
    
    // Functions/Methods
    async getButtonElements() {
        return await this.page.locator('.sc-djTcra.dnFpSh').evaluateAll((elements) => elements);
    }
    async validateButtonText() {
        const buttonElements = await this.getButtonElements();
        const elementCount = buttonElements.length;

        console.log(`Found ${elementCount} elements with the specified button class.`);

        return elementCount;
    }
    
    async waitForBreadcrumbJobSearch(){
        const breadcrumbJobSearch = this.breadcrumbJobSearch;
        await breadcrumbJobSearch.waitFor();
    }

}
export {JobSearchPage};