// const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const thisIsMeForm = require('../page_objects/this_is_me_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger();
    });
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.pageIsDisplayed();
        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        await signInForm.inputSignInData();
        await signInForm.clickOtherButton();
        await signInForm.clickDropdownButton();
        await signInForm.clickAcceptCheckbox();
        await signInForm.clickNextButton();
        await thisIsMeForm.pageIsDisplayed();
        await thisIsMeForm.clickUnselectAllCheckBox();
        await thisIsMeForm.clickCinnamonCheckBox();
        await thisIsMeForm.clickMulletsCheckBox();
        await thisIsMeForm.clickWindowsCheckBox();
        // await thisIsMeForm.uploadImageFromPath();
        await thisIsMeForm.clickNextButton();
    });
});