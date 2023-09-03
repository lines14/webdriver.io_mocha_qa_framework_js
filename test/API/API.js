import BaseAPI from '../../main/utils/API/baseAPI.js';
import ConfigManager from '../../main/utils/data/configManager.js';
import Logger from '../../main/utils/log/logger.js';

class API extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURL || ConfigManager.getAPIConfigData().APIBaseURL,
            options.log || '[info] ▶ set base api url',
            ConfigManager.getConfigData().waitTime, 
            { 
                Authorization: `Bearer ${process.env.ACCESS_TOKEN || ''}`,
            });
    }

    async getMessages(id) {
        await new Promise((resolve) => setTimeout(resolve, ConfigManager.getAPIConfigData().APITimeout));
        return id 
        ? await this.get(`${ConfigManager.getAPIEndpoint().APIMessages}/${id}`) 
        : await this.get(ConfigManager.getAPIEndpoint().APIMessages);
    }

    async getMessagesCount() {
        Logger.log('[info] ▶ get messages count:');
        return ((await this.getMessages()).data.messages).length;
    }

    async waitMessagesCountIncrement() {
        let counter = 0;
        let messagesCount = this.messagesPrecount;
        Logger.log(`[info] ▶ wait incoming message:`);

        while (counter < ConfigManager.getAPIConfigData().APIRequestsLimit) {
            messagesCount = ((await this.getMessages()).data.messages).length;
            if (messagesCount > this.messagesPrecount) break;
            counter++;
        }

        messagesCount > this.messagesPrecount 
        ? Logger.log('[info] ▶ successfully receive message') 
        : Logger.log('[info] ▶ message is not received');
        return messagesCount;
    }

    async refreshToken() {
        new GmailAPI({ baseURL: ConfigManager.getAPIConfigData().APIAuthURL, log: '[info] ▶ set auth api url' });
        const params = { 
            client_id: process.env.CLIENT_ID || '', 
            client_secret: process.env.CLIENT_SECRET || '', 
            grant_type: process.env.GRANT_TYPE || '',
            refresh_token: process.env.REFRESH_TOKEN || '',
        }
        
        return await this.post(ConfigManager.getAPIEndpoint().APIToken, params);
    }
}

export default new API();