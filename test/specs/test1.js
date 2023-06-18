// import { assert } from "chai";
// import configManager from '../../main/configManager.js';
// import homePage from '../pageObjects/homePage.js';
// import signInForm from '../pageObjects/signInForm.js';
// import unionReportingDatabase from '../DB/unionReportingDatabase.js';

// describe('Database task', () => {
//     it('Test case 1', async () => {
//         await unionReportingDatabase.writeProjectAndAuthor();
//         await browser.url(configManager.getConfigData().baseURL);
//         assert.isTrue(await homePage.pageIsDisplayed(), 'welcome page is not open');

//         await homePage.clickLink();
//         await signInForm.pageIsDisplayed();
//         await signInForm.waitCookiesButtonClickable();
//         await signInForm.acceptCookies();
//         assert.isNotTrue(await signInForm.cookiesMessageExisting(), 'Form is not closed');
//     });

//     after(async function () {
//         await unionReportingDatabase.writeTestResult(this.currentTest.state);
//     });
// });