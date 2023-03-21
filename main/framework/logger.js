const fs = require('fs');
const path = require("path");
const logList = [];

class Logger {
    async configureLogger() {
        await browser.overwriteCommand('url', function (newUrl, urlValue) {
            console.log(`▶ open url ${urlValue}`);
            newUrl(urlValue);
        })
    }

    log(step) {
        console.log(step);
        logList.push(step);
    }

    async logToFile() {
        const jsonString = JSON.stringify(logList);
        
        fs.writeFile(path.join(__dirname, "..", "..", "test", "log.json"), jsonString, err => {
            err ? console.log('▶    error writing file', err) : console.log(`▶    successfully wrote file ${path.join(__dirname, "..", "..", "test", "log.json")}`);
        })
    }
}

module.exports = new Logger();