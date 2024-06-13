// fullApplicationPage.js
import ActionUtils from "../../utils/actionsUtils";
class FullApplicationPage {
   
    // Constructor to initialize the page instance
    constructor(page) {
        this.page = page;
        this.currentIndex = 1;
        this.actionUtils = new ActionUtils(page);        
        this.NextButton = page.getByRole('button', { name: 'Next' });
        this.BackButton = page.getByRole('button', { name: 'Back' });
        this.SaveProgressButton = page.getByRole('button', { name: 'Save Progress' });
        this.SubmitButton = page.getByRole('button', { name: 'Submit' });

        // Personal Info
        this.personalInfoJobTitle = 'xpath=//div[contains(text(),\'Job Title *\')]';
        this.personalInfoSpecially = 'xpath=//div[text()=\'Specialty *\']';
        this.personalInfoState = 'xpath=//div[text()=\'State *\']';

        // Eligible to work
        this.eligibleToWorkYes = page.getByRole('radio', { name: 'Yes' });
        this.eligibleToWorkNo = page.getByRole('radio', { name: 'No' });

        // Experience
        this.clinicalAreaAdd = 'xpath=//span[text()=\'Clinical Area\']';
        this.clinicalAreaWorkedfirst = `xpath=(//div[text()='Clinic Area Worked'])[1]`;
        this.clinicalAreaWorkedSecond = `xpath=(//div[text()='Clinic Area Worked'])[2]`;
        this.facilityAddHeader = page.locator('h4',{hasText:'Add Facility'});
        this.facilityButton = 'xpath=//span[text()=\'Facility\']';
        this.addFacilityButton = page.getByRole('button', { name: 'Add Facility' });
        this.selectStateFacilityDropDown = 'xpath=//div[text()=\'State\']';
        this.selectAssignmentTypeDropDown = 'xpath=//div[text()=\'Assignment Type\']';

        // Education
        this.chartingSkillsdropDown = '//div[text()=\'Charting Skills (allows multiple)\']';
        this.addEducationSchool = '//span[contains(text(),\'School\')]';
        this.addSchoolButton = '//button[contains(text(),\'Add School\')]';        
        this.selectSchoolStateDropDown = 'xpath=//div[text()=\'State\']';
        
        // Licenses
        this.compactLicenseButton = 'xpath=//span[contains(text(),\'Compact License\')]';
        this.dropdownCompactLicenses = 'xpath=//div[contains(text(),\'Compact License\')]';
        this.dropdownStateLicense = 'xpath=//div[text()=\'State License\']';
        
        // Certifications
        this.dropdownCertificationType = 'xpath=(//div[text()=\'Certification Type\'])[1]';
        this.additionalCertificationButton = 'xpath=//span[contains(text(),\'Additional Certification\')]';
        this.additionalCertificationdropdown = 'xpath=(//div[text()=\'Certification Type\'])[2]';
        
        // Preferences
        this.dropdownDesiredStates = '//div[contains(text(),\'Desired State(s)\')]';
        this.dropdownShiftPreferences = '//div[contains(text(),\'Shift Preferences\')]';
        
        // Application Completed
        this.ApplicationCompletedHeader = page.locator('h4',{hasText:'Application Completed'});
        this.returnHomeButton = page.getByRole('button', { name: 'Return Home' });
    }
    
