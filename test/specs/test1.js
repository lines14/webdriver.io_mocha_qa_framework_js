const { assert } = require("chai");
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const logger = require('../../main/framework/logger');
const browserUtils = require('../../main/framework/browser_utils');
const unionReportingDatabase = require('../db/union_reporting_database');

describe('Database task', function(){
    before(async function() {
        await unionReportingDatabase.writeProjectAndAuthor();
        await browserUtils.configureBrowserLogger();
    });
    
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        assert.isTrue(await homePage.pageIsDisplayed(), 'welcome page is not open');

        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        await signInForm.waitCookiesButtonClickable();
        await signInForm.acceptCookies();
        assert.isNotTrue(await signInForm.cookiesMessageExisting(), 'Form is not closed');
    });

    after(async function() {
        await unionReportingDatabase.writeTestResult(this.currentTest.state);
        await logger.logToFile();
    });
});