import {expect} from "@playwright/test";
class HomePage {

    constructor(page) {
        this.page = page;
        this.leftNavCloseButton = page.locator('button[aria-label="Close Menu"]');
        this.leftNavOpenButton = page.locator('button[aria-label="Open Menu"]');
        this.breadcrumbHome = page.getByText('ciro clinician').first();
        this.NextButton = page.getByRole('button', { name: 'Next' });
        this.BackButton = page.getByRole('button', { name: 'Back' });
        this.SaveProgressButton = page.getByRole('button', { name: 'Save Progress' });
        this.profileExpand = page.getByText('PROFILE');
        this.homePageLink = page.getByRole('link',{name:'Home'});
        
        // Click on the Full Application
        this.fullApplication = page.getByTestId('task-card-full-application');
        this.fullApplicationHeader = page.locator('h2',{hasText:'Full Application'})
        
        // Tabs
        this.personalInfoTab = page.getByRole('tab', { name: 'Personal Info' });
        this.experienceTab = page.getByRole('tab', { name: 'Experience' });
        this.educationTab = page.getByRole('tab', { name: 'Education' });
        this.preferencesTab = page.getByRole('tab', { name: 'Preferences' });
        this.signatureTab = page.getByRole('tab', { name: 'Signature' });

        // Click on Professional References
        this.professionalReferences = page.getByTestId('task-card-professional-references');
        this.professionalReferencesHeader = page.locator('h2',{hasText:'Professional References'})
        
        // Click on Skills Checklist
        this.skillsChecklist = page.getByTestId("task-card-skills-checklist");
        this.skillsChecklistHeader = page.locator('h2',{hasText:'Skills Checklists'})
        
        // Click on Comprehensive Benefits
        this.gotItButton = page.getByRole('button',{name:'Got It'})
        this.kmatch = page.getByTestId("401K Match - 0");
        this.kmatchText = page.locator("p.sc-bhNKFk.klzQbE");
        this.licenseCertReimbursement = page.getByTestId("License & Cert Reimbursement - 1");
        this.licenseCertReimbursementText = page.locator("p.sc-bhNKFk.klzQbE");
        this.loyaltyBonus = page.getByTestId("Loyalty Bonus - 2");
        this.loyaltyBonusText = page.locator("p.sc-bhNKFk.klzQbE");
        this.dayOneMedicalInsurance = page.getByTestId("Day One Medical Insurance - 3");
        this.dayOneMedicalInsuranceText = page.locator("p.sc-bhNKFk.klzQbE");
        this.referralBonus = page.getByTestId("Referral Bonus - 4");
        this.referralBonusText = page.locator("p.sc-bhNKFk.klzQbE");

        //Profile Builder
        this.profileBuilderBannerText = page.getByText('Build Your Profile');
        this.learnMoreButton = page.getByRole('button', { name: 'Learn More' });
        this.profileBuilderModelHeaderText = page.getByText('Introducing Profile Builder', { exact: true });
        this.profileBuilderStartertext = page.getByText('Starter', { exact: true });
        this.profileBuilderNovicetext = page.getByText('Novice', { exact: true });
        this.profileBuilderProtext = page.getByText('Pro', { exact: true });
        this.profileBuilderElitetext = page.getByText('Elite', { exact: true });
        this.profileBuilderModelCrossCloseButton = page.getByRole('button').first();
        this.profileBuilderModelCloseButton = page.getByRole('button', { name: 'Close' });
        this.buildMyProfileButton= page.getByRole('button', { name: 'Build My Profile' });
        this.profileBuilderPageHeader = page.getByText('Profile Strength:', { exact: true });
    }
    
    // Functions/Methods
    
    // Method to click the left navigation button Close
    async clickLeftNavCloseButton(){
        await this.leftNavCloseButton.click();
    }

    // Method to click the left navigation button Open
    async clickLeftNavOpenButton(){
        await this.leftNavOpenButton.click();
    }
    
    // Method to check if the left navigation menu is open
    async isLeftNavOpen() {
        return await this.leftNavCloseButton.innerText() === 'Close Menu';
    }

    // Method to check if the left navigation menu is closed
    async isLeftNavClosed() {
        return await this.leftNavOpenButton.innerText() === 'Open Menu';
    }

    // Validate breadcrumb Full Application form
    async clickFullApplicationVerifyUrl() {
        const fullApplication = this.page.getByTestId('task-card-full-application');
        await expect(fullApplication).toBeEnabled();
        await fullApplication.click();
        await this.page.waitForTimeout(5000);
        await expect(this.page).toHaveURL(/full-application-multi/);
    }

    // Validate breadcrumb Professional References
    async clickProfessionalReferencesVerifyUrl() {
        await this.professionalReferences.click();
        await this.page.waitForTimeout(1000); // Add a delay of 1 second (adjust as needed)
        await expect(this.page).toHaveURL(/references/);        
    }

    // Validate breadcrumb Skills Checklist
    async clickSkillsChecklistVerifyUrl() {
        await this.skillsChecklist.click();
        await this.page.waitForTimeout(1000); // Add a delay of 1 second (adjust as needed)
        await expect(this.page).toHaveURL(/skills/);
    }
    
    async clickOnFullApplicationAssertPersonalInfoTab(){
        const fullApplication = this.page.getByTestId('task-card-full-application');
        await fullApplication.waitFor();
        const currentUrl = this.page.url();
        //const newUrl = `${currentUrl}full-application-resume-scan`;
        const newUrl = `${currentUrl}full-application-multi`;
        await this.page.goto(newUrl);
        await expect(this.fullApplicationHeader).toContainText('Full Application');
    }    
    async waitForBreadcrumbHome(){
        const breadcrumbHome = this.breadcrumbHome;
        await breadcrumbHome.waitFor();
    }

    // Validate Profile Builder Page
    async clickBuildMyProfileVerifyUrl() {
        await this.buildMyProfileButton.waitFor();
        await this.buildMyProfileButton.click();
        await expect(this.profileBuilderPageHeader).toBeVisible();
        await expect(this.page).toHaveURL(/profile-builder/);
    }

    async yourRecruiterText(){
        // Let's start our search for the "Your Recruiter" title
        const recruiterTitle = await this.page.locator('h3', { hasText: 'Your Recruiter' });
        if (await recruiterTitle.count() > 0) {
            console.log('The "Your Recruiter" title is present.');
        } else {
            console.log('The "Your Recruiter" title is missing.');
        }
    }
    async recruiterData(){
        // Now, onto our dynamic duo: email and call buttons
        const emailRecruiter = await this.page.locator('[data-qa-id="email-recruiter"]');
        const callRecruiter = await this.page.locator('[data-qa-id="call-recruiter"]');

        if (await emailRecruiter.count() > 0) {
            console.log('The email option is right here.');
        } else {
            console.log('Oh no! The email option is nowhere to be found.');
        }

        if (await callRecruiter.count() > 0) {
            console.log('The call option stands proud.');
        } else {
            console.log('The call option has eluded us.');
        }
    }
        
}
export {HomePage};