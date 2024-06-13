// @ts-check
import {test, expect} from "@playwright/test";
import {Pay_BenefitsPage} from "../../pages/pay_benefits/pay_benefitsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
import payBenefitsData from "../../../fixtures/payBenefitsData/payBenefitsDocumentExpectedURL.json";
test('[227727] CWA Pay&Benefits Page - Download IDCard Template Document @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the class, passing the 'page' object to the constructor
    const payBenefitsPage = new Pay_BenefitsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Pay & Benefits link
    await payBenefitsPage.payBenefitsLink.waitFor();
    await payBenefitsPage.payBenefitsLink.click();
    
    // Validate header visibility
    await expect(payBenefitsPage.payBenefitsLinkHeader).toBeVisible();

    // Validate the "Pay & Benefits" breadcrumb
    await assertUtils.validateCurrentCrumb("Pay & Benefits");
    
    // Validate the IDCard Template Document
    const expectedEndOfURL = payBenefitsData.payBenefitsDocumentExpectedURL[0];
    await payBenefitsPage.validatePayBenefitsDocuments(payBenefitsPage.iDCardTemplateDocumentdownload,expectedEndOfURL.iDCardTemplateExpectedURL,'#ID-Card-Template'); 
})