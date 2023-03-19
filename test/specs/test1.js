const { assert } = require("chai");
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const thisIsMeForm = require('../page_objects/this_is_me_form');
const personalDetailsForm = require('../page_objects/personal_details_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger.configureLogger();
    });
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        assert.isTrue(await homePage.pageIsDisplayed(), 'welcome page is not open');

        await homePage.clickLink();
        assert.isTrue(await signInForm.pageIsDisplayed(), 'The "1" card is not open');

        await signInForm.inputSignInData();
        await signInForm.clickOtherButton();

        await signInForm.clickDropdownButton();
        
        await signInForm.clickAcceptCheckbox();
        await signInForm.clickNextButton();
        assert.isTrue(await thisIsMeForm.pageIsDisplayed(), 'The "2" card is not open');

        await thisIsMeForm.clickUnselectAllCheckBox();
        await thisIsMeForm.clickCinnamonCheckBox();
        await thisIsMeForm.clickMulletsCheckBox();
        await thisIsMeForm.clickWindowsCheckBox();
        await thisIsMeForm.uploadImage();
        await thisIsMeForm.clickNextButton();
        assert.isTrue(await personalDetailsForm.pageIsDisplayed(), 'The "3" card is not open');
    });
});