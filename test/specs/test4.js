const { assert } = require("chai");
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger.configureLogger();
    });
    it('Test case 4', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.pageIsDisplayed();
        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        assert.equal(await signInForm.getTimerText(), configManager.getTestData().timerValue, 'timer starts not from "00:00"');
    });
});