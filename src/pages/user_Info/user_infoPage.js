import {expect} from "@playwright/test";

class User_InfoPage {

    constructor(page) {
        this.page = page
        this.profileMenu = page.getByTestId('profile-menu-clickable-container');
        this.updateProfile = page.getByTestId('profile-menu-clickable-menu-item-update-profile');
        this.profileStrength = page.getByTestId('profile-menu-clickable-menu-item-profile-strength');
        this.pulseQaOnly = page.getByTestId('profile-menu-clickable-menu-item-pulse-qa-only');
        this.logOut = page.getByTestId('profile-menu-clickable-menu-item-logout');
        this.oktaSignIn = page.locator('#okta-sign-in');
    }
    
    // Functions/Methods

    async clickKababMenuUrlValidation(){
        const kababMenu = this.page.getByTestId('profile-menu-clickable-container')
        await kababMenu.waitFor();
        await kababMenu.click();
        await expect(this.updateProfile).toBeVisible();
        await expect(this.logOut).toBeVisible();
        await this.updateProfile.click();
        const expectedEndOfURL = '/personal-info';
        const currentURL = await this.page.url();
        console.log("Current URL:", currentURL);
        expect(currentURL.endsWith(expectedEndOfURL)).toBe(true);
    }
    async clickUpdateProfile(){
        const kababMenu = this.page.getByTestId('profile-menu-clickable-container')
        await kababMenu.waitFor();
        await kababMenu.click();
        await this.updateProfile.click();
        await expect(this.page).toHaveURL(/personal-info/);
    }
    async clickProfileStrength(){
        const kababMenu = this.page.getByTestId('profile-menu-clickable-container')
        await kababMenu.waitFor();
        await kababMenu.click();
        await this.profileStrength.click();
        await expect(this.page).toHaveURL(/profile-builder/);
    }
    async navigateToPulseQaOnly(){
        const kababMenu = this.page.getByTestId('profile-menu-clickable-container')
        await kababMenu.waitFor();
        await kababMenu.click();
        await expect(this.pulseQaOnly).toContainText('Pulse (QA Only)');
        const pulsePagePromise = this.page.waitForEvent('popup')
        await this.pulseQaOnly.click();
        const pulseQaOnly = await pulsePagePromise;
        await expect(pulseQaOnly.getByRole('heading').getByText('Sign in')).toBeVisible();
    }    
    async clickKababMenuLogout(){
        const kababMenu = this.page.getByTestId('profile-menu-clickable-container')
        await kababMenu.waitFor();
        await kababMenu.click();
        await this.logOut.click();
        await expect(this.oktaSignIn).toBeVisible();
    }

}
export {User_InfoPage};