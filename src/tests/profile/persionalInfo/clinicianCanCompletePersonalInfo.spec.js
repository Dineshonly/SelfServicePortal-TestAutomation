import {test} from '@playwright/test';
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";
import {performLoginCiroClinician} from "../../../../testBase";

test('[] @regression CWA: Clinician can complete the Personal Info section', async ({page}) => {
    const personalInfoPage = new PersonalInfoPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Personal Info Link
    await personalInfoPage.personalInfoLink.click();

    // Fill Personal Info
    await personalInfoPage.fillForm({
        firstName: 'Bob',
        mobilePhone: '',
        aboutMe: '',
        favoritePlaces: '',
        petsInfo: '',
        hobbies: '',
        favoriteBand: '',
        favoriteFood: '',
        favoriteBeverage: '',
        favoriteBook: ''
    })

    // Delete
    await personalInfoPage.fillForm({
        firstName: '',
        mobilePhone: '',
        aboutMe: '',
        favoritePlaces: '',
        petsInfo: '',
        hobbies: '',
        favoriteBand: '',
        favoriteFood: '',
        favoriteBeverage: '',
        favoriteBook: ''
    })
});

