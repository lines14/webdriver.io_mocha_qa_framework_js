// const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');
const browserLogger = require('../../main/framework/browser_logger');

describe('Userinterface task', function(){
    before(async function() {
        await browserLogger();
    });
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.pageIsDisplayed();
        await homePage.clickLink();
    });
});