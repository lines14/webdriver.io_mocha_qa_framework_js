const BaseForm = require('../../main/framework/base_form');
const TextBox = require('../../main/framework/base_element_children/text_box');
const CheckBox = require('../../main/framework/base_element_children/check_box');
const Button = require('../../main/framework/base_element_children/button');
const configManager = require('../../main/config_manager');

class SignInForm extends BaseForm {
    constructor() {
        super('div*=Your password requires', 'sign in form');
        this.passwordBox = new TextBox('[placeholder="Choose Password"]', 'password');
        this.emailBox = new TextBox('[placeholder="Your email"]', 'email');
        this.domainBox = new TextBox('[placeholder="Domain"]', 'domain');
        this.otherButton = new Button('div=other', '"other" button');
        this.dropdownButton = new Button('div=.org', 'button from dropdown');
        this.acceptCheckBox = new CheckBox('.checkbox__check', '"accept" checkbox');
        this.nextButton = new Button('a=Next', '"next" button');
    }
    async inputSignInData() {
        await this.passwordBox.inputText(configManager.getTestData().password);
        await this.emailBox.inputText(configManager.getTestData().email);
        await this.domainBox.inputText(configManager.getTestData().domain);
    }
    async clickOtherButton() {
        await this.otherButton.clickButton();
    }
    async clickDropdownButton() {
        await this.dropdownButton.clickButton();
    }
    async clickAcceptCheckbox() {
        await this.acceptCheckBox.clickButton();
    }
    async clickNextButton() {
        await this.nextButton.clickButton();
    }
}

module.exports = new SignInForm();