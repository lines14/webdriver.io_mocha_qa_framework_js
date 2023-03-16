const configManager = require('../config_manager');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }
    async getUniqueElement() {
        return await $(this.pageLocator);
    }
    async pageIsDisplayed() {
        console.log(`▶ ${this.pageName} is open`)
        const uniqueElement = await this.getUniqueElement();
        const bool = await uniqueElement.isDisplayed();
        return bool;
    }
    async pageIsEnabled() {
        console.log(`▶ ${this.pageName} is enabled`)
        const element = await this.getUniqueElement();
        return await element.isEnabled();
    }
    async waitPageIsDisplayed() {
        await this.getUniqueElement().waitForDisplayed({timeout:configManager.getConfigData().waitTime})
    }
    async waitPageIsEnabled() {
        await this.getUniqueElement().waitForEnabled({timeout:configManager.getConfigData().waitTime})
    }
}

module.exports = BaseForm;