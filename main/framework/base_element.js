const configManager = require('../config_manager');

class BaseElement {
    constructor(elementLocator, elementName) {
        this.elementLocator = elementLocator;
        this.elementName = elementName;
    }
    async getElement() {
        return await $(this.elementLocator);
    }
    async getElements() {
        return await $$(this.elementLocator);
    }
    async getText() {
        console.log(`    ▶ get displayed ${this.elementName}`)
        const element = await this.getElement();
        const text = await element.getText();
        console.log(`    ▶ text contains: "${text}"`)
        return text;
    }
    async clickButton() {
        console.log(`    ▶ click ${this.elementName}`)
        const element = await this.getElement();
        await element.click();
    }
    async inputText(text) {
        console.log(`    ▶ input ${this.elementName}`)
        const element = await this.getElement();
        await element.setValue(text);
    }
    async enterText(text) {
        console.log(`    ▶ input ${this.elementName} and submit`)
        const element = await this.getElement();
        await element.setValue(text);
        await browser.keys('Enter');
    }
    async getAttributeValue(attr) {
        const element = await this.getElement();
        const atr = element.getAttribute(attr);
        return atr;
    }
    async elementIsDisplayed() {
        console.log(`    ▶ ${this.elementName} is present`)
        const element = await this.getElement();
        const bool = await element.isDisplayed();
        return bool;
    }
    async checkElementIsEnabled() {
        const element = await this.getElement();
        const bool = await element.isEnabled();
        return bool;
    }
    async waitIsClickable() {
        console.log(`    ▶ wait ${this.elementName} is visible`)
        await this.getElement().waitForClickable({timeout:configManager.getConfigData().waitTime});
    }
    async waitIsEnabled() {
        console.log(`    ▶ wait ${this.elementName} is enabled`)
        await this.getElement().waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }
}
    
module.exports = BaseElement;