const fs = require('fs');
const path = require("path");
const gmailApi = require('../api/gmail_api');
const logger = require('../../main/framework/logger');

(function tokenRefresher() {
    gmailApi.refreshToken().then(function(tokenObject) {
        const jsonString = JSON.stringify(tokenObject.data);
        fs.writeFile(path.join(__dirname, "..", "api_token.json"), jsonString, err => {
            err ? logger.log(`[error] ▶ error while rewrite ${path.join(__dirname, "..", "api_token.json")}`, err) : logger.log(`[info] ▶ successfully rewrite ${path.join(__dirname, "..", "api_token.json")}`);
        })
    });
})();