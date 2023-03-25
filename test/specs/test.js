const { assert } = require('chai');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');
const browserUtils = require('../../main/framework/browser_utils');
const gmailApi = require('../api/gmail_api');
const gmailApiUtils = require('../api/gmail_api_utils');
const mainPage = require('../page_objects/main_page');
const newslettersPage = require('../page_objects/newsletters_page');
const messageForm = require('../page_objects/message_form');
const confirmPage = require('../page_objects/confirm_page');
const previewIframe = require('../page_objects/preview_iframe');
const unsubscribePage = require('../page_objects/unsubscribe_page');
const path = require("path");

describe('Gmail API Euronews (API + WEB) task', function(){    
    before(async function() {
        await gmailApiUtils.refreshToken();
        await browserUtils.configureBrowserLogger();
    });

    it('Test case 1: Euronews Gmail API', async function() {
        await browser.url(configManager.getConfigData().baseUrl);
        await mainPage.clickDismissCookiesButton();
        assert.isTrue(await mainPage.pageIsDisplayed(), 'main page of euronews is not opened');

        await mainPage.clickNewslettersButton();
        assert.isTrue(await newslettersPage.pageIsDisplayed(), 'page "newsletters" is not opened');

        await newslettersPage.clickRandomSubscriptionButton();
        assert.isTrue(await newslettersPage.emailBoxDisplayedInViewport(), 'an email form has not appeared at the bottom of the page');

        let messagesCount = await gmailApiUtils.getMessagesCount();
        await newslettersPage.inputEmail();
        await newslettersPage.clickSubmitButton();
        await newslettersPage.waitConfirmationFormClickable();
        assert.isAbove(await gmailApiUtils.waitMessagesCountIncrement(), messagesCount, 'you have not received an email with a request to confirm your subscription');

        const newestMessage = ((await gmailApi.getMessages()).data.messages).shift();
        await gmailApiUtils.saveHTML((await gmailApi.getMessages(newestMessage.id)).data.payload.parts.shift());
        await browser.url(`file:${path.join(__dirname, configManager.getConfigData().htmlFromMessage)}`);
        await messageForm.clickConfirmEmailButton();
        await browser.switchToWindow((await browser.getWindowHandles()).pop());
        assert.isTrue(await confirmPage.pageIsDisplayed(), 'a page with a message about successful subscription confirmation is not opened');

        await confirmPage.clickBackToTheSiteButton();
        assert.isTrue(await mainPage.pageIsDisplayed(), 'main page of euronews is not opened');

        await mainPage.clickNewslettersButton();
        await newslettersPage.clickSeePreviewsButton();
        await browser.switchToFrame(await newslettersPage.getIframeElement());
        assert.isTrue(await previewIframe.pageIsDisplayed(), 'a preview of the required plan is not opened');

        await browser.url(await previewIframe.getUnsubscribeLinkValue());
        assert.isTrue(await unsubscribePage.pageIsDisplayed(), 'unsubscribe page is not opened');

        messagesCount = await gmailApiUtils.getMessagesCount();
        await unsubscribePage.inputEmail();
        await unsubscribePage.clickSubmitButton();
        assert.isTrue(await unsubscribePage.unsubscribeConfirmTextExisting(), 'a message that the subscription was canceled not appears');
        assert.equal(await gmailApiUtils.waitMessagesCountIncrement(), messagesCount, 'the letter has arrived');
    });

    after(async function() {
        await logger.logToFile();
    });
});