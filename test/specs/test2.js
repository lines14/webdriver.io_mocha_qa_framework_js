const { assert } = require("chai");
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger.configureLogger();
    });
    
    it('Test case 2', async function() {
        await browser.url(configManager.getConfigData().url);
        assert.isTrue(await homePage.pageIsDisplayed(), 'welcome page is not open');

        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        await signInForm.clickSendToBottomButton();
        await signInForm.waitCloseHelpForm();
        assert.isNotTrue(await signInForm.helpFormCloseButtonClickable(), 'form content is not hidden');
    });
});