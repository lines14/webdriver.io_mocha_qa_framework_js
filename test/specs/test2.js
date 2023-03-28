const { assert } = require("chai");
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const logger = require('../../main/framework/logger');
const browserUtils = require('../../main/framework/browser_utils');

describe('Userinterface task', function(){
    before(async function() {
        await browserUtils.configureBrowserLogger();
    });
    
    it('Test case 4', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.pageIsDisplayed();
        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        assert.equal(await signInForm.getTimerText(), configManager.getTestData().timerValue, 'timer starts not from "00:00"');
    });

    after(async function() {
        await logger.logToFile();
    });
});