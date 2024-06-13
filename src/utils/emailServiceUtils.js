import axios from 'axios';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

async function getEmailDetails(email) {
    try {
        const response = await axios.get(`https://getnada.cc/api/email/${email}/GwNvKEofrdyS7JTXCzHQ`);
        return response.data;
    } catch (error) {
        console.error('Error fetching email details:', error);
        throw error;
    }
}
async function getEmailMessages(email) {
    try {
        const response = await axios.get(`https://getnada.cc/api/messages/${email}/GwNvKEofrdyS7JTXCzHQ`);
        const responseData = response.data;

        // Check if the response data contains the expected properties or data.
        if (!responseData || !responseData[0] || !responseData[0].content) {
            console.error('Email messages data not found in the response.');
            return null; // Handle the case where the expected data is missing.
        }

        return responseData;
    } catch (error) {
        console.error('Error fetching email messages:', error);
        throw error;
    }
}
async function clickRegistrationActivationLink(email) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        // Fetch the email messages using your getEmailMessages function.
        const emailData = await getEmailMessages(email);

        // Check if emailData is null or missing content property.
        if (!emailData || !emailData[0] || !emailData[0].content) {
            console.error('Email content not found for the provided email.');
            return; // Handle the case where email data is missing or empty.
        }

        // Access the content of the first email message.
        const contentHTML = emailData[0].content;

        // Use Cheerio to parse the contentHTML.
        const $ = cheerio.load(contentHTML);

        // Find the link with the href attribute.
        const registrationActivationLink = $('a[href]');

        // Check if the link was found.
        if (registrationActivationLink.length === 0) {
            console.error('Registration activation link not found in the email content.');
            return; // Handle the case where the link is not found.
        }

        // Extract the href attribute (URL) of the link.
        const linkHref = registrationActivationLink.attr('href');

        // Navigate to the linkHref using Playwright.
        await page.goto(linkHref);

        console.log('Activation Account was clicked');
    } catch (error) {
        console.error('Error clicking registration activation link:', error);
    }
}

export { getEmailDetails, clickRegistrationActivationLink };