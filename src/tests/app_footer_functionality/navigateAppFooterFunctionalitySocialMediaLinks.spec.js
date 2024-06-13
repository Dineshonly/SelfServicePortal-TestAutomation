// @ts-check
import {test, expect} from "@playwright/test";
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194180] CWA Navigation-App Footer Functionality-Social Media Links @smoke-prod-default @smoke-uat-default @smoke-qa-uat-default',async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);
    
    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Validate the "STAY IN TOUCH WITH US" element visibility
    expect(await stayInTouchWithUsPage.isStayInTouchVisible());

    // Validate the Facebook link href
    const facebookLinkHref = await stayInTouchWithUsPage.getFacebookLinkHref();
    expect(facebookLinkHref).toBe('https://www.facebook.com/MedicalSolutions/');

    // Validate the Instagram link href
    const instagramLinkHref = await stayInTouchWithUsPage.getInstagramLinkHref();
    expect(instagramLinkHref).toBe('https://www.instagram.com/medicalsolutions/');

    // Validate the LinkedIn link href
    const linkedinLinkHref = await stayInTouchWithUsPage.getLinkedInLinkHref();
    expect(linkedinLinkHref).toBe('https://www.linkedin.com/company/medical-solutions');

    // Validate the YouTube link href
    const youtubeLinkHref = await stayInTouchWithUsPage.getYoutubeLinkHref();
    expect(youtubeLinkHref).toBe('https://www.youtube.com/user/MedicalSolutions');

    // Validate the Twitter link href
    const twitterLinkHref = await stayInTouchWithUsPage.getTwitterLinkHref();
    expect(twitterLinkHref).toBe('https://twitter.com/msmedstaffing');

    // Validate the Tiktok link href
    const tiktokLinkHref = await stayInTouchWithUsPage.getTiktokLinkHref();
    expect(tiktokLinkHref).toBe('https://www.tiktok.com/@medical_solutions?');    
})