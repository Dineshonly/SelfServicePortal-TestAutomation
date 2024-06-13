// @ts-check
import {test} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {I9EmploymentEligibilityVerificationPage} from"../../../pages/requiredDocuments/i9EmploymentEligibilityVerificationPage";
import {performLoginCiroClinician} from "../../../../testBase";

test('[157744] I-9 Employment Eligibility Verification @smoke-uat-new-user @smoke-prod-new-user',async ({page}) => {

    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);
    const i9EmploymentEligibilityVerificationPage = new I9EmploymentEligibilityVerificationPage(page);


    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.clickEnvironmentDocumentLink();

    // Driver's License Front Side
    await employmentDocumentsPage.searchBar.fill('I-9 Employment Eligibility Verification');
    
    // Select I-9 Employment Eligibility Verification

    // Create promise to wait for popup
    await i9EmploymentEligibilityVerificationPage.validateNewTabPage();
})