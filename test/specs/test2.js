const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger();
    });
    it('Test case 2', async function() {
        await browser.url(configManager.getConfigData().url);
        const isHomePageDisplayed = await homePage.pageIsDisplayed();
        chai.assert.equal(isHomePageDisplayed, true, 'welcome page is not open');

        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        await signInForm.clickSendToBottomButton();
        await signInForm.waitCloseHelpForm();
        const isHelpFormCloseButtonClickable = await signInForm.helpFormCloseButtonClickable();
        chai.assert.equal(isHelpFormCloseButtonClickable, false, 'form content is not hidden');
    });
});