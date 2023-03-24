const fs = require('fs');
const path = require("path");
const modelsCreator = require('../../main/framework/models_creator');
const gmailApi = require('./gmail_api');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');

class GmailApiUtils {
    async getToken() {
        const tokenObject = await gmailApi.postAuth(modelsCreator.createModel(configManager.getApiEndpoint().apiToken));

        const jsonString = JSON.stringify(tokenObject.data);
        fs.writeFile(path.join(__dirname, "api_token.json"), jsonString, err => {
            err ? logger.log(`[error]   error while write ${path.join(__dirname, "api_token.json")}`, err) : logger.log(`[info]   successfully write ${path.join(__dirname, "api_token.json")}`);
        })
    }

    async refreshToken() {
        const tokenObject = await gmailApi.postAuth(modelsCreator.createModel(configManager.getApiEndpoint().apiToken, true));

        const jsonString = JSON.stringify(tokenObject.data);
        fs.writeFile(path.join(__dirname, "api_token.json"), jsonString, err => {
            err ? logger.log(`[error]   error while rewrite ${path.join(__dirname, "api_token.json")}`, err) : logger.log(`[info]   successfully rewrite ${path.join(__dirname, "api_token.json")}`);
        })
    }
}

module.exports = new GmailApiUtils();