    // Selector property 
    get fillPersonalInfoPhone() {return 'input[id="mobilePhone"]';}
    get fillPersonalInfoSsn() {return 'input[id="ssn"]';}
    get fillPersonalInfoDoB() {return 'input[id="dateOfBirth"]';}
    get fillPersonalInfoOtherLegalName() {return 'input[id="otherLegalNames"]';}
    get fillPersonalInfoAddress() {return 'input[id="currentAddress1"]';}
    get fillPersonalInfoCity() { return 'input[id="currentAddressCity"]';}
    get fillPersonalInfoZipCode() {return 'input[id="currentAddressPostalCode"]';}
    get selectPersonalInfoEligibleInUsYes() {return 'input[id="eligibleInUs-yes"]';}
    get selectPersonalInfoEligibleInUsNo() {return 'input[id="eligibleInUs-no"]';}
    get fillPersonalInfoPrimaryContactFirstName() {return 'input[id="primaryContact.firstName"]';}
    get fillPersonalInfoPrimaryContactLastName() {return 'input[id="primaryContact.lastName"]';}
    get fillPersonalInfoPrimaryContactRelationshipType() {return 'input[id="primaryContact.relationshipType"]';}
    get fillPersonalInfoPrimaryContactEmail() {return 'input[id="primaryContact.email"]';}
    get fillPersonalInfoPrimaryContactHomePhone() {return 'input[id="primaryContact.homePhone"]';}
    get fillPersonalInfoPrimaryContactAlternatePhone() {return 'input[id="primaryContact.alternatePhone"]';}
    get fillTotalYearsOfMedicalExperience() {return 'input[id="yearsOfExperience"]';}
    get fillExperiencePriorTravelNurseYes() {return 'input[id="priorTravelNurse-yes"]';}
    get fillExperiencePriorTravelNurseNo() {return 'input[id="priorTravelNurse-no"]';}
    get fillExperiencePriorYearOfExperienceFirst(){return 'input[id="clinicalAreasWorked.0.yearsOfExperience"]';}
    get fillExperiencePriorYearOfExperienceSecond(){return 'input[id="clinicalAreasWorked.1.yearsOfExperience"]';}
    get fillExperienceFacilityName(){return 'input[id="facilityName"]';}
    get fillStreetAddressFacility(){return 'input[id="streetAddress"]';}
    get fillFromDateFacility(){return 'input[id="fromDate"]';}
    get fillEndDateFacility(){return 'input[id="toDate"]';}
    get selectIamCurrentRoleFacility(){return 'input[id="isFacilityCurrent"]';}
    get selectIsThisATeachingFacilityYes(){return 'input[id="teachingFacility-yes"]';}
    get selectIsThisATeachingFacilityNo(){return 'input[id="teachingFacility-no"]';}
    get fillCityFacility(){return 'input[id="city"]';}
    get fillZipCodeFacility(){return 'input[id="zipCode"]';}
    get fillUnitOrDepartmentFacility(){return 'input[id="unitOrDepartment"]';}
    get fillTraumaLevelFacility(){return 'input[id="traumaLevel"]';}
    get fillShiftFacility(){return 'input[id="shift"]';}
    get fillNpRatioFacility(){return 'input[id="npRatio"]';}
    get fillBedsInUnitFacility(){return 'input[id="bedsInUnit"]';}
    get fillSupervisorNameFacility(){return 'input[id="supervisorName"]';}
    get fillContactPhoneFacility(){return 'input[id="contactPhone"]';}
    get fillCompanyNameFacility(){return 'input[id="companyName"]';}
    get selectCanCallYesFacility(){return 'input[id="canCall-yes"]';}
    get selectCanCallNoFacility(){return 'input[id="canCall-no"]';}
    get fillSchoolName(){return 'input[id="schoolName"]';}
    get fillDateGraduated(){return 'input[id="dateGraduated"]';}
    get fillSchoolCity(){return 'input[id="city"]';}
    get fillSchoolDegree(){return 'input[id="degree"]';}
    get fillSchoolDegreeType(){return 'input[id="degreeType"]';}
    get fillCompactLicenseNumber(){return 'input[id="licences.0.licenseNumber"]';}
    get fillCompactLicenseExpirationDate(){return 'input[id="licences.0.expirationDate"]';}
    get fillLicenseNumber(){return 'input[id="licences.1.licenceNumber"]';}
    get fillLicenseExpirationDate(){return 'input[id="licences.1.expirationDate"]';}
    get fillCertificationExpirationDateFirst(){return 'input[id="certifications.0.expirationDate"]';}
    get fillCertificationExpirationDateSecond(){return 'input[id="certifications.1.expirationDate"]';}
    get fillDateYouCanStart(){return 'input[id="startDate"]';}
    get fillSalaryExpectations(){return 'input[id="salaryExpectations"]';}
    get fillClinicAreasPreferred(){return 'input[id="clinicalAreasPreferred"]';}
    get selectIUnderstandAndAgree() {return 'input[id="understandAndAgree"]';}
    get fillFullNameSignature(){return 'input[id="fullName"]';}
    get fillDateSignature(){return 'input[id="date"]';}
    
    // functions/Methods

    // Personal Info    
    async fillPersonalInfo(
        phoneNumber,
        jobTitle,
        specialtySelect,
        ssn,
        dob,
        otherLegalNames
    ) {
        // Fill in the phone number
        await this.page.fill(this.fillPersonalInfoPhone, phoneNumber);

        await this.actionUtils.clickAndSelectJobTitle(this.personalInfoJobTitle, jobTitle)

        // Use utility to select the specialty from the dropdown
        await this.actionUtils.clickAndSelect(this.personalInfoSpecially, specialtySelect);

        // Fill in the Social Security Number (SSN)
        await this.page.fill(this.fillPersonalInfoSsn, ssn);

        // Fill in the Date of Birth (DOB)
        await this.page.fill(this.fillPersonalInfoDoB, dob);

        // Fill in any other legal names
        await this.page.fill(this.fillPersonalInfoOtherLegalName, otherLegalNames);
    }

