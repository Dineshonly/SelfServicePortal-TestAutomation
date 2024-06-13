class ResumeScanFullApplicationPage {
    constructor(page) {
        this.page = page;
        this.scanResume = page.locator('[id=Resume Scan]');
        this.manualEntryResume = page.locator('[id=Manual Entry]');
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.ResumeScanNextButton = page.getByTestId('resume-scan-next-button');
        this.startFullAppResumeScanButton = page.getByTestId('start-full-app-resume-scan');
        this.preferredNames = page.getByTestId('resume-scan-personal-info-preferred-names');
        this.contactInformationText = page.getByText('Contact Information');
        this.emailInput = page.getByTestId('resume-scan-contact-info-email');
        this.phoneNumberInput = page.getByTestId('resume-scan-contact-info-phone');
        this.streetAddressInput = page.getByTestId('resume-scan-contact-info-street-address');
        this.cityInput = page.getByTestId('resume-scan-contact-info-city');
        this.stateInput = page.getByTestId('resume-scan-contact-info-state');
        this.zipCodeInput = page.getByTestId('resume-scan-contact-info-zip-code');
        this.workSummaryText = page.getByText('Work Summary');
        this.titleDropdown = page.getByTestId('resume-scan-work-summary-title');
        this.specialityDropdown = page.getByTestId('resume-scan-work-summary-specialty');
        this.totalYearsOfExperienceInput = page.getByTestId('resume-scan-work-summary-total-years-of-experience');
        this.yearsOfSpecialityExperienceInput = page.getByTestId('resume-scan-work-summary-years-of-specialty-experience');
        this.clinicalAreaDropdown = page.getByTestId('resume-scan-clinical-areas-clincical-area-0');
        this.yearsOfClinicalExperience = page.getByTestId('resume-scan-clinical-areas-years-of-experience-0');
        this.addClinicalAreaButton = page.getByRole('button', { name: 'Add Clinical Area' });
        this.personalStatementTextArea = page.getByTestId('resume-scan-work-summary-personal-statement');
        this.isTravelClinicianBeforeYesRadio = page.getByTestId('resume-scan-work-summary-is-travel-clinician-before-yes');
        this.isTravelClinicianBeforeNoRadio = page.getByTestId('resume-scan-work-summary-is-travel-clinician-before-no');
        this.isEligibleWorkingInUsYesRadio = page.getByTestId('resume-scan-work-summary-is-eligible-working-in-us-yes');
        this.isEligibleWorkingInUsNoRadio = page.getByTestId('resume-scan-work-summary-is-eligible-working-in-us-no');
        this.workHistoryAddButton = page.getByTestId('resume-scan-work-history-add-button');
        this.volunteerAddButton = page.getByTestId('resume-scan-volunteer-experience-add-button');
        this.professionalOrganizationsAddButton = page.getByTestId('resume-scan-professional-organizations-add-button');

    }
}
export {ResumeScanFullApplicationPage};