const BaseForm = require('../../main/framework/base_form');
const Button = require('../../main/framework/base_element_children/label');

class MainPage extends BaseForm {
    constructor() {
        super('//a[@aria-label="Euronews Logo"]', 'main page');
        this.dismissCookiesButton = new Button('//span[@class="didomi-continue-without-agreeing"]', '"continue without agreeing cookies" button');
        this.newslettersButton = new Button('//span[@data-event="newsletter-link-header" and text()="Newsletters"]', '"newsletters" button');
    }
    
    async clickDismissCookiesButton() {
        await this.dismissCookiesButton.clickElement();
    }

    async clickNewslettersButton() {
        await this.newslettersButton.clickElement();
    }
}

module.exports = new MainPage();