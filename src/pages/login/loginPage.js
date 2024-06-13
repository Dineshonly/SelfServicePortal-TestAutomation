// LoginPage.js
//Importing the baseUrl from the config module
import baseUrl from '../../../config.js';

// Class representing a login page
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#okta-signin-username");
        this.passWord = page.locator("#okta-signin-password");
        this.signInButton = page.locator("#okta-signin-submit");
    }

    async navigate() {
        await this.page.goto(baseUrl);
    }

    async enterCredentials(username, password) {
        await this.userName.waitFor();
        await this.userName.fill(username);
        await this.passWord.waitFor();
        await this.passWord.fill(password);
    }

    // Method to click the sign-in button
    async clickSubmit() {
        await this.signInButton.waitFor();
        await this.signInButton.click();
    }
}

export {LoginPage};