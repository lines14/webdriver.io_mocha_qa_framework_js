const BaseForm = require('../../main/framework/base_form');
const Button = require('../../main/framework/base_element_children/label');

class ConfirmPage extends BaseForm {
    constructor() {
        super('//h1[text()="Your subscription has been successfully confirmed."]', '"subscription confirmed" page');
        this.backToTheSiteButton = new Button('//span[text()="Back to the site"]', '"back to the site" button');
    }

    async clickBackToTheSiteButton() {
        await this.backToTheSiteButton.clickElement();
    }
}

module.exports = new ConfirmPage();