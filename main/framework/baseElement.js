import EC from 'wdio-wait-for';
import Randomizer from '../../main/framework/randomizer.js';
import ConfigManager from '../configManager.js';
import Logger from '../../main/framework/logger.js';

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
        Logger.log(`[info] ▶ get ${this.elementName} text:`);
        Logger.log(`[info]   text contains: "${(await (await this.getElement()).getText())}"`);
        return await (await this.getElement()).getText();
    }

    async waitForText(text) {
        await browser.waitUntil(EC.textToBePresentInElement(this.elementLocator, text) , { timeout: ConfigManager.getConfigData().waitTime });
    }

    async clickElement() {
        Logger.log(`[info] ▶ click ${this.elementName}`);
        await (await this.getElement()).click();
    }

    async doubleClickElement() {
        Logger.log(`[info] ▶ click ${this.elementName}`);
        await (await this.getElement()).doubleClick();
    }

    async clickElementWithMouse() {
        Logger.log(`[info] ▶ click ${this.elementName}`);
        await browser.action('pointer')
        .move({ duration: 0, origin: (await this.getElement()) })
        .down({ button: 0 })
        .up({ button: 0 })
        .perform();
    }

    async scrollToElement() {
        Logger.log(`[info] ▶ scroll to ${this.elementName}`);
        await (await this.getElement()).scrollIntoView();
    }

    async clickElementFromList(index) {
        Logger.log(`[info] ▶ click element from ${this.elementName}`);
        await ((await this.getElements())[index]).click();
    }

    async inputData(data) {
        Logger.log(`[info] ▶ input ${this.elementName}`);
        await (await this.getElement()).setValue(data);
    }

    async enterData(data) {
        Logger.log(`[info] ▶ input ${this.elementName} and submit`);
        await (await this.getElement()).setValue(data);
        await browser.keys('enter');
    }

    async getAttributeValue(attr) {
        Logger.log(`[info] ▶ get ${this.elementName} attribute value`);
        return (await this.getElement()).getAttribute(attr);
    }

    async elementIsDisplayed() {
        Logger.log(`[info] ▶ check ${this.elementName} is present:`);
        Logger.log(await (await this.getElement()).isDisplayed() 
        ? `[info]   ${this.elementName} is present` 
        : `[info]   ${this.elementName} is not present`);
        return await (await this.getElement()).isDisplayed();
    }

    async elementIsDisplayedInViewport() {
        Logger.log(`[info] ▶ check ${this.elementName} is present in viewport:`);
        Logger.log(await (await this.getElement()).isDisplayedInViewport() 
        ? `[info]   ${this.elementName} is present in viewport` 
        : `[info]   ${this.elementName} is not present in viewport`);
        return await (await this.getElement()).isDisplayedInViewport();
    }

    async elementIsClickable() {
        Logger.log(`[info] ▶ check ${this.elementName} is clickable:`);
        Logger.log(await (await this.getElement()).isClickable() 
        ? `[info]   ${this.elementName} is clickable` 
        : `[info]   ${this.elementName} is not clickable`);
        return await (await this.getElement()).isClickable();
    }

    async elementIsExisting() {
        Logger.log(`[info] ▶ check ${this.elementName} is exists:`);
        Logger.log(await (await this.getElement()).isExisting() 
        ? `[info]   ${this.elementName} is exists` 
        : `[info]   ${this.elementName} is not exists`);
        return await (await this.getElement()).isExisting();
    }

    async elementIsEnabled() {
        Logger.log(`[info] ▶ check ${this.elementName} is enable:`);
        Logger.log(await (await this.getElement()).isEnabled() 
        ? `[info]   ${this.elementName} is enable` 
        : `[info]   ${this.elementName} is not enable`);
        return await (await this.getElement()).isEnabled();
    }

    async waitIsClickable() {
        Logger.log(`[info] ▶ wait ${this.elementName} is clickable`);
        await (await this.getElement()).waitForClickable({ timeout: ConfigManager.getConfigData().waitTime });
    }

    async waitIsNotClickable() {
        Logger.log(`[info] ▶ wait ${this.elementName} is not clickable`);
        await (await this.getElement()).waitForClickable({ timeout: ConfigManager.getConfigData().waitTime, reverse:true });
    }
    
    async waitIsEnabled() {
        Logger.log(`[info] ▶ wait ${this.elementName} is enable`);
        await (await this.getElement()).waitForEnabled({ timeout: ConfigManager.getConfigData().waitTime });
    }

    async waitIsExisting() {
        Logger.log(`[info] ▶ wait ${this.elementName} is exists`);
        await (await this.getElement()).waitForExist({ timeout: ConfigManager.getConfigData().waitTime });
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

        const exceptionsList = exceptionsLocators.map(async (element) => await $(element));
        for (let counter = 0; counter < count; counter++) {
            Logger.log(`[info] ▶ click random element from ${this.elementName}`);
            const randomElement = await Randomizer.getRandomElement(await this.getElements(), exceptionsList);
            await randomElement.click();
            exceptionsList.push(randomElement);
            return randomElement;
        }
    }
}
    
export default BaseElement;