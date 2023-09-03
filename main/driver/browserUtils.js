import Logger from '../utils/log/logger.js';
import ConfigManager from '../utils/data/configManager.js';

class BrowserUtils {
    static async configureBrowserCommands() {
        if (ConfigManager.getConfigData().isMaximize) await browser.maximizeWindow();

        await browser.overwriteCommand('url', (newUrl, urlValue) => {
            Logger.log(`[info] ▶ open url ${urlValue}`);
            newUrl(urlValue);
        })

        await browser.overwriteCommand('switchToFrame', (childFrame, childFrameObject) => {
            Logger.log('[info] ▶ go into frame');
            childFrame(childFrameObject);
        })

        await browser.overwriteCommand('switchToParentFrame', (parentFrame, parentFrameObject) => {
            Logger.log('[info] ▶ go out of frame');
            parentFrame(parentFrameObject);
        })

        await browser.overwriteCommand('switchToWindow', (switchTo, tab) => {
            Logger.log(`[info] ▶ switch browser to the new tab`);
            switchTo(tab);
        })
    }
}

export default BrowserUtils;