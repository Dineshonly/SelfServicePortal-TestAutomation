// @ts-check
import {test, expect} from "@playwright/test";
import {MentalHealthResourcesPage} from "../../pages/helpful_information/mentalhealthresourcesPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194174] CWA Navigation-Helpful Information-Mental Health Resources Page @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
   
    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const metalHealthResourcesPage = new MentalHealthResourcesPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Mental Health Resources link
    const page1Promise = page.waitForEvent('popup');
    await metalHealthResourcesPage.mentalHealthResourcesLink.click();
    const page1 = await page1Promise;
    await page.waitForTimeout(1000);
    await expect(page1.getByText('Mental Health Resources for Travelers')).toBeVisible();
    await page1.close(); 
})