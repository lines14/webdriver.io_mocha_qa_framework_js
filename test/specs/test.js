// const chai = require('chai');
const configManager = require('../../main/config_manager');
const homePage = require('../page_objects/home_page');

describe('Userinterface task', function(){
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        await homePage.clickLink()
    });
});