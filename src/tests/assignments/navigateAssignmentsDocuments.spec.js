import {test} from "@playwright/test";
import {AssignmentsPage} from "../../pages/assignments/assignmentsPage";
import {LoginPage} from "../../pages/login/loginPage";
import {BasePage} from "../../pages/login/basePage";
import {getConfig} from "../../../config";

test('[194171] CWA Navigation-Assignments Documents @smoke-uat-default @smoke-qa-default',async ({page}) => {
    // Create an instance of the Assignments Page class, passing the 'page' object to the constructor
    const assignmentsPage = new AssignmentsPage(page);
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Retrieve configuration data for the base URL and login credentials
    const {baseUrl, AssignmentUsername, Assignmentpassword} = getConfig('ciroClinician');

    // Navigate to the base URL
    await page.goto(baseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();
    
    // Enter UserName, Password & Click on Submit button.
    await loginPage.enterCredentials(AssignmentUsername,Assignmentpassword)
    await loginPage.clickSubmit();

    // Select Assignments Link
    await assignmentsPage.assignmentsLink.click();

    // Validate the Assignments Page breadcrumb
    await assignmentsPage.waitForBreadcrumbAssignments();

    // Validate the Assignment Documents Page
    await assignmentsPage.validateAssignmentDocumentsPage();
});