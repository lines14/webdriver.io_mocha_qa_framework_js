class BrowserLogger {
    async configureLogger() {
        await browser.overwriteCommand('url', function (newUrl, urlValue) {
            console.log(`▶ open url ${urlValue}`)
            newUrl(urlValue)
        })
    }
}

module.exports = new BrowserLogger();