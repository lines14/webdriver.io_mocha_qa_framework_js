const logger = require('../../main/framework/logger');
const configManager = require('../../main/config_manager');

class BrowserUtils {
    async configureBrowserCommands() {
        if (configManager.getConfigData().isMaximize) {
            await browser.maximizeWindow();
        }

        await browser.overwriteCommand('url', function (newUrl, urlValue) {
            logger.log(`[info] ▶ open url ${urlValue}`);
            newUrl(urlValue);
        })

        await browser.overwriteCommand('switchToFrame', function (childFrame, childFrameObject) {
            logger.log('[info] ▶ go into frame');
            childFrame(childFrameObject);
        })

        await browser.overwriteCommand('switchToParentFrame', function (parentFrame, parentFrameObject) {
            logger.log('[info] ▶ go out of frame');
            parentFrame(parentFrameObject);
        })

        await browser.overwriteCommand('switchToWindow', function (switchTo, tab) {
            logger.log(`[info] ▶ switch browser to the new tab`);
            switchTo(tab);
        })
    }
}

module.exports = new BrowserUtils();