    // Current Address
    async fillCurrentAddress(
        address,
        city,
        stateSelect,
        zipcode
    ) {
        // Fill in the current address
        await this.page.fill(this.fillPersonalInfoAddress, address);

        // Fill in the city of the current address
        await this.page.fill(this.fillPersonalInfoCity, city);

        // Use utility to select the state from the dropdown
        await this.actionUtils.clickAndSelect(this.personalInfoState, stateSelect);

        // Fill in the ZIP code of the current address
        await this.page.fill(this.fillPersonalInfoZipCode, zipcode);

    }

    // Emergency Information
    async fillEmergencyInformation(
        firstName,
        lastName,
        type,
        email,
        homePhone,
        alternate
    ) {
        // Fill in the primary contact's first name
        await this.page.fill(this.fillPersonalInfoPrimaryContactFirstName, firstName);

        // Fill in the primary contact's last name
        await this.page.fill(this.fillPersonalInfoPrimaryContactLastName, lastName);

        // Fill in the relationship type of the primary contact
        await this.page.fill(this.fillPersonalInfoPrimaryContactRelationshipType, type);

        // Fill in the email address of the primary contact
        await this.page.fill(this.fillPersonalInfoPrimaryContactEmail, email);

        // Fill in the primary contact's home phone number
        await this.page.fill(this.fillPersonalInfoPrimaryContactHomePhone, homePhone);

        // Fill in an alternate phone number for the primary contact
        await this.page.fill(this.fillPersonalInfoPrimaryContactAlternatePhone, alternate);
    }


    // Experience Section   
    async fillExperienceSection(numberYears){
        await this.page.fill(this.fillTotalYearsOfMedicalExperience,numberYears);
    }
    async fillHaveYouBeenATravelNurseBeforeYes(){
        await this.page.click(this.fillExperiencePriorTravelNurseYes);
    }
    async fillHaveYouBeenATravelNurseBeforeNo(){
        await this.page.click(this.fillExperiencePriorTravelNurseNo);
    }

    // Clinical Area Section 
    async fillClinicalAreaSectionFirst(
        clinicAreaWorked,
        years,
    ){
        // Click the clinical Area button to start filling the section
        await this.page.click(this.clinicalAreaAdd);

        // Use utility to select the clinic Area worked from the dropdown
        await this.actionUtils.clickAndSelect(this.clinicalAreaWorkedfirst,clinicAreaWorked);

        // Fill year of experience
        await this.page.fill(this.fillExperiencePriorYearOfExperienceFirst,years);
    }

    async fillClinicalAreaSectionSecond(
        clinicAreaWorked,
        years,
    ){
        // Click the clinical Area button to start filling the section
        await this.page.click(this.clinicalAreaAdd);

        // Use utility to select the clinic Area worked from the dropdown
        await this.actionUtils.clickAndSelect(this.clinicalAreaWorkedSecond,clinicAreaWorked);

        // Fill year of experience
        await this.page.fill(this.fillExperiencePriorYearOfExperienceSecond,years);
    }

    // Facilities Section 
    async fillFacilitiesSection(
        facility,
        fromDate,
        streetAddress,
        city,
        stateSelectFacility,
        zip,
        unit,
        trauma,
        assignmentType,
        shift,
        ratio,
        numberOfBeds,
        supervisor,
        phone,
        company
    ) {
        // Click the facility button to start filling the section
        await this.page.click(this.facilityButton);

        // Fill in the facility name
        await this.page.fill(this.fillExperienceFacilityName, facility);

        // Select the option indicating that you are the current role
        await this.page.click(this.selectIamCurrentRoleFacility);

        // Fill in the start date at the facility
        await this.page.fill(this.fillFromDateFacility, fromDate);

        // Fill in the address details
        await this.page.fill(this.fillStreetAddressFacility, streetAddress);
        await this.page.fill(this.fillCityFacility, city);

        // Use utility to select the state from the dropdown
        await this.actionUtils.clickAndSelectStateFacility(this.selectStateFacilityDropDown, stateSelectFacility);

        // Fill in zip code, unit, trauma level, assignment type, shift, etc.
        await this.page.fill(this.fillZipCodeFacility, zip);
        await this.page.fill(this.fillUnitOrDepartmentFacility, unit);
        await this.page.fill(this.fillTraumaLevelFacility, trauma);
        await this.actionUtils.clickAndSelect(this.selectAssignmentTypeDropDown, assignmentType);
        await this.page.fill(this.fillShiftFacility, shift);
        await this.page.fill(this.fillNpRatioFacility, ratio);
        await this.page.fill(this.fillBedsInUnitFacility, numberOfBeds);

        // Fill in supervisor and contact details
        await this.page.fill(this.fillSupervisorNameFacility, supervisor);
        await this.page.fill(this.fillContactPhoneFacility, phone);
        await this.page.fill(this.fillCompanyNameFacility, company);

        // Select the option indicating that you can be contacted
        await this.page.click(this.selectCanCallYesFacility);
    }
    async selectTeachingFacilityYes(){
        await this.page.click(this.selectIsThisATeachingFacilityYes);
    }
    async selectTeachingFacilityNo(){
        await this.page.click(this.selectIsThisATeachingFacilityNo);
    }
    async selectCanCallYes(){
        await this.page.click(this.selectCanCallYesFacility);
    }
    async selectCanCallNo(){
        await this.page.click(this.selectCanCallNoFacility);
    }

