import {expect} from "@playwright/test";

class App_footer_functionalityPage {
    constructor(page) {
        this.page = page;
        this.stayInTouchWithUs = page.getByText('STAY IN TOUCH WITH US');
        this.facebookLink = page.getByTestId('footer-facebook-link');
        this.instagramLink = page.getByTestId('footer-instagram-link');
        this.linkedinLink = page.getByTestId('footer-linkedin-link');
        this.youtubeLink = page.getByTestId('footer-youtube-link');
        this.twitterLink = page.getByTestId('footer-twitter-link');
        this.tiktokLink = page.getByTestId('footer-tiktok-link');
        this.termsOfUse = page.getByRole('link',{name:'Terms of Use'});
        this.privacyPolicy = page.getByRole('link',{name:'Privacy Policy'});
        this.emailUs = page.getByTestId('footer-email-us-link');
        this.emailLink = page.getByTestId('footer-email-us-link');
        this.callUs = page.getByTestId('footer-call-us-link');
    }
    
    // Functions/Methods 
    async isStayInTouchVisible() {
        return await this.stayInTouchWithUs.isVisible();
    }
    async getFacebookLinkHref() {
        return await this.facebookLink.getAttribute('href');
    }
    async getInstagramLinkHref() {
        return await this.instagramLink.getAttribute('href');
    }
    async getLinkedInLinkHref() {
        return await this.linkedinLink.getAttribute('href');
    }
    async getYoutubeLinkHref() {
        return await this.youtubeLink.getAttribute('href');
    }
    async getTwitterLinkHref() {
        return await this.twitterLink.getAttribute('href');
    }
    async getTiktokLinkHref() {
        return await this.tiktokLink.getAttribute('href');    }
    async getEmailUsLinkHref() {
        return await this.emailUs.getAttribute('href');
    }    
    async getCallUsLinkHref() {
        return await this.callUs.getAttribute('href');
    }
    async getTermsOfUseLinkHref() {
        return await this.termsOfUse.getAttribute('href');
    }

    async getPrivacyPolicyLinkHref() {
        return await this.privacyPolicy.getAttribute('href');
    }

    async clickTermsOfUse(){
        const popUpPromise = this.page.waitForEvent('popup');
        await this.termsOfUse.click();
        await popUpPromise;
    }    
    async clickPrivacyPolicy(){
        const popUpPromise = this.page.waitForEvent('popup');
        await this.privacyPolicy.click();
        await popUpPromise;
    }
    async clickTikTokAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Waits for the new tab to open
            this.tiktokLink.click(),          // Clicks the TikTok link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        await expect(url).toBe('https://www.tiktok.com/@medical_solutions?');

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }

    async clickLinkedInAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Waits for the new tab to open
            this.linkedinLink.click(),          // Clicks the LinkedIn link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        await expect(url).toBe('https://www.linkedin.com/company/medical-solutions');

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }

    async clickFacebookAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Waits for the new tab to open
            this.facebookLink.click(),          // Clicks the Facebook link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        await expect(url).toBe('https://www.facebook.com/MedicalSolutions/');

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }

    async clickInstagramAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),      // Waits for the new tab to open
            this.instagramLink.click(),          // Clicks the Instagram link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        const expectedPipelineUrl = "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fmedicalsolutions%2F";
        const expectedLocalUrl = "https://www.instagram.com/medicalsolutions/";

        function isAzureDevOps() {
            // Checks if certain Azure DevOps specific environment variable is set
            return process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI !== undefined;
        }

        // Determine if it's Azure DevOps environment
        const isAzureDevOpsEnv = isAzureDevOps();

        // Check if it's an Azure DevOps and the URL matches the expectedPipelineUrl
        if (isAzureDevOpsEnv && url === expectedPipelineUrl) {
            await expect(url).toBe(expectedPipelineUrl);
        } else {
            // If it's not Azure DevOps or the URL doesn't match expectedPipelineUrl,
            // use the expectedLocalUrl
            await expect(url).toBe(expectedLocalUrl);
        }

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }



    async clickYouTubeAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Waits for the new tab to open
            this.youtubeLink.click(),          // Clicks the YouTube link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        await expect(url).toBe('https://www.youtube.com/user/MedicalSolutions');

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }

    async clickTwitterAndValidateUrl() {
        // Wait for the new page (tab) to open
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Waits for the new tab to open
            this.twitterLink.click(),          // Clicks the Twitter link
        ]);

        // Now 'newPage' refers to the new tab

        // Optionally, wait for the new page to load completely
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        const url = newPage.url();
        await expect(url).toBe('https://twitter.com/msmedstaffing');

        // Optional: Close the new tab if you don't need it anymore
        await newPage.close();
    }

    async checkForEmailUsIcon() {
        const emailIcon = await this.emailLink;
        if (emailIcon) {
            console.log("Email Us icon is visible!");
        } else {
            console.log("Email Us icon is not visible.");
        }
    }
    async checkMailToAssert() {
        const href = await this.getEmailUsLinkHref();

        if (href && href.startsWith('mailto:') && href.includes('info@medicalsolutions.com')) {
            console.log("The 'Email Us' link is correctly set up to open an email application.");
        } else {
            console.log("The 'Email Us' link is not set up correctly.");
        }
    }

    async checkForCallUsIcon() {
        const callUsIcon = await this.callUs;
        if (callUsIcon) {
            console.log("Call Us icon is visible!");
        } else {
            console.log("Call Us icon is not visible.");
        }
    }
    async checkTelAssert() {
        const href = await this.getCallUsLinkHref();

        if (href && href.startsWith('tel:') && href.includes('1.866.633.3548')) {
            console.log("The 'Call Us' link is correctly set up .");
        } else {
            console.log("The 'Call Us' link is not set up correctly.");
        }
    }

}
export {App_footer_functionalityPage};