import randomizer from '../../main/framework/randomizer.js';
import configManager from '../config_manager.js';
import logger from '../../main/framework/logger.js';

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
        logger.log(`[info] ▶ get ${this.elementName} text:`);
        logger.log(`[info]   text contains: "${(await (await this.getElement()).getText())}"`);
        return await (await this.getElement()).getText();
    }

    async clickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        await (await this.getElement()).click();
    }

    async doubleClickElement() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        await (await this.getElement()).doubleClick();
    }

    async clickElementWithMouse() {
        logger.log(`[info] ▶ click ${this.elementName}`);
        await browser.action('pointer').move({ duration: 0, origin: (await this.getElement()) }).down({ button: 0 }).up({ button: 0 }).perform();
    }

    async scrollToElement() {
        logger.log(`[info] ▶ scroll to ${this.elementName}`);
        await (await this.getElement()).scrollIntoView();
    }

    async clickElementFromList(index) {
        logger.log(`[info] ▶ click element from ${this.elementName}`);
        await ((await this.getElements())[index]).click();
    }

    async inputData(data) {
        logger.log(`[info] ▶ input ${this.elementName}`);
        await (await this.getElement()).setValue(data);
    }

    async enterData(data) {
        logger.log(`[info] ▶ input ${this.elementName} and submit`);
        await (await this.getElement()).setValue(data);
        await browser.keys('enter');
    }

    async getAttributeValue(attr) {
        logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return (await this.getElement()).getAttribute(attr);
    }

    async elementIsDisplayed() {
        logger.log(`[info] ▶ check ${this.elementName} is present:`);
        logger.log(await (await this.getElement()).isDisplayed() ? `[info]   ${this.elementName} is present` : `[info]   ${this.elementName} is not present`);
        return await (await this.getElement()).isDisplayed();
    }

    async elementIsDisplayedInViewport() {
        logger.log(`[info] ▶ check ${this.elementName} is present in viewport:`);
        logger.log(await (await this.getElement()).isDisplayedInViewport() ? `[info]   ${this.elementName} is present in viewport` : `[info]   ${this.elementName} is not present in viewport`);
        return await (await this.getElement()).isDisplayedInViewport();
    }

    async elementIsClickable() {
        logger.log(`[info] ▶ check ${this.elementName} is clickable:`);
        logger.log(await (await this.getElement()).isClickable() ? `[info]   ${this.elementName} is clickable` : `[info]   ${this.elementName} is not clickable`);
        return await (await this.getElement()).isClickable();
    }

    async elementIsExisting() {
        logger.log(`[info] ▶ check ${this.elementName} is exists:`);
        logger.log(await (await this.getElement()).isExisting() ? `[info]   ${this.elementName} is exists` : `[info]   ${this.elementName} is not exists`);
        return await (await this.getElement()).isExisting();
    }

    async elementIsEnabled() {
        logger.log(`[info] ▶ check ${this.elementName} is enable:`);
        logger.log(await (await this.getElement()).isEnabled() ? `[info]   ${this.elementName} is enable` : `[info]   ${this.elementName} is not enable`);
        return await (await this.getElement()).isEnabled();
    }

    async waitIsClickable() {
        logger.log(`[info] ▶ wait ${this.elementName} is clickable`);
        await (await this.getElement()).waitForClickable({timeout:configManager.getConfigData().waitTime});
    }

    async waitIsNotClickable() {
        logger.log(`[info] ▶ wait ${this.elementName} is not clickable`);
        await (await this.getElement()).waitForClickable({timeout:configManager.getConfigData().waitTime, reverse:true});
    }
    
    async waitIsEnabled() {
        logger.log(`[info] ▶ wait ${this.elementName} is enable`);
        await (await this.getElement()).waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }

    async waitIsExisting() {
        logger.log(`[info] ▶ wait ${this.elementName} is exists`);
        await (await this.getElement()).waitForExist({timeout:configManager.getConfigData().waitTime});
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
            logger.log(`[info] ▶ click random element from ${this.elementName}`);
            const randomElement = await randomizer.getRandomElement(await this.getElements(), exceptionsList);
            await randomElement.click();
            exceptionsList.push(randomElement);
            return randomElement;
        }
    }
}
    
export default BaseElement;