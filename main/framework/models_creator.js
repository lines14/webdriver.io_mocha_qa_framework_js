const TokenGetter = require('./token_getter_model');
const configManager = require('../../main/config_manager');

class ModelsCreator {
    createModel(endpoint, isRefresh=false) {
        if (endpoint === 'token') {
            if (isRefresh === true) {
                const tokenGetter = new TokenGetter();
                tokenGetter.client_id = configManager.getApiAuthData().installed.client_id;
                tokenGetter.client_secret = configManager.getApiAuthData().installed.client_secret;
                tokenGetter.grant_type = configManager.getApiAuthData().installed.grant_type_refresh;
                tokenGetter.refresh_token = configManager.getApiAuthData().installed.refresh_token;
                return JSON.parse(JSON.stringify(tokenGetter));
            } else {
                const tokenGetter = new TokenGetter();
                tokenGetter.client_id = configManager.getApiAuthData().installed.client_id;
                tokenGetter.client_secret = configManager.getApiAuthData().installed.client_secret;
                tokenGetter.code = configManager.getApiAuthData().installed.code;
                tokenGetter.grant_type = configManager.getApiAuthData().installed.grant_type_new;
                tokenGetter.redirect_uri = configManager.getApiAuthData().installed.redirect_uri;
                return JSON.parse(JSON.stringify(tokenGetter));
            }
        }
    }
}

module.exports = new ModelsCreator();