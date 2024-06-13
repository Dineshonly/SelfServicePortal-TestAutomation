import baseUrl from '../../../config.js';
class CiroCreateAccountPage {
    
    constructor(page) {
        this.page = page;
        this.createAccountLink = page.getByLabel('Create Account');
        this.enterEmail = page.getByPlaceholder('Email *');
        this.enterPassword = page.getByPlaceholder('Password *');
        this.enterFirstName = page.getByPlaceholder('First name *');
        this.enterLastName = page.getByPlaceholder('Last name *');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.createAccountLinkHeader = page.locator('h2',{hasText:'Create Account'});
        this.verificationEmailSent = page.getByRole('heading', { name: 'Verification email sent' });
    }
    
    async navigate(){
        await this.page.goto(baseUrl)
    }
    
    async ciroCreateAccount(email,password,firstName,lastName){
        await this.enterEmail.fill(email);
        await this.enterPassword.fill(password);
        await this.enterFirstName.fill(firstName);
        await this.enterLastName.fill(lastName);
        await this.page.waitForTimeout(2000);  // Pause to allow UI to update
        await this.registerButton.click();
    }
    
    
}
export {CiroCreateAccountPage};