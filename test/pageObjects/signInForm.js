import BaseForm from '../../main/framework/baseForm.js';
import TextBox from '../../main/framework/baseElementChildren/textBox.js';
import CheckBox from '../../main/framework/baseElementChildren/checkBox.js';
import Button from '../../main/framework/baseElementChildren/button.js';
import Label from '../../main/framework/baseElementChildren/label.js';
import randomizer from '../../main/framework/randomizer.js';
import configManager from '../../main/configManager.js';

class SignInForm extends BaseForm {
    constructor() {
        super('//div[@class="password-check__password-rule" and contains(text(), "Your password requires")]', 'sign in form');
        this.passwordBox = new TextBox('//input[@placeholder="Choose Password"]', 'password');
        this.emailBox = new TextBox('//input[@placeholder="Your email"]', 'email');
        this.domainBox = new TextBox('//input[@placeholder="Domain"]', 'domain');
        this.dropdownOpenButton = new Button('//div[@class="dropdown__field" and text()="other"]', 'dropdown open button');
        this.allDropdownButtons = new Button('//div[@class="dropdown__list-item"]', 'all dropdown buttons');
        this.acceptCheckbox = new CheckBox('//span[contains(@class, "checkbox__check")]', '"accept" checkbox');
        this.nextButton = new Button('//a[@class="button--secondary" and text()="Next"]', '"next" button');
        this.sendToBottomButton = new Button('//button[contains(@class, "help-form__send-to-bottom-button")]', '"send to bottom" button');
        this.helpFormCloseButton = new Button('//button[contains(@class, "help-form__close-button")]', 'help form "close" button');
        this.acceptCookiesButton = new Button('//button[contains(@class, "button--transparent")]', '"not really, no" button');
        this.cookiesMessage = new Label('//p[@class="cookies__message" and contains(text(), "site uses cookies")]', 'cookies message');
        this.timer = new Label('//div[contains(@class, "timer--center")]', 'timer');
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

export default new SignInForm();