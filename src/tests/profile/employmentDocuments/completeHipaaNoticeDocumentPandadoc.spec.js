// @ts-check
import {test, expect} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {HipaaNoticePandadocPage} from "../../../pages/requiredDocuments/hipaaNoticePandadocPage";
import {performLoginCiroClinician} from "../../../../testBase";

test('[157736] HIPAA Notice',async ({page}) => {

    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);
    const hipaaNoticePandadocPage = new HipaaNoticePandadocPage(page);
    

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.clickEnvironmentDocumentLink();

    // Driver's License Front Side
    await employmentDocumentsPage.searchBar.fill('HIPAA Notice');
    
    // Select Hipaa Notice Pandadoc
    await hipaaNoticePandadocPage.clickHippaNotice();
    
    // Validate Header
    await expect(hipaaNoticePandadocPage.hipaaNoticeHeader).toBeVisible();
    
    // Accept Cookies
    await hipaaNoticePandadocPage.acceptCookies();

    // Click and Sign
    await hipaaNoticePandadocPage.clickOnStartSigning();

    // Refresh the page
    await employmentDocumentsPage.reloadHomePageMultipleTimes(8)

    // Search
    await employmentDocumentsPage.searchBar.fill('HIPAA Notice');
})