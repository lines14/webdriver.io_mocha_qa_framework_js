async function browserLogger() {
    await browser.overwriteCommand('url', function (newUrl, urlValue) {
        console.log(`▶ open url ${urlValue}`)
        newUrl(urlValue)
    })
    // await browser.overwriteCommand('action', function (newKeys, keyValue) {
    //     console.log(`▶ push ${keyValue} on the keyboard`)
    //     newKeys(keyValue)
    // })
}

module.exports = browserLogger;