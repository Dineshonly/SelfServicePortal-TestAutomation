// @ts-check
import {test,expect} from '@playwright/test';
import {HomePage} from "../../../pages/profile/homePage";
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";

test('[247955,238592,238595] @regression CWA Navigation - Profile Builder Page From Home Page @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the 'page' object to the constructor
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);
    
    // Validate Profile Builder Banner
    await homePage.profileBuilderBannerText.waitFor();
    await expect(homePage.profileBuilderBannerText).toBeVisible();

    // Click 'learn more' button.
    await homePage.learnMoreButton.click();

    // Validate the Profile Builder model
    await expect(homePage.profileBuilderModelHeaderText).toBeVisible();
    await expect(homePage.profileBuilderStartertext).toBeVisible();
    await expect(homePage.profileBuilderNovicetext).toBeVisible();
    await expect(homePage.profileBuilderProtext).toBeVisible();
    await expect(homePage.profileBuilderElitetext).toBeVisible();

    // Validate the Close & 'X' button in Profile Builder model
    await homePage.profileBuilderModelCrossCloseButton.click();
    await homePage.learnMoreButton.click();
    await homePage.profileBuilderModelCloseButton.click();
    await homePage.learnMoreButton.click();

    //Navigate to the Profile Builder Page
    await homePage.clickBuildMyProfileVerifyUrl();
})