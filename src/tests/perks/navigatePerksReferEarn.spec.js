// @ts-check
import {test, expect} from "@playwright/test";
import {Refer_EarnPage} from "../../pages/perks/refer_earnPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from"../../../testBase";

test('[194178] CWA Navigation to Refer and Earn Page @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the Rewards Page class, passing the 'page' object to the constructor
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Create an instance of the Refer Earn Page class, passing the 'page' object to the constructor
    const referEarnPage = new Refer_EarnPage(page);

    // Select Refer Earn a Page link
    await referEarnPage.referEarnLink.click();
    await expect(referEarnPage.referEarnLinkHeader).toBeVisible();

    // Validate the "Refer & Earn" breadcrumb
    await assertUtils.validateCurrentCrumb("Refer & Earn");
})