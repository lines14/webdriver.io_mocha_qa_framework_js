import ConfigManager from './utils/data/configManager.js';
import Logger from './utils/log/logger.js';

class BaseForm {
    constructor(pageLocator, pageName) {
        this.pageLocator = pageLocator;
        this.pageName = pageName;
    }

    async getUniqueElement() {
        return await $(this.pageLocator);
    }

    async pageIsDisplayed() {
        Logger.log(`[info] ▶ ${this.pageName} is open`);
        return await (await this.getUniqueElement()).isDisplayed();
    }

    async pageIsEnabled() {
        Logger.log(`[info] ▶ ${this.pageName} is enable`);
        return await (await this.getUniqueElement()).isEnabled();
    }

    async waitPageIsDisplayed() {
        Logger.log(`[info] ▶ wait ${this.elementName} is open`);
        await (await this.getUniqueElement()).waitForDisplayed({ timeout: ConfigManager.getConfigData().waitTime });
    }
    
    async waitPageIsEnabled() {
        Logger.log(`[info] ▶ wait ${this.elementName} is enable`);
        await (await this.getUniqueElement()).waitForEnabled({ timeout: ConfigManager.getConfigData().waitTime });
    }
}

export default BaseForm;