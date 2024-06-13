// Import the Playwright Test package, configuration, and LoginPage
import {getConfig} from './config';
import {LoginPage} from './src/pages/login/loginPage';
import {LoginPulsePage} from './src/pages/pulse/pulseLogin/loginPulsePage';
import {BasePage} from './src/pages/login/basePage';

// Login function for ciro Clinician
const performLoginCiroClinician = async (page) => {

    // Retrieve configuration data for the base URL and login credentials
    const {baseUrl, username, password } = getConfig('ciroClinician');
    
    // Initialize the Page object
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Navigate to the base URL
    await page.goto(baseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();

    // Use the LoginPage object to enter login credentials and submit the form
    await loginPage.enterCredentials(username, password);
    await loginPage.clickSubmit();    
}

const performLoginCiroClinicianDefaultUser = async (page) => {

    // Retrieve configuration data for the base URL and login credentials
    const {baseUrl, DEFAULT_USER, DEFAULT_PASSWORD } = getConfig('ciroClinician');

    // Initialize the Page object
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Navigate to the base URL
    await page.goto(baseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();

    // Use the LoginPage object to enter login credentials and submit the form
    await loginPage.enterCredentials(DEFAULT_USER, DEFAULT_PASSWORD);
    await loginPage.clickSubmit();
}

// Login function for Pulse
const performLoginPulse = async (page) => {
    
    // Retrieve configuration data for the base URL and login credentials
    const {pulseUrl, pulseUsername, pulsePassword} = getConfig('pulse');

    // Initialize the Page object
    const loginPulse = new LoginPulsePage(page);
    const basePage = new BasePage(page);

    // Navigate to the base URL
    await page.goto(pulseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();

    // Use the LoginPulsePage object to enter login credentials and submit the form
    await loginPulse.enterEmailAndClickNext(pulseUsername);
    await loginPulse.enterPasswordClickSignIn(pulsePassword);
    await loginPulse.dontShowAgain.click();
    await loginPulse.yesButton.click();    
}

// Define a function for loading the login page
const loadLoginPageCiroClinician = async (page) => {
    // Retrieve configuration data for the base URL
    const { baseUrl } = getConfig('ciroClinician');

    // Initialize the BasePage object
    const basePage = new BasePage(page);

    // Navigate to the base URL
    await page.goto(baseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();
};

// Exporting performLogin
export {
    performLoginCiroClinician,
    performLoginCiroClinicianDefaultUser,
    performLoginPulse,
    loadLoginPageCiroClinician
};