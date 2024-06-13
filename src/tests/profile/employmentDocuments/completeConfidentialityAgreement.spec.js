import {test} from '@playwright/test';
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {performLoginCiroClinician} from "../../../../testBase";
import {ESignatureFormPage} from "../../../pages/requiredDocuments/eSignatureFormPage";


test('[229245] Complete - Confidentiality Agreement @smoke-uat-new-user @smoke-qa-new-user', async ({page}) => {
    await test.step('Confidentiality Agreement', async () => {

        // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
        const employmentDocumentsPage = new EmploymentDocumentsPage(page);
        const confidentialityAgreementPage = new ESignatureFormPage(page);

        // Perform the login operation first
        await performLoginCiroClinician(page);

        // Select Employment Documents Link
        await employmentDocumentsPage.clickEnvironmentDocumentLink();

        // Confidentiality Agreement
        await employmentDocumentsPage.searchBar.fill('Confidentiality Agreement');

        // Select Confidentiality Agreement
        await confidentialityAgreementPage.confidentialityAgreementTaskCard.click();

        // Cookies
        try {
            // This may have been clicked
            await confidentialityAgreementPage.disclosureAccepted();
        } catch (error) {
            console.log('Already clicked, proceeding to the next step')
        }

        // Click on continue button
        await confidentialityAgreementPage.continueForm();

        // Start
        await confidentialityAgreementPage.navigateForm();

        // Enter name
        await confidentialityAgreementPage.fillForm('Test', 'Testing')

        // Finish
        await confidentialityAgreementPage.signAndFinish();

    });
});