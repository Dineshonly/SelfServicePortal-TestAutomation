// @ts-check
import {expect, test} from '@playwright/test';
import {HomePage} from "../../../pages/profile/homePage";
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";

test('[194158] CWA Navigation-Profile-Home (Application Landing Page) @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the 'page' object to the constructor
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Breadcrumb
    await homePage.waitForBreadcrumbHome();

    // Default 3 required doc
    await expect(homePage.fullApplication).toBeVisible();
    await expect(homePage.professionalReferences).toBeVisible();
    await expect(homePage.skillsChecklist).toBeVisible();

    // Recruiter Section
    await homePage.yourRecruiterText();
    await homePage.recruiterData();
})