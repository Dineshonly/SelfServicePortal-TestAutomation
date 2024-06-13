// @ts-check
import {test} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {BackgroundCheckAuthorizationPage} from "../../../pages/requiredDocuments/backgroundCheckAuthorizationPage";
import {performLoginCiroClinician} from "../../../../testBase";

test('[157745] Open the Background Check Authorization form @smoke-uat-new-user @smoke-prod-new-user @smoke-qa-new-user',async ({page}) => {

    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);
    const backgroundCheckAuthorizationPage = new BackgroundCheckAuthorizationPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.clickEnvironmentDocumentLink();

    // Driver's License Front Side
    await employmentDocumentsPage.searchBar.fill('Background Check Authorization');
    
    // Select Background Check Authorization
    // Create promise to wait for popup
    await backgroundCheckAuthorizationPage.validateNewTabPage();
})