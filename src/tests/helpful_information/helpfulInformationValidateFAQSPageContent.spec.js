import {test, expect} from '@playwright/test';
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[113797] CWA: Helpful Info-FAQS: view the content under "FAQS" page @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const faqsPage = new FAQsPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select FAQs link
    await faqsPage.faqsLink.waitFor();
    await faqsPage.faqsLink.click();

    // Validate Faqs Page Header
    await expect(faqsPage.faqsLinkHeader).toBeVisible();

    // Validate My Pay Header
    await expect(faqsPage.myPayHeader).toBeVisible();

    // Validate Interactive Walkthrough Link
    await expect(faqsPage.interactiveWalkthroughLink).toBeVisible();

    // Validate My Pay FQAS
    await expect(faqsPage.myPayHowDoIUpdateMyFederalOrAssignmentStateTaxWithHoldingsSection).toBeVisible();
    await expect(faqsPage.myPayHowDoIUpdateMyAddressSection).toBeVisible();
    await expect(faqsPage.myPayHowDoIViewMyCurrentPayStubSection).toBeVisible();
    await expect(faqsPage.myPayHowDoIViewMyPreviousPayStubSection).toBeVisible();
    await expect(faqsPage.myPayHowDoIViewMyW2Section).toBeVisible();

    // Validate My Benefits Header
    await expect(faqsPage.myBenefitsHeader).toBeVisible();

    // Validate My Benefits FQAS
    await expect(faqsPage.myBenefitsHowDoIElectMyBenefitsAsANewHireReHireSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowDoIWaiveDeclineMyBenefitsSection).toBeVisible();
    await expect(faqsPage.myBenefitScanIAddADomesticPartnerToMyBenefitsSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowIongDoIhaveToEnrollInMyBenefitsSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowDoIViewMyCurrentBenefitsSelectionSection).toBeVisible();
    await expect(faqsPage.myBenefitsOnceIAmEnrolledInInsuranceWhenAndHowWillIReceiveMYInsuranceCardsSection).toBeVisible();
    await expect(faqsPage.myBenefitsCanIUseMYInsuranceTheFirstDayOfMyContractSection).toBeVisible();
    await expect(faqsPage.myBenefitsWhenCanIElectOrMakeChangesSection).toBeVisible();
    await expect(faqsPage.myBenefitsWhenWillMyInsuranceCoverageEndSection).toBeVisible();
    await expect(faqsPage.myBenefitsWhenWillIReceiveMyCobraPacketSection).toBeVisible();
    await expect(faqsPage.myBenefitshowDoIEnrollInCobraSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowMuchDoesCobraCostSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowIongDoesCobraLastSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowDoIEnrollInThe401kPlanSection).toBeVisible();
    await expect(faqsPage.myBenefitsHowDoIEnrollInShortTermDisabilitySection).toBeVisible();
    await expect(faqsPage.myBenefitsDoWeHaveAMentalHealthProgramAvailableSection).toBeVisible();
    
    // Validate Electronic Timesheets Header
    await expect(faqsPage.electronicTimesheetsHeader).toBeVisible();

    // Validate Electronic Timesheets FQAS
    await expect(faqsPage.electronicTimesheetsWhyAreWeMovingOverToDigitalTimesheetsSection).toBeVisible();
    await expect(faqsPage.electronicTimesheetsWhyArentAllfacilitiesBeingAffectedSection).toBeVisible();
    await expect(faqsPage.electronicTimesheetsWhatShouldIDoIfINoticeAPayrollDiscrepancySection).toBeVisible();
    await expect(faqsPage.electronicTimesheetsWillIHaveToGoBackToPaperTimesheetsEverSection).toBeVisible();

        
    // Validate Other Header
    await expect(faqsPage.othersHeader).toBeVisible();

    // Validate Other FQAS
    await expect(faqsPage.otherWhatDoIDoInTheEventOfAWorkPlaceInjurySection).toBeVisible();

    
  
});