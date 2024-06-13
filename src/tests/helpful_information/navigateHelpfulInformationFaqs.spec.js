// @ts-check
import {test, expect} from "@playwright/test";
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194173] CWA Navigation-Helpful Information-FAQs Page @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const faqsPage = new FAQsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select FAQs link
    await faqsPage.faqsLink.click();
    
    // Assert header
    await expect(faqsPage.faqsLinkHeader).toBeVisible();

    // Validate the "Faqs" breadcrumb
    await assertUtils.validateCurrentCrumb("Faqs");
})