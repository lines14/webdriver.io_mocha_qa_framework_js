const BaseApi = require('../../main/framework/base_api');
const configManager = require('../../main/config_manager');

class GmailApi extends BaseApi {
    constructor(options = {}) {
        super(
            options.baseURL || configManager.getConfigData().authUrl, 
            options.log || `[info] ▶ set auth api url`,
            configManager.getConfigData().timeout, 
            { Authorization: `Bearer ${configManager.getApiToken().access_token}` }
            );
    }

    async getMessages(id) {
        return id ? await this.get(`${configManager.getApiEndpoint().apiMessages}/${id}`) : await this.get(configManager.getApiEndpoint().apiMessages);
    }

    async postAuth(model) {
        const params = { 
            client_id: model.client_id, 
            client_secret: model.client_secret, 
            code: model.code, 
            grant_type: model.grant_type,
            redirect_uri: model.redirect_uri,
            refresh_token: model.refresh_token
        }
        const tokenObject = await this.post(configManager.getApiEndpoint().apiToken, params);
        new GmailApi({baseURL: configManager.getConfigData().baseUrl, log: `[info] ▶ set base api url`});
        return tokenObject;
    }
}

module.exports = new GmailApi();