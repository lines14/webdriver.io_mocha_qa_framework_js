import logger from '../../main/framework/logger.js';
import configManager from '../../main/configManager.js';

class BrowserUtils {
    async configureBrowserCommands() {
        if (configManager.getConfigData().isMaximize) await browser.maximizeWindow();

        await browser.overwriteCommand('url', (newUrl, urlValue) => {
            logger.log(`[info] ▶ open url ${urlValue}`);
            newUrl(urlValue);
        })

        await browser.overwriteCommand('switchToFrame', (childFrame, childFrameObject) => {
            logger.log('[info] ▶ go into frame');
            childFrame(childFrameObject);
        })

        await browser.overwriteCommand('switchToParentFrame', (parentFrame, parentFrameObject) => {
            logger.log('[info] ▶ go out of frame');
            parentFrame(parentFrameObject);
        })

        await browser.overwriteCommand('switchToWindow', (switchTo, tab) => {
            logger.log(`[info] ▶ switch browser to the new tab`);
            switchTo(tab);
        })
    }
}

export default new BrowserUtils();