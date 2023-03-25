const BaseForm = require('../../main/framework/base_form');
const TextBox = require('../../main/framework/base_element_children/label');
const Button = require('../../main/framework/base_element_children/label');
const Label = require('../../main/framework/base_element_children/label');
const configManager = require('../../main/config_manager');

class UnsubscribePage extends BaseForm {
    constructor() {
        super('//form[contains(@action, "unsubscribe")]', 'unsubscribe page');
        this.emailBox = new TextBox('//input[@type="email"]', 'email box');
        this.submitButton = new Button('//button[@type="submit"]', 'submit button');
        this.unsubscribeConfirmText = new Label('//strong[contains(text(), "unsubscribe")]', 'unsubscribe confirm text');
    }
    
    async inputEmail() {
        await this.emailBox.inputData(configManager.getTestData().email);
    }

    async clickSubmitButton() {
        await this.submitButton.clickElement();
    }

    async unsubscribeConfirmTextExisting() {
        return await this.unsubscribeConfirmText.elementIsExisting();
    }
}

module.exports = new UnsubscribePage();