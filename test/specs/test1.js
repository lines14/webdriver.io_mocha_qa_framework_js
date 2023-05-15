import { assert } from "chai";
import configManager from '../../main/config_manager.js';
import homePage from '../page_objects/home_page.js';
import signInForm from '../page_objects/sign_in_form.js';
import unionReportingDatabase from '../db/union_reporting_database.js';

describe('Database task', function(){
    it('Test case 1', async function() {
        await browser.url(configManager.getConfigData().url);
        assert.isTrue(await homePage.pageIsDisplayed(), 'welcome page is not open');

        await homePage.clickLink();
        await signInForm.pageIsDisplayed();
        await signInForm.waitCookiesButtonClickable();
        await signInForm.acceptCookies();
        assert.isNotTrue(await signInForm.cookiesMessageExisting(), 'Form is not closed');
    });

    after(async function() {
        await unionReportingDatabase.writeTestResult(this.currentTest.state);
    });
});