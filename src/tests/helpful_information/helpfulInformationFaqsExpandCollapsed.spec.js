import {test, expect} from '@playwright/test';
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[228923] CWA: Helpful Info-FAQ: I can Expand/collapsed FAQS @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const faqsPage = new FAQsPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select FAQs link
    await faqsPage.faqsLink.click();

    // Assert header
    await expect(faqsPage.faqsLinkHeader).toBeVisible();

    // Validate My Pay FAQS
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myPayHowDoIUpdateMyFederalOrAssignmentStateTaxWithHoldingsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myPayHowDoIUpdateMyAddressSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myPayHowDoIViewMyCurrentPayStubSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myPayHowDoIViewMyPreviousPayStubSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myPayHowDoIViewMyW2Section);

    // Validate My Benefits FAQS
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowDoIElectMyBenefitsAsANewHireReHireSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowDoIWaiveDeclineMyBenefitsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitScanIAddADomesticPartnerToMyBenefitsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowIongDoIhaveToEnrollInMyBenefitsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowDoIViewMyCurrentBenefitsSelectionSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsOnceIAmEnrolledInInsuranceWhenAndHowWillIReceiveMYInsuranceCardsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsCanIUseMYInsuranceTheFirstDayOfMyContractSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsWhenCanIElectOrMakeChangesSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsWhenWillMyInsuranceCoverageEndSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsWhenWillIReceiveMyCobraPacketSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitshowDoIEnrollInCobraSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowMuchDoesCobraCostSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowIongDoesCobraLastSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowDoIEnrollInThe401kPlanSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsHowDoIEnrollInShortTermDisabilitySection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.myBenefitsDoWeHaveAMentalHealthProgramAvailableSection);


    // Validate Electronic Timesheets FAQS
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.electronicTimesheetsWhyAreWeMovingOverToDigitalTimesheetsSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.electronicTimesheetsWhyArentAllfacilitiesBeingAffectedSection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.electronicTimesheetsWhatShouldIDoIfINoticeAPayrollDiscrepancySection);
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.electronicTimesheetsWillIHaveToGoBackToPaperTimesheetsEverSection);

    // Validate Other FAQS
    await faqsPage.validateFAQsExpandcollapseDropdown(faqsPage.otherWhatDoIDoInTheEventOfAWorkPlaceInjurySection);
});