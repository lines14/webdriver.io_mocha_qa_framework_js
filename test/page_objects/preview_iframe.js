const BaseForm = require('../../main/framework/base_form');
const Label = require('../../main/framework/base_element_children/label');
const configManager = require('../../main/config_manager');

class PreviewIframe extends BaseForm {
    constructor() {
        super('//a[contains(@href, "https://www.euronews.com")]', '"preview" iframe');
        this.unsubscribeLink = new Label('//a[contains(@href, "https://services.ownpage.fr/unsubscribe")]', 'unsubscribe link');
    }

    async getUnsubscribeLinkValue() {
        return await this.unsubscribeLink.getAttributeValue(configManager.getTestData().linkAttribute);
    }
}

module.exports = new PreviewIframe();