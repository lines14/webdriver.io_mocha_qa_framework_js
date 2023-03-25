const fs = require('fs');
const path = require("path");
const modelsCreator = require('../../main/framework/models_creator');
const gmailApi = require('./gmail_api');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');

class GmailApiUtils {
    async getToken() {
        logger.log('[info] ▶ get api token:');
        const tokenObject = await gmailApi.postAuth(modelsCreator.createModel(configManager.getApiEndpoint().apiToken));

        const jsonString = JSON.stringify(tokenObject.data);
        fs.writeFile(path.join(__dirname, "api_token.json"), jsonString, err => {
            err ? logger.log(`[error] ▶ error while write ${path.join(__dirname, "api_token.json")}`, err) : logger.log(`[info] ▶ successfully write ${path.join(__dirname, "api_token.json")}`);
        })
    }

    async refreshToken() {
        logger.log('[info] ▶ refresh api token:');
        const tokenObject = await gmailApi.postAuth(modelsCreator.createModel(configManager.getApiEndpoint().apiToken, true));

        const jsonString = JSON.stringify(tokenObject.data);
        fs.writeFile(path.join(__dirname, "api_token.json"), jsonString, err => {
            err ? logger.log(`[error] ▶ error while rewrite ${path.join(__dirname, "api_token.json")}`, err) : logger.log(`[info] ▶ successfully rewrite ${path.join(__dirname, "api_token.json")}`);
        })
    }

    async saveHTML(apiResponse) {
        logger.log('[info] ▶ save html markup to file');
        const decoded = (Buffer.from(apiResponse.body.data, 'base64')).toString();
        const stream = fs.createWriteStream(path.join(__dirname, "..", "index.html"));

        stream.once('open', function() {
            stream.write(decoded);
            stream.end();
        });
    }

    async getMessagesCount() {
        logger.log('[info] ▶ get messages count:');
        this.messagesPrecount = ((await gmailApi.getMessages()).data.messages).length;
        return this.messagesPrecount;
    }

    async waitMessagesCountIncrement() {
        let counter = 0;
        let messagesCount = this.messagesPrecount;
        logger.log(`[info] ▶ wait incoming message:`);
        
        while (counter < configManager.getTestData().apiRequestsLimit) {
            messagesCount = ((await gmailApi.getMessages()).data.messages).length;
            if (messagesCount > this.messagesPrecount) {
                break;
            }
            counter++;
        }
        messagesCount > this.messagesPrecount ? logger.log('[info] ▶ successfully receive message') : logger.log('[info] ▶ message is not received');
        return messagesCount;
    }
}

module.exports = new GmailApiUtils();