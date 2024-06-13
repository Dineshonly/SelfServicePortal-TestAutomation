// @ts-check
import {test, expect} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {performLoginCiroClinician} from "../../../../testBase";

test('[194165] CWA Navigation-Profile-Employment Documents Page @smoke-prod-new-user @smoke-uat-new-user @smoke-qa-new-user',async ({page}) => {
    
    // Create an instance of the class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.EmploymentDocumentsVerifyUrl();
    
    // Validate Header
    await expect(employmentDocumentsPage.employmentDocumentsPageLinkHeader).toBeVisible();
    
    // Search for Acknowledgement of Release of Information to Clients
    await employmentDocumentsPage.searchBar.fill('Acknowledgement of Release of Information to Clients');
    
    // Validate Acknowledgement of Release of Information to Clients is displaying
    await expect(employmentDocumentsPage.acknowledgementTaskCard).toBeVisible;
    
    // Click Upload Document link & validate header
    await employmentDocumentsPage.uploadDocumentLink.click();
    await page.waitForTimeout(1000);
    await (employmentDocumentsPage.uploadDocumentLinkHeader).toBeVisible;
    await page.waitForTimeout(1000);

    // Click on the Back button
    await page.goBack();
})