    // Education Section   
    async selectComputerChartingSkills(skillSelect) {
        // Use utility to select a computer charting skill from the dropdown
        await this.actionUtils.clickAndSelectChartingSkills(this.chartingSkillsdropDown, skillSelect);
    }
    async fillEducationSchool(
        schoolName,
        dateGraduated,
        schoolCity,
        schoolState,
        degree,
        degreeType
    ){
        await this.page.click(this.addEducationSchool);
        await this.page.fill(this.fillSchoolName,schoolName);
        await this.page.fill(this.fillDateGraduated,dateGraduated);
        await this.page.fill(this.fillSchoolCity,schoolCity);
        await this.actionUtils.clickAndSelectStateFacility(this.selectSchoolStateDropDown,schoolState);
        await this.page.fill(this.fillSchoolDegree,degree);
        await this.page.fill(this.fillSchoolDegreeType,degreeType);
        await this.page.click(this.addSchoolButton);
    }    
    async fillCompactLicense(
        compactLicense,
        licenseNumber,
        licenseExpirationDate
    ){
        await this.page.click(this.compactLicenseButton);
        await this.actionUtils.clickAndSelectStateLicense(this.dropdownCompactLicenses,compactLicense);
        await this.page.fill(this.fillCompactLicenseNumber,licenseNumber);
        await this.page.fill(this.fillCompactLicenseExpirationDate,licenseExpirationDate);
    }
    async fillStateLicense(
        stateLicense,
        licenseNumber,
        licenseExpirationDate
    ){
        await this.actionUtils.clickAndSelectStateLicense(this.dropdownStateLicense,stateLicense);
        await this.page.fill(this.fillLicenseNumber,licenseNumber);
        await this.page.fill(this.fillLicenseExpirationDate,licenseExpirationDate);
    }
    async fillCertificationsFirst(
        certificationsType,
        certificationsExpirationDate
    ){
        await this.actionUtils.clickAndSelectChartingSkills(this.dropdownCertificationType,certificationsType);
        await this.page.fill(this.fillCertificationExpirationDateFirst,certificationsExpirationDate);
    }
    async fillCertificationsSecond(
        certificationsType,
        certificationsExpirationDate
    ){
        await this.page.click(this.additionalCertificationButton);
        await this.actionUtils.clickAndSelectChartingSkills(this.additionalCertificationdropdown,certificationsType);
        await this.page.fill(this.fillCertificationExpirationDateSecond,certificationsExpirationDate);
    }

    // Preferences Section    
    async fillPreferences(
        desiredState,
        dateYouCanStart,
        salaryExpectations,
        shiftPreferences,
        clinicAreasPreferred
    ){
        await this.actionUtils.clickAndSelectByLabel(this.dropdownDesiredStates,desiredState);
        await this.page.fill(this.fillDateYouCanStart,dateYouCanStart);
        await this.page.fill(this.fillSalaryExpectations,salaryExpectations);
        await this.actionUtils.clickAndSelectChartingSkills(this.dropdownShiftPreferences,shiftPreferences);
        await this.page.fill(this.fillClinicAreasPreferred,clinicAreasPreferred);
    }

    // Signature Section
    async fillSignature(
        fullNameSignature,
        dateSignature
    ){
        await this.page.click(this.selectIUnderstandAndAgree);
        await this.page.fill(this.fillFullNameSignature,fullNameSignature);
        await this.page.fill(this.fillDateSignature,dateSignature);
    }

    async selectEligibleInUsYes() {
        await this.eligibleToWorkYes.click();
    }
    
}
export {FullApplicationPage};