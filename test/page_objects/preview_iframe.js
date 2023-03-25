const BaseForm = require('../../main/framework/base_form');
const Label = require('../../main/framework/base_element_children/label');
const configManager = require('../../main/config_manager');

class PreviewIframe extends BaseForm {
    constructor() {
        super('//a[contains(text(), "this email forwarded to you")]', '"preview" iframe');
        this.unsubscribeLink = new Label('//a[text()="unsubscribe by clicking here"]', 'unsubscribe link');
    }

    async getUnsubscribeLinkValue() {
        return await this.unsubscribeLink.getAttributeValue(configManager.getTestData().linkAttribute);
    }
}

module.exports = new PreviewIframe();