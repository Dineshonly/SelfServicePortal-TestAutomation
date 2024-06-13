// @ts-check
import {test, expect} from "@playwright/test";
import {MentalHealthResourcesPage} from "../../pages/helpful_information/mentalhealthresourcesPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
import {HomePage} from "../../pages/profile/homePage";

test('[156307] CWA: Helpful Info-Mental Health Resources: I can view "Mental Health Resources" link under "Helpful Information" @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
   
    // Create an instance of the Page class, passing the 'page' object to the constructor
    const metalHealthResourcesPage = new MentalHealthResourcesPage(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();
    
    //Validate Mental Health Link.
    await metalHealthResourcesPage.mentalHealthResourcesLink.waitFor();
    await expect(metalHealthResourcesPage.mentalHealthResourcesLink).toBeVisible();

})