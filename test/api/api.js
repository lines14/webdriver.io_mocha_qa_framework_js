const BaseApi = require('../../main/utils/api/base_api');
const configManager = require('../../main/utils/data/config_manager');
const logger = require('../../main/utils/log/logger');

class GmailApi extends BaseApi {
    constructor(options = {}) {
        super(
            options.baseURL || configManager.getApiConfigData().apiBaseUrl,
            options.log || '[info] ▶ set base api url',
            configManager.getConfigData().waitTime, 
            { Authorization: `Bearer ${process.env.ACCESS_TOKEN || ''}` }
            );
    }

    async getMessages(id) {
        await new Promise(resolve => setTimeout(resolve, configManager.getApiConfigData().apiTimeout));
        return id ? await this.get(`${configManager.getApiEndpoint().apiMessages}/${id}`) : await this.get(configManager.getApiEndpoint().apiMessages);
    }

    async getMessagesCount() {
        logger.log('[info] ▶ get messages count:');
        this.messagesPrecount = ((await this.getMessages()).data.messages).length;
        return this.messagesPrecount;
    }

    async waitMessagesCountIncrement() {
        let counter = 0;
        let messagesCount = this.messagesPrecount;
        logger.log(`[info] ▶ wait incoming message:`);

        while (counter < configManager.getApiConfigData().apiRequestsLimit) {
            messagesCount = ((await this.getMessages()).data.messages).length;
            if (messagesCount > this.messagesPrecount) {
                break;
            }
            counter++;
        }
        messagesCount > this.messagesPrecount ? logger.log('[info] ▶ successfully receive message') : logger.log('[info] ▶ message is not received');
        return messagesCount;
    }

    async refreshToken() {
        new GmailApi({ baseURL: configManager.getApiConfigData().apiAuthUrl, log: '[info] ▶ set auth api url' });
        const params = { 
            client_id: process.env.CLIENT_ID || '', 
            client_secret: process.env.CLIENT_SECRET || '', 
            grant_type: process.env.GRANT_TYPE || '',
            refresh_token: process.env.REFRESH_TOKEN || ''
        }
        return await this.post(configManager.getApiEndpoint().apiToken, params);
    }
}

module.exports = new GmailApi();