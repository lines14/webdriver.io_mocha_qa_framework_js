const configManager = require('./utils/data/config_manager');
const logger = require('./utils/log/logger');

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }

    async getUniqueElement() {
        return await $(this.pageLocator);
    }

    async pageIsDisplayed() {
        logger.log(`[info] ▶ ${this.pageName} is open`);
        return await (await this.getUniqueElement()).isDisplayed();
    }

    async pageIsEnabled() {
        logger.log(`[info] ▶ ${this.pageName} is enable`);
        return await (await this.getUniqueElement()).isEnabled();
    }

    async waitPageIsDisplayed() {
        logger.log(`[info] ▶ wait ${this.elementName} is open`);
        await (await this.getUniqueElement()).waitForDisplayed({timeout:configManager.getConfigData().waitTime});
    }
    
    async waitPageIsEnabled() {
        logger.log(`[info] ▶ wait ${this.elementName} is enable`);
        await (await this.getUniqueElement()).waitForEnabled({timeout:configManager.getConfigData().waitTime});
    }
}

module.exports = BaseForm;