// @ts-check
import {test, expect} from "@playwright/test";
import {EmploymentDocumentsPage} from "../../../pages/profile/employmentdocumentsPage";
import {DriversLicenseFrontSidePage} from "../../../pages/requiredDocuments/driversLicenseFrontSidePage";
import appData from "../../../../fixtures/driversLicenseFrontSide/driverLicenseTestData.json";
import UploadUtils from "../../../../src/utils/uploadUtils";
import {performLoginCiroClinician} from "../../../../testBase";

test('[157734] Complete a Drivers License Front Side Requirement @smoke-uat-new-user @smoke-prod-new-user @smoke-qa-new-user',async ({page}) => {
    
    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const employmentDocumentsPage = new EmploymentDocumentsPage(page);
    const driversLicensePage = new DriversLicenseFrontSidePage(page);
    const uploadUtils = new UploadUtils(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Employment Documents Link
    await employmentDocumentsPage.clickEnvironmentDocumentLink();
    
    // Driver's License Front Side
    await employmentDocumentsPage.searchBar.fill('Driver\'s License');
    
    // Select Driver's License Front Side
    await employmentDocumentsPage.clickDriversLicenseFront();
    
    // Verify Header
    await expect(driversLicensePage.driverLicenseFrontSideDisplayNameHeader).toBeVisible;
    
    // Enter License info
    const license = appData.licenseTestData[0];
    await driversLicensePage.fillDriversLicenseForm(
        license.expirationDate,
        license.state,
        license.licenseNumber
    )
    
    // Click on Upload File
    const inputSelector  = '//label[text()=\'Upload File\']';
    const filePath  = 'fixtures/driversLicenseFrontSide/DriversLicenseFrontSide.PnG';
    await uploadUtils.uploadFile(filePath , inputSelector);
    await driversLicensePage.submitButton.click();
    await page.waitForTimeout(2000);
    
    // Assert and Click on the download file button
    await driversLicensePage.waitForDownloadACopyButton();
    await driversLicensePage.waitForNewTabDriverLicense();
})