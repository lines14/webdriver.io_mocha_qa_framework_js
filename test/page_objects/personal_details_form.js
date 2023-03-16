const BaseForm = require('../../main/framework/base_form');
const Label = require('../../main/framework/base_element_children/label');

class HomePage extends BaseForm {
    constructor() {
        super('p*=welcome to User Inyerface', 'home page');
        this.link = new Label('[href="/game.html"]', 'link with text "here"');
    }
    async clickLink() {
        await this.link.clickButton();
    }
}

module.exports = new HomePage();