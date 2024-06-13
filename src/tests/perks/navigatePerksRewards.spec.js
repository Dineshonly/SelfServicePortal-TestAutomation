// @ts-check
import {test, expect} from "@playwright/test";
import {RewardsPage} from "../../pages/perks/rewardsPage";
import AssertUtils from "../../utils/assertUtils";
import ActionsUtils from "../../utils/actionsUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194177] CWA Navigation-Perks-Rewards @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the Rewards Page class, passing the 'page' object to the constructor
    const rewardsPage = new RewardsPage(page);
    const assertUtils = new AssertUtils(page);
    const actionUtils = new ActionsUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a rewards link
    await rewardsPage.rewardsLink.click();
    await expect(rewardsPage.rewardsLinkHeader).toBeVisible;

    // Validate the "Rewards" breadcrumb
    await assertUtils.validateCurrentCrumb("Rewards");
    
    // Click on History tab
    await rewardsPage.historyTab.click();

    // Click on Collect Points tab
    await rewardsPage.collectPointsTab.click();
    
    // Scroll to Social Media Banner & Validate
    await actionUtils.scrollToElement(rewardsPage.socialMediaBanner);
    await (rewardsPage.socialMediaBanner).toBeVisible;
    
    // Scroll to FAQs Banner & Validate
    await actionUtils.scrollToElement(rewardsPage.frequentlyAskedQuestions);
    await (rewardsPage.frequentlyAskedQuestions).toBeVisible;

    // Scroll to View Terms & Conditions Banner & Validate
    await actionUtils.scrollToElement(rewardsPage.viewTermsConditionsLink);
    await (rewardsPage.viewTermsConditionsLink).toBeVisible;
})