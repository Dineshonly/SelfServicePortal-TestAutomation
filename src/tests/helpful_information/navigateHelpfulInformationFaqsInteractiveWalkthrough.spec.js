// @ts-check
import {test, expect} from "@playwright/test";
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[249338] CWA Navigation-Helpful Information-FAQs - Interactive Walkthrough @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const faqsPage = new FAQsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select FAQs link
    await faqsPage.faqsLink.waitFor();
    await faqsPage.faqsLink.click();
    
    // Assert header
    await expect(faqsPage.faqsLinkHeader).toBeVisible();

    // Validate the "Faqs" breadcrumb
    await assertUtils.validateCurrentCrumb("Faqs");

    // Interactive walkthrough links
    const page1Promise = page.waitForEvent('popup');
    await faqsPage.interactiveWalkthroughLink.click();
    const page1 = await page1Promise;
    await page.waitForTimeout(1000);
    await expect(page1.getByText('Traveler\'s Guide to UKG')).toBeVisible();
    await page.waitForTimeout(1000);
    await page1.close();    
})