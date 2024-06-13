class FAQsPage {

        constructor(page) {
        this.page = page;
        this.helpfulInfoExpand = page.getByText('HELPFUL INFORMATION');
        this.faqsLink = page.getByRole('link',{name:'FAQS'});
        this.faqsLinkHeader = page.getByRole('heading', { name: 'Frequently Asked Questions' });
        this.breadcrumbFaqs = page.locator('span').filter({ hasText: 'Faqs' }).nth(1);
        this.myPayHeader = page.getByRole('heading', { name: 'My Pay' });
        this.myBenefitsHeader = page.getByRole('heading', { name: 'My Benefits', exact: true })
        this.electronicTimesheetsHeader = page.getByRole('heading', { name: 'Electronic Timesheets' });
        this.othersHeader = page.getByRole('heading', { name: 'Others' });
        this.interactiveWalkthroughLink = page.getByRole('link',{name:'Interactive Walkthrough'});
        //FAQs My Pay elements
        this.myPayHowDoIUpdateMyFederalOrAssignmentStateTaxWithHoldingsSection = page.getByRole('button', { name: 'How do I update my federal or assignment state tax withholdings?' });
        this.myPayHowDoIUpdateMyAddressSection =  page.getByRole('button', { name: 'How do I update my address?' });
        this.myPayHowDoIViewMyCurrentPayStubSection =  page.getByRole('button', { name: 'How do I view my current pay stub?' });
        this.myPayHowDoIViewMyPreviousPayStubSection =  page.getByRole('button', { name: 'How do I view my previous pay stub?' });
        this.myPayHowDoIViewMyW2Section =  page.getByRole('button', { name: 'How do I view my W-2?' });

        //FAQs My Benefits elements
        this.myBenefitsHowDoIElectMyBenefitsAsANewHireReHireSection = page.getByRole('button', { name: 'How do I elect my benefits as a new hire/rehire?' });
        this.myBenefitsHowDoIWaiveDeclineMyBenefitsSection = page.getByRole('button', { name: 'How do I waive/decline my benefits?' });
        this.myBenefitScanIAddADomesticPartnerToMyBenefitsSection = page.getByRole('button', { name: 'Can I add a domestic partner to my benefits?' });
        this.myBenefitsHowIongDoIhaveToEnrollInMyBenefitsSection = page.getByRole('button', { name: 'How long do I have to enroll in my benefits?' });
        this.myBenefitsHowDoIViewMyCurrentBenefitsSelectionSection = page.getByRole('button', { name: 'How do I view my current benefits selection?' });        
        this.myBenefitsOnceIAmEnrolledInInsuranceWhenAndHowWillIReceiveMYInsuranceCardsSection = page.getByRole('button', { name: 'Once I am enrolled in insurance, when and how will I receive my insurance cards?' });
        this.myBenefitsCanIUseMYInsuranceTheFirstDayOfMyContractSection = page.getByRole('button', { name: 'Can I use my insurance the first day of my contract?' });
        this.myBenefitsWhenCanIElectOrMakeChangesSection = page.getByRole('button', { name: 'When can I elect or make changes?' });
        this.myBenefitsWhenWillMyInsuranceCoverageEndSection = page.getByRole('button', { name: 'When will my insurance coverage end?' });
        this.myBenefitsWhenWillIReceiveMyCobraPacketSection = page.getByRole('button', { name: 'When will I receive my COBRA packet?' });        
        this.myBenefitshowDoIEnrollInCobraSection = page.getByRole('button', { name: 'How do I enroll in COBRA?' });
        this.myBenefitsHowMuchDoesCobraCostSection = page.getByRole('button', { name: 'How much does COBRA cost?' });
        this.myBenefitsHowIongDoesCobraLastSection = page.getByRole('button', { name: 'How long does COBRA last?' });
        this.myBenefitsHowDoIEnrollInThe401kPlanSection = page.getByRole('button', { name: 'How do I enroll in the 401K plan?' });
        this.myBenefitsHowDoIEnrollInShortTermDisabilitySection = page.getByRole('button', { name: 'How do I enroll in Short Term Disability?' });
        this.myBenefitsDoWeHaveAMentalHealthProgramAvailableSection = page.getByRole('button', { name: 'Do we have a mental health program available?' });        

        //FAQs Electronic Timesheets elements
        this.electronicTimesheetsWhyAreWeMovingOverToDigitalTimesheetsSection = page.getByRole('button', { name: 'Why are we moving over to digital timesheets?' });
        this.electronicTimesheetsWhyArentAllfacilitiesBeingAffectedSection = page.getByRole('button', { name: 'Why aren’t all facilities being affected?' });
        this.electronicTimesheetsWhatShouldIDoIfINoticeAPayrollDiscrepancySection = page.getByRole('button', { name: 'What should I do if I notice a payroll discrepancy?' });
        this.electronicTimesheetsWillIHaveToGoBackToPaperTimesheetsEverSection = page.getByRole('button', { name: 'Will I have to go back to paper timesheets ever?' });
       
        //FAQs Others elements
        this.otherWhatDoIDoInTheEventOfAWorkPlaceInjurySection = page.getByRole('button', { name: 'What do I do in the event of a work place injury?' });
    }
    
    // Functions/Methods
    async waitForBreadcrumbFaqs(){
        const breadcrumbFaq = this.breadcrumbFaqs;
        await breadcrumbFaq.waitFor();
    }

    async checkInitialCollapsedState() {
        // Selector for the collapsible div
        const collapsibleDiv = await this.page.locator('.collapse:not(.show)');

        if (collapsibleDiv) {
            console.log("The div is initially collapsed as expected.");
        } else {
            console.log("The div is not in the collapsed state initially.");
        }
    }

    /**
      * Asynchronously validates the behavior of an expand/collapse dropdown for FAQs.
      * 
      * @param {ElementHandle} faqsElement - The element representing the FAQs dropdown.
      */
    async validateFAQsExpandcollapseDropdown(faqsDropDownElement) {
        // Wait for the element to display
        await faqsDropDownElement.waitFor();

        // Check if the div is initially collapsed
        const isInitiallyCollapsed = await this.page.locator('.collapse:not(.show)').count() > 0;

        // Click on the element to change its state
        await faqsDropDownElement.click();

        // Give some time for the transition (if needed)
        await this.page.waitForTimeout(500); // adjust the time as necessary

        // Check if the div is now expanded
        const isExpanded = await this.page.locator('.collapse.show').count() > 0;

        // Click on the element again to collapse it
        await faqsDropDownElement.click();

        // Wait for any transition back to collapsed state
        await this.page.waitForTimeout(500); // Adjust as needed

        // Check if the div has returned to collapsed state
        const isReCollapsed = await this.page.locator('.collapse:not(.show)').count() > 0;

        // Log the results
        if (isInitiallyCollapsed && isExpanded && isReCollapsed) {
            // Log success message if the expected behavior is observed
            console.log("FAQs DropDown is initially collapsed, then expanded, and then re-collapsed as expected");
        } else {
            // Log failure message if the expected behavior is not observed
            console.log("FAQs DropDown did not change as expected(expanded/collapsed).");
        }
    }

}
export {FAQsPage};