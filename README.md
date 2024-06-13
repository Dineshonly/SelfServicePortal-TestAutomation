<<<<<<< HEAD
﻿# Clinicians Web App e2e Automation

[![Playwright](https://img.shields.io/badge/Powered%20by-Playwright-blueviolet)](https://playwright.dev/)

This project utilizes the Playwright framework for browser automation and testing using JavaScript and Node.js.

## Features

- **Automated Testing:** Playwright enables automated testing of the Clinician Web App across multiple browsers to ensure functionality and reliability.
- **End-to-End Testing:** Write end-to-end tests that simulate real user interactions to validate the entire workflow of the Clinician Web App.
- **Browser Compatibility:** Test the Clinician Web App on different browsers such as Chrome, Firefox, and Safari to ensure consistent performance and user experience.

## Page Object Model

The Clinician Web App e2e Automation project adopts the Page Object Model
(POM) for organizing and managing test automation code.
This pattern abstracts the web pages into reusable classes called "page objects"
that encapsulate the interaction with elements on specific pages.
Each page is represented by its own class, and tests interact with the page through its corresponding page object.

To create pages following the POM, refer to the [Playwright documentation](https://playwright.dev/docs/pom) for best practices.

## Getting Started

To get started with the Clinicians Web App e2e Automation and Playwright, follow these steps:

1. Write your Playwright test scripts for the Clinician Web App in the `tests/` directory. You can use the example tests provided as a starting point.

   Example test: `src/tests/common/login/userLoginTemplate.js`

2. Set the environment value to `qa`, `uat`, or `prod` in the `.env` file.

   Example: `NODE_ENV=qa`

3. Run the Playwright tests using the following command:

   ```bash
   npx playwright test
   ```

    - **To run tests in the QA environment:** `npm run test:e2e:qa`
    - **To run tests in the QA environment with specific tags (e.g., @navigation):** `npm run test:tags:qa`
    - **To run tests in the UAT environment:** `npm run test:e2e:uat`
    - **To run tests in the production environment:** `npm run test:e2e:prod`

   To run a specific test, use the following command:

   ```
   npx playwright test path/to/your-test-file.spec.js
   ```
4. Run reports 
   ```bash 
   npx playwright show-report test-results\html
   ```
---

# LoginPage Class

The `LoginPage` class represents a login page in a web application and provides an interface for interacting with the login elements using the Playwright library.

## Getting Started

To use the `LoginPage` class, follow these steps:

1. Import the required dependencies: (update 11/22/2023)
   ```javascript
   // Importing the baseUrl from the config module
   1. `import { test, expect } from '@playwright/test';`
   ```

2. Create an instance of the `LoginPage` class and pass a Playwright `Page` object to the constructor:
   ```javascript
   import { PlaywrightDevPage } from './PlaywrightDevPage'; // Import the PlaywrightDevPage class
   import { Page } from 'playwright'; // Import the Page class from Playwright

   // Create a Playwright Page object (ensure you have launched a browser and opened a new page)
   const page = await new Page();

   // Create an instance of the LoginPage class
   const loginPage = new LoginPage(page);
   ```

## Constructor

### LoginPage(page)

Creates a new instance of the `LoginPage` class.

- `page`: A Playwright `Page` object representing the web page to interact with.

## Properties

The `LoginPage` class has the following properties:

- `userName`: A locator representing the input field for entering the username. (Locator: `#okta-signin-username`)
- `passWord`: A locator representing the input field for entering the password. (Locator: `#okta-signin-password`)
- `signInButton`: A locator representing the sign-in button. (Locator: `#okta-signin-submit`)

## Methods

### async navigate()

Navigates the web page to the base URL specified in the `config.js` module.

```javascript
await loginPage.navigate();
```

### async enterCredentials(username, password)

Enters the provided `username` and `password` into the corresponding input fields on the login page.

- `username`: The username to be entered in the username input field.
- `password`: The password to be entered in the password input field.

```javascript
const username = 'your_username';
const password = 'your_password';
await loginPage.enterCredentials(username, password);
```

### async clickSubmit()

Clicks the sign-in button on the login page.

```javascript
await loginPage.clickSubmit();
```

## Example Usage

Here's an example test (`userLoginTemplate.js`) that demonstrates how to use the `LoginPage` class:

```javascript
const { test, expect } = require('@playwright/test');
const { loginToWebApp } = require("/../../src/utils/loginUtils");

test('User logs into Web App', async ({ page }) => {

    // Use the loginToWebApp function to perform the login
    await loginToWebApp(page);

 })
```
=======
# SelfServicePortal-TestAutomation
>>>>>>> fb8eb0c8cfc832a7958fb5254afa31061bf783b0
