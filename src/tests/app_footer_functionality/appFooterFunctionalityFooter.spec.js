// @ts-check
import {test, expect} from '@playwright/test';
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {HomePage} from "../../pages/profile/homePage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[112452] CWA: App Footer Functionality: @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();

    // Email Us
    const emailUsLinkHref = await stayInTouchWithUsPage.getEmailUsLinkHref();
    expect(emailUsLinkHref).toBe('mailto:info@medicalsolutions.com');

    // Call Us
    const callUsLinkHref = await stayInTouchWithUsPage.getCallUsLinkHref();
    expect(callUsLinkHref).toBe('tel:1.866.633.3548');

    // Terms of Use
    const termsOfUse = await stayInTouchWithUsPage.getTermsOfUseLinkHref();
    expect(termsOfUse).toBe('https://www.medicalsolutions.com/terms-of-use/');

    // Privacy Policy
    const privacyPolicy = await stayInTouchWithUsPage.getPrivacyPolicyLinkHref();
    expect(privacyPolicy).toBe('https://www.medicalsolutions.com/privacy-policy/');

    // Facebook
    const facebookLinkHref = await stayInTouchWithUsPage.getFacebookLinkHref();
    expect(facebookLinkHref).toBe('https://www.facebook.com/MedicalSolutions/');

    // Instagram
    const instagramLinkHref = await stayInTouchWithUsPage.getInstagramLinkHref();
    expect(instagramLinkHref).toBe('https://www.instagram.com/medicalsolutions/');

    // LinkedIn
    const linkedinLinkHref = await stayInTouchWithUsPage.getLinkedInLinkHref();
    expect(linkedinLinkHref).toBe('https://www.linkedin.com/company/medical-solutions');

    // YouTube
    const youtubeLinkHref = await stayInTouchWithUsPage.getYoutubeLinkHref();
    expect(youtubeLinkHref).toBe('https://www.youtube.com/user/MedicalSolutions');

    // Twitter
    const twitterLinkHref = await stayInTouchWithUsPage.getTwitterLinkHref();
    expect(twitterLinkHref).toBe('https://twitter.com/msmedstaffing');

    // Tik Tok
    const tiktokLinkHref = await stayInTouchWithUsPage.getTiktokLinkHref();
    expect(tiktokLinkHref).toBe('https://www.tiktok.com/@medical_solutions?');
});