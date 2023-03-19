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
        console.log(`▶ ${this.pageName} is open`);
        return await (await this.getUniqueElement()).isDisplayed();
    }

    async pageIsEnabled() {
        console.log(`▶ ${this.pageName} is enable`);
        return await (await this.getUniqueElement()).isEnabled();
    }

    async waitPageIsDisplayed() {
        console.log(`▶ wait ${this.elementName} is open`);
        await (await this.getUniqueElement()).waitForDisplayed({timeout:configManager.getConfigData().waitTime});
    }
    
    async waitPageIsEnabled() {
        console.log(`▶ wait ${this.elementName} is enable`);
        await (await this.getUniqueElement()).waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }
}

module.exports = BaseForm;