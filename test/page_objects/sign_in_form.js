const BaseForm = require('../../main/framework/base_form');
const TextBox = require('../../main/framework/base_element_children/text_box');
const CheckBox = require('../../main/framework/base_element_children/check_box');
const Button = require('../../main/framework/base_element_children/button');
const Label = require('../../main/framework/base_element_children/label');
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
        this.sendToBottomButton = new Button('.help-form__send-to-bottom-button', '"send to bottom" button');
        this.helpFormCloseButton = new Button('.help-form__close-button', 'help form "close" button');
        this.acceptCookiesButton = new Button('button=Not really, no', '"not really, no" button');
        this.timer = new Label('.timer--center', 'timer text');
    }
    async inputSignInData() {
        await this.passwordBox.inputData(configManager.getTestData().password);
        await this.emailBox.inputData(configManager.getTestData().email);
        await this.domainBox.inputData(configManager.getTestData().domain);
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
    async clickSendToBottomButton() {
        await this.sendToBottomButton.clickButton();
    }
    async waitCloseHelpForm() {
        await this.helpFormCloseButton.waitIsNotClickable();
    }
    async helpFormCloseButtonClickable() {
        return await this.helpFormCloseButton.elementIsClickable();
    }
    async waitCookiesButtonClickable() {
        await this.acceptCookiesButton.waitIsClickable();
    }
    async acceptCookies() {
        await this.acceptCookiesButton.clickButton();
    }
    async acceptCookiesButtonClickable() {
        return await this.acceptCookiesButton.elementIsClickable();
    }
    async getTimerText() {
        return await this.timer.getText();
    }
}

module.exports = new SignInForm();