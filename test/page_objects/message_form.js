const BaseForm = require('../../main/framework/base_form');
const Button = require('../../main/framework/base_element_children/label');

class MessageForm extends BaseForm {
    constructor() {
        super('//span[contains(text(), "You\'ve signed up to receive the daily newsletter")]', 'message form');
        this.confirmEmailButton = new Button('//a[contains(text(), "Confirm your email address")]', '"confirm email address" button');
    }
    
    async clickConfirmEmailButton() {
        await this.confirmEmailButton.clickElement();
    }
}

module.exports = new MessageForm();