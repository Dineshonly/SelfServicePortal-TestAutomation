// @ts-check
import {test, expect} from "@playwright/test";
import {JobSearchPage} from "../../pages/assignments/jobSearchPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194170] CWA Navigation-Assignments-Job Search Page @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the Page class, passing the 'page' object to the constructor
    const jobSearchPage = new JobSearchPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Job Search link
    await jobSearchPage.jobSearchLink.click();
    await expect(jobSearchPage.jobSearchLinkHeader).toBeVisible();

    // Validate the "Job Search" element
    await assertUtils.validateCurrentCrumb("Job Search");

    // Validate that there are exactly three Job Search buttons
    await expect(jobSearchPage.yourJobTitleButton).toBeVisible;
    await expect(jobSearchPage.yourSpecialtyButton).toBeVisible;
    await expect(jobSearchPage.selectLocationButton).toBeVisible;
    

    // Validate that there are at least one <div class="jobs-card-left-content"> element
    await jobSearchPage.jobSearchLink.click();
    await page.waitForTimeout(1000);
    await (jobSearchPage.jobCardClass).toBeVisible;
});