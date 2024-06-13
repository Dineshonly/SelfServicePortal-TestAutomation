import {expect} from "@playwright/test";
import AssertUtils from "../../utils/assertUtils";
import AssignmentTitles from '../../../fixtures/assignmentsdata/assignmentsTitle.json'
class AssignmentsPage {

    constructor(page) {
        this.page = page;        
        this.assignmentsLink = page.getByRole('link',{name:'Assignments'});
        this.assignmentsLinkHeader = page.locator('h2',{hasText:'Upcoming Assignments'});
        this.assignmentsBreadcrumb = page.locator('span').filter({ hasText: 'Assignments' }).nth(1);
        this.assignmentDocumentsHeader = page.locator('h3',{hasText:'Assignment Documents'});
    }
    
    // Functions/Methods    
    async waitForBreadcrumbAssignments(){
        const breadcrumbAssignments = this.assignmentsBreadcrumb;
        await breadcrumbAssignments.waitFor();
    }
    async validateAssignmentDocumentsPage(){
        try{
            // Create an instance of the AssertUtils Page class
            const assertUtils = new AssertUtils(this.page);
            
            //Read Assignment Title from fixtures - assignmentsTitle.json
            const environment = process.env.NODE_ENV;
            const AssignmentTitle = AssignmentTitles[environment];
            if (!AssignmentTitle) {
                throw new Error(`Invalid environment: ${environment}`);
            }
            
            //Click on Assignment Card
            await this.page.click(`text=${AssignmentTitle}`);
            console.log('Assignment Found');
 
            // Validate the Assignments Documents Page Header
            await this.assignmentDocumentsHeader.waitFor();
            await expect(this.assignmentDocumentsHeader).toBeVisible();
            
            try{
                // Validate the Assignments Documents Page breadcrumb   
                await assertUtils.validateCurrentCrumb(AssignmentTitle);
            } catch(error) {
                console.error(`Assignment Title is not matching: ${error}`);
            }
        } catch (error) {
            console.error(`No Assignments Found: ${error}`);
        }
     }    
}
export {AssignmentsPage};