import {test} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {UploadSpecialDocumentPage} from "../../../pages/profile/uploadSpecialDocumentPage";
import UploadUtils from "../../../utils/uploadUtils";
import {performLoginCiroClinician} from "../../../../testBase";

test('[157753] Upload a Miscellaneous document (Special Document) @smoke-prod-new-user @smoke-uat-new-user @smoke-qa-new-user',async ({page}) => {

    // Create an instance of the class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);
    const uploadSpecialDocumentPage = new UploadSpecialDocumentPage(page);
    const uploadUtils = new UploadUtils(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.clickEnvironmentDocumentLink();

    // Click Upload Document link & validate header
    await employmentDocumentsPage.uploadDocumentLink.click();

    // Enter Description
    await uploadSpecialDocumentPage.enterDescription.fill('Automation Special Document');
    
    // Upload Special Document
    const inputSelector  = '//label[@for=\'uploadFile\']';
    const filePath  = 'fixtures/specialDocument/doc/automationMiscDoc01.docx';
    await uploadUtils.uploadFile(filePath , inputSelector);
    await uploadSpecialDocumentPage.uploadButton.click();
    await page.waitForTimeout(1000);
})