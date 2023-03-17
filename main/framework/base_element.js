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
        console.log(`▶ get displayed ${this.elementName}`)
        const element = await this.getElement();
        const text = await element.getText();
        console.log(`▶ text contains: "${text}"`)
        return text;
    }
    async clickButton() {
        console.log(`▶ click ${this.elementName}`)
        const element = await this.getElement();
        await element.click();
    }
    async inputData(data) {
        console.log(`▶ input ${this.elementName}`)
        const element = await this.getElement();
        await element.setValue(data);
    }
    async enterData(data) {
        console.log(`▶ input ${this.elementName} and submit`)
        const element = await this.getElement();
        await element.setValue(data);
        await browser.keys('enter');
    }
    async getAttributeValue(attr) {
        const element = await this.getElement();
        const atr = element.getAttribute(attr);
        return atr;
    }
    async elementIsDisplayed() {
        console.log(`▶ check ${this.elementName} is present:`)
        const element = await this.getElement();
        const bool = await element.isDisplayed();
        if (bool === true) {
            console.log(`▶ ${this.elementName} is present`)
        } else {
            console.log(`▶ ${this.elementName} is not present`)
        }
        return bool;
    }
    async elementIsClickable() {
        console.log(`▶ check ${this.elementName} is clickable:`)
        const element = await this.getElement();
        const bool = await element.isClickable();
        if (bool === true) {
            console.log(`▶ ${this.elementName} is clickable`)
        } else {
            console.log(`▶ ${this.elementName} is not clickable`)
        }
        return bool;
    }
    async elementIsEnabled() {
        console.log(`▶ check ${this.elementName} is enable:`)
        const element = await this.getElement();
        const bool = await element.isEnabled();
        if (bool === true) {
            console.log(`▶ ${this.elementName} is enable`)
        } else {
            console.log(`▶ ${this.elementName} is not enable`)
        }
        return bool;
    }
    async waitIsClickable() {
        console.log(`▶ wait ${this.elementName} is clickable`)
        const element = await this.getElement();
        await element.waitForClickable({timeout:configManager.getConfigData().waitTime});
    }
    async waitIsNotClickable() {
        console.log(`▶ wait ${this.elementName} is not clickable`)
        const element = await this.getElement();
        await element.waitForClickable({timeout:configManager.getConfigData().waitTime, reverse:true});
    }
    async waitIsEnabled() {
        console.log(`▶ wait ${this.elementName} is enable`)
        const element = await this.getElement();
        await element.waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }
}
    
module.exports = BaseElement;