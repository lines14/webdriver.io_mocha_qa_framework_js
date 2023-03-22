class BrowserUtils {
    async configureLogger() {
        await browser.overwriteCommand('url', function (newUrl, urlValue) {
            console.log(`▶ open url ${urlValue}`);
            newUrl(urlValue);
        })
    }
}

module.exports = new BrowserUtils();