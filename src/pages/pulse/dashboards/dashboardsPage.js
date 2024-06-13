class DashboardsPage{
    constructor(page) {
        this.page = page;
    }
    
    get fillGlobalSearchBox(){
        return "[id='GlobalSearchBox']";
    }

    async searchGlobalSearchBox(traveler){
        await this.page.fill(this.fillGlobalSearchBox,traveler);
        // Locate the option by combining tag and text
        const option = await this.page.getByLabel(`${traveler}. Use right or left arrow keys to navigate to quick commands for this record.`);
        await option.click();
    }
}
export {DashboardsPage};