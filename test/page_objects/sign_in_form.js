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
        this.otherButton = new Button('//div[@class="dropdown__field" and text()="other"]', '"other" button');








        this.dropdownButton = new Button('//div[@class="dropdown__list-item" and text()=".com"]', 'button from dropdown');







        this.acceptCheckBox = new CheckBox('.checkbox__check', '"accept" checkbox');
        this.nextButton = new Button('//a[@class="button--secondary" and text()="Next"]', '"next" button');
        this.sendToBottomButton = new Button('.help-form__send-to-bottom-button', '"send to bottom" button');
        this.helpFormCloseButton = new Button('.help-form__close-button', 'help form "close" button');
        this.acceptCookiesButton = new Button('.button--transparent', '"not really, no" button');
        this.cookiesMessage = new Label('//p[@class="cookies__message" and contains(text(), "site uses cookies")]', 'cookies message');
        this.timer = new Label('.timer--center', 'timer');
    }
    async inputSignInData() {
        await this.passwordBox.inputData(randomizer.getRandomString(
            configManager.getTestData().stringLength, 
            configManager.getTestData().stringLength, 
            true, 
            true, 
            configManager.getTestData().sameCharacter, 
            true
            ));
        await this.emailBox.inputData(randomizer.getRandomString(
            configManager.getTestData().stringLength, 
            configManager.getTestData().stringLength, 
            true, 
            true, 
            configManager.getTestData().sameCharacter, 
            true
            ));
        await this.domainBox.inputData(randomizer.getRandomString(
            configManager.getTestData().stringLength, 
            configManager.getTestData().stringLength, 
            true, 
            true, 
            configManager.getTestData().sameCharacter, 
            true
            ));
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
    async cookiesMessageExisting() {
        return await this.cookiesMessage.elementIsExisting();
    }
    async getTimerText() {
        return await this.timer.getText();
    }
}

module.exports = new SignInForm();