// loginPulsePage.js
import {BasePage} from '../../login/basePage';
class LoginPulsePage extends BasePage{
    constructor(page) {
        super(page);
        // Define locators specific to Pulse login
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.dontShowAgain = page.getByLabel('Don\'t show this again');
        this.yesButton = page.locator("#idSIButton9");
        this.clickPasswordTextbox = page.getByPlaceholder('Password');
    }
    
    // Locator for email field
    get fillPulseEmail(){
        return "[name='loginfmt']";
    }
    
    // Locator for password field
    get fillPulsePassword(){
        return"[name='passwd']";
    }

    // Navigate to a specific URL
    async gotoURL(url){
        await this.page.goto(url);
    }

    // Enter email and click the Next button
    async enterEmailAndClickNext(email){
        await this.page.fill(this.fillPulseEmail,email)
        await this.nextButton.click();
    }

    // Enter password and click the Sign-In button
    async enterPasswordClickSignIn(password){
        await this.clickPasswordTextbox.click();
        await this.clickPasswordTextbox.fill(password)
        await this.page.waitForTimeout(1000);  // Pause to allow UI to update
        await this.signInButton.click();
    }
    
    
}

export {LoginPulsePage};