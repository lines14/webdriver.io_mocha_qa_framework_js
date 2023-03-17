const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const signInForm = require('../page_objects/sign_in_form');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger();
    });
    it('Test case 4', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.pageIsDisplayed();
        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        const timerValue = await signInForm.getTimerText();
        chai.assert.equal(timerValue, '00:00:00', 'timer starts not from "00:00"');
    });
});