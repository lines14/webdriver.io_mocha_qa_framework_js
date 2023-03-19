const BaseForm = require('../../main/framework/base_form');
const TextBox = require('../../main/framework/base_element_children/text_box');
const CheckBox = require('../../main/framework/base_element_children/check_box');
const Button = require('../../main/framework/base_element_children/button');
const Label = require('../../main/framework/base_element_children/label');
const randomizer = require('../../main/framework/randomizer');
const configManager = require('../../main/config_manager');

class SignInForm extends BaseForm {
    constructor() {
        super('//div[@class="password-check__password-rule" and contains(text(), "Your password requires")]', 'sign in form');
        this.passwordBox = new TextBox('//input[@placeholder="Choose Password"]', 'password');
        this.emailBox = new TextBox('//input[@placeholder="Your email"]', 'email');
        this.domainBox = new TextBox('//input[@placeholder="Domain"]', 'domain');
        this.dropdownOpenButton = new Button('//div[@class="dropdown__field" and text()="other"]', 'dropdown open button');
        this.allDropdownButtons = new Button('//div[@class="dropdown__list-item"]', 'all dropdown buttons');
        this.acceptCheckbox = new CheckBox('.checkbox__check', '"accept" checkbox');
        this.nextButton = new Button('//a[@class="button--secondary" and text()="Next"]', '"next" button');
        this.sendToBottomButton = new Button('.help-form__send-to-bottom-button', '"send to bottom" button');
        this.helpFormCloseButton = new Button('.help-form__close-button', 'help form "close" button');
        this.acceptCookiesButton = new Button('.button--transparent', '"not really, no" button');
        this.cookiesMessage = new Label('//p[@class="cookies__message" and contains(text(), "site uses cookies")]', 'cookies message');
        this.timer = new Label('.timer--center', 'timer');
    }

    async inputSignInData() {
        await this.passwordBox.inputData(await randomizer.getRandomString(true, true, true, configManager.getTestData().sameCharacter, configManager.getTestData().minStringLength));
        await this.emailBox.inputData(await randomizer.getRandomString(true, true, true, configManager.getTestData().sameCharacter, configManager.getTestData().minStringLength));
        await this.domainBox.inputData(await randomizer.getRandomString(true, true, true, configManager.getTestData().sameCharacter, configManager.getTestData().minStringLength));
    }

    async openDropdown() {
        await this.dropdownOpenButton.clickElement();
    }

    async clickButtonFromDropdown() {
        await this.allDropdownButtons.clickRandomElementsFromList();
    }

    async clickAcceptCheckbox() {
        await this.acceptCheckbox.clickElement();
    }

    async clickNextButton() {
        await this.nextButton.clickElement();
    }

    async clickSendToBottomButton() {
        await this.sendToBottomButton.clickElement();
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
        await this.acceptCookiesButton.clickElement();
    }

    async cookiesMessageExisting() {
        return await this.cookiesMessage.elementIsExisting();
    }
    
    async getTimerText() {
        return await this.timer.getText();
    }
}

module.exports = new SignInForm();