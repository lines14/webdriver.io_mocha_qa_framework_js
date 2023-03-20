const randomizer = require('../../main/framework/randomizer');
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
        console.log(`▶ get ${this.elementName} text:`);
        console.log(`▶ text contains: "${(await (await this.getElement()).getText())}"`);
        return await (await this.getElement()).getText();
    }

    async clickElement() {
        console.log(`▶ click ${this.elementName}`);
        await (await this.getElement()).click();
    }

    async inputData(data) {
        console.log(`▶ input ${this.elementName}`);
        await (await this.getElement()).setValue(data);
    }

    async enterData(data) {
        console.log(`▶ input ${this.elementName} and submit`);
        await (await this.getElement()).setValue(data);
        await browser.keys('enter');
    }

    async getAttributeValue(attr) {
        console.log(`▶ get ${this.elementName} attribute value`);
        return (await this.getElement()).getAttribute(attr);
    }

    async elementIsDisplayed() {
        console.log(`▶ check ${this.elementName} is present:`);
        console.log(await (await this.getElement()).isDisplayed() ? `▶ ${this.elementName} is present` : `▶ ${this.elementName} is not present`);
        return await (await this.getElement()).isDisplayed();
    }

    async elementIsClickable() {
        console.log(`▶ check ${this.elementName} is clickable:`);
        console.log(await (await this.getElement()).isClickable() ? `▶ ${this.elementName} is clickable` : `▶ ${this.elementName} is not clickable`);
        return await (await this.getElement()).isClickable();
    }

    async elementIsExisting() {
        console.log(`▶ check ${this.elementName} is exists:`);
        console.log(await (await this.getElement()).isExisting() ? `▶ ${this.elementName} is exists` : `▶ ${this.elementName} is not exists`);
        return await (await this.getElement()).isExisting();
    }

    async elementIsEnabled() {
        console.log(`▶ check ${this.elementName} is enable:`);
        console.log(await (await this.getElement()).isEnabled() ? `▶ ${this.elementName} is enable` : `▶ ${this.elementName} is not enable`);
        return await (await this.getElement()).isEnabled();
    }

    async waitIsClickable() {
        console.log(`▶ wait ${this.elementName} is clickable`);
        await (await this.getElement()).waitForClickable({timeout:configManager.getConfigData().waitTime});
    }

    async waitIsNotClickable() {
        console.log(`▶ wait ${this.elementName} is not clickable`);
        await (await this.getElement()).waitForClickable({timeout:configManager.getConfigData().waitTime, reverse:true});
    }
    
    async waitIsEnabled() {
        console.log(`▶ wait ${this.elementName} is enable`);
        await (await this.getElement()).waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }

    async clickRandomElementsFromList(...args) {
        let count = args[0];
        let exceptionsLocators = args.slice(1, args.length);

        if (args === undefined) {
            count = 1;
        } else if (typeof args[0] !== 'number') {
            count = 1;
            exceptionsLocators = args.slice(0, args.length);
        }

        const exceptionsList = [];
        for (let counter = 0; counter < exceptionsLocators.length; counter++) {
            exceptionsList.push(await $(exceptionsLocators[counter]));
        }

        for (let counter = 0; counter < count; counter++) {
            console.log(`▶ click random element from ${this.elementName}`);
            const randomElement = await randomizer.getRandomElement(await this.getElements(), exceptionsList);
            await browser.action('pointer').move({ duration: 0, origin: randomElement }).down({ button: 0 }).up({ button: 0 }).perform();
            exceptionsList.push(randomElement);
        }
    }
}
    
module.exports = BaseElement;