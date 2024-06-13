// @ts-check
import {test,expect} from "@playwright/test";
import {HomePage} from "../../../pages/profile/homePage";
import {FullApplicationPage} from "../../../pages/requiredDocuments/fullApplicationPage";
import appData from "../../../../fixtures/fullApplicationData/fullApplicationTestData.json";
import {performLoginCiroClinician} from '../../../../testBase';

test('[] Complete a Full Application @smoke-uat-new-user @smoke-prod-new-user @smoke-qa-new-user',async ({page}) => {

    // Create an instance of the 'page' object to the constructor
    const homePage = new HomePage(page);
    const fullApplicationPage = new FullApplicationPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Click on Full Application Assert Personal Info tab
    await homePage.clickOnFullApplicationAssertPersonalInfoTab();
    
    // Complete all inputs in the Personal Info tab
    // Personal Info
    const personalInfoTestData = appData.personalInfoTestData[0];
    await fullApplicationPage.fillPersonalInfo(
        personalInfoTestData.phoneNumber,
        personalInfoTestData["job title"],
        personalInfoTestData.selectSpecialty,
        personalInfoTestData.ssn,
        personalInfoTestData.dob,
        personalInfoTestData.otherLegalNames);
    
    // Current Address
    const currentAddress = appData.currentAddressTestData[0];
    await fullApplicationPage.fillCurrentAddress(
        currentAddress.streetAddress,
        currentAddress.city,
        currentAddress.selectState,
        currentAddress.zipCode)

    // Click the option indicating eligibility in the US
    await fullApplicationPage.selectEligibleInUsYes();

    // Emergency Information
    const emergencyInformation = appData.emergencyInformationTestData[0];
    await fullApplicationPage.fillEmergencyInformation(
        emergencyInformation.firstName,
        emergencyInformation.lastName,
        emergencyInformation.relationship,
        emergencyInformation.email,
        emergencyInformation.primaryPhoneNumber,
        emergencyInformation.alternatePhoneNumber)
    await fullApplicationPage.NextButton.click();

    // Experience
    const experienceFirst = appData.experienceTestData[0];
    await fullApplicationPage.fillExperienceSection(experienceFirst.totalYearsOfMedicalExperience);
    
    // Add 1 clinical area
    await fullApplicationPage.fillClinicalAreaSectionFirst(
        experienceFirst.ClinicAreaWorked,
        experienceFirst.YearsOfExperience);
    
    // Add 2 clinical areas
    const experienceSecond = appData.experienceTestData[1];
    await fullApplicationPage.fillClinicalAreaSectionSecond(
        experienceSecond.ClinicAreaWorked,
        experienceSecond.YearsOfExperience);

    // Add 1 facilities
    await fullApplicationPage.fillFacilitiesSection(
        experienceFirst.FacilityName,
        experienceFirst.FromDate,
        experienceFirst.StreetAddressFacility,
        experienceFirst.CityFacility,
        experienceFirst.StateFacility,
        experienceFirst.ZipFacility,
        experienceFirst.UnitDepartment,
        experienceFirst.TraumaLevel,
        experienceFirst.AssignmentType,
        experienceFirst.Shift,
        experienceFirst.NursePatientRatio,
        experienceFirst.NumberOfBedsInUnit,
        experienceFirst.SupervisorName,
        experienceFirst.ContactPhone,
        experienceFirst.NameOfCompany)
    await fullApplicationPage.addFacilityButton.click();
    
    // Add 2 facilities
    await fullApplicationPage.fillFacilitiesSection(
        experienceSecond.FacilityName,
        experienceSecond.FromDate,
        experienceSecond.StreetAddressFacility,
        experienceSecond.CityFacility,
        experienceSecond.StateFacility,
        experienceSecond.ZipFacility,
        experienceSecond.UnitDepartment,
        experienceSecond.TraumaLevel,
        experienceSecond.AssignmentType,
        experienceSecond.Shift,
        experienceSecond.NursePatientRatio,
        experienceSecond.NumberOfBedsInUnit,
        experienceSecond.SupervisorName,
        experienceSecond.ContactPhone,
        experienceSecond.NameOfCompany)
    await fullApplicationPage.addFacilityButton.click();
    await fullApplicationPage.NextButton.click();
    
    // Education
    const education = appData.educationTestData[0];
    await fullApplicationPage.selectComputerChartingSkills(education.chartingSkills);
    await fullApplicationPage.fillEducationSchool(
        education.schoolName,
        education.dateGraduated,
        education.schoolCity,
        education.schoolState,
        education.degree,
        education.degreeType
    )
    
    // Compact Licenses
    const compactLicense = appData.compactLicenseTestData[0];
    await fullApplicationPage.fillCompactLicense(
        compactLicense.stateLicense,
        compactLicense.licenseNumber,
        compactLicense.licenseExpirationDate
    )

    // Licenses
    const license = appData.licenseTestData[0];
    await fullApplicationPage.fillStateLicense(
        license.stateLicense,
        license.licenseNumber,
        license.licenseExpirationDate
    )    

    // Certifications 1
    const certifications = appData.certificationsTestData[0];
    await fullApplicationPage.fillCertificationsFirst(
        certifications.certificationType,
        certifications.certificationExpirationDate)
    
    // Certifications 2
    const additionalCertifications = appData.certificationsTestData[1];
    await fullApplicationPage.fillCertificationsSecond(
        additionalCertifications.certificationType,
        additionalCertifications.certificationExpirationDate)
    await fullApplicationPage.NextButton.click();
    
    // Preferences
    const preferences = appData.preferencesTestData[0];
    await fullApplicationPage.fillPreferences(
        preferences.desiredStates,
        preferences.dateYouCanStart,
        preferences.salaryExpectations,
        preferences.shiftPreferences,
        preferences.clinicAreasPreferred
    )
    await fullApplicationPage.NextButton.click();
    
    // Signature
    const signature = appData.signatureTestData[0];
    await fullApplicationPage.fillSignature(
        signature.fullNameSignature,
        signature.dateSignature
    )

    await fullApplicationPage.SubmitButton.click();
    await expect(fullApplicationPage.ApplicationCompletedHeader).toBeVisible;
    const returnHome = page.getByRole('button', { name: 'Return Home' });
    await returnHome.waitFor();
    await returnHome.click();

    // Validate Full App doesn't display
    await expect(homePage.fullApplication).toBeHidden();
})