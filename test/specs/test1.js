const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const thisIsMeForm = require('../page_objects/this_is_me_form');
const personalDetailsForm = require('../page_objects/personal_details_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger();
    });
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        const isHomePageDisplayed = await homePage.pageIsDisplayed();
        chai.assert.equal(isHomePageDisplayed, true, 'welcome page is not open');

        await homePage.clickLink();
        const isSignInFormDisplayed = await signInForm.pageIsDisplayed();
        chai.assert.equal(isSignInFormDisplayed, true, 'The "1" card is not open');

        await signInForm.inputSignInData();
        await signInForm.clickOtherButton();
        await signInForm.clickDropdownButton();
        await signInForm.clickAcceptCheckbox();
        await signInForm.clickNextButton();
        const isThisIsMeFormDisplayed = await thisIsMeForm.pageIsDisplayed();
        chai.assert.equal(isThisIsMeFormDisplayed, true, 'The "2" card is not open');

        await thisIsMeForm.clickUnselectAllCheckBox();
        await thisIsMeForm.clickCinnamonCheckBox();
        await thisIsMeForm.clickMulletsCheckBox();
        await thisIsMeForm.clickWindowsCheckBox();
        await thisIsMeForm.uploadImage();
        await thisIsMeForm.clickNextButton();
        const isPersonalDetailsFormDisplayed = await personalDetailsForm.pageIsDisplayed();
        chai.assert.equal(isPersonalDetailsFormDisplayed, true, 'The "3" card is not open');
    });
});