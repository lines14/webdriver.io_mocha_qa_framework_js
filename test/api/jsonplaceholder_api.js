const ApiTester = require('../../main/framework/api_tester');
const configManager = require('../../main/config_manager');

class JsonplaceholderApi extends ApiTester {
    constructor() {
        super(configManager.getConfigData().baseUrl, configManager.getConfigData().timeout);
    }

    async getPosts(id) {
        return await this.get(configManager.getApiEndpoint().apiPosts, id);
    }

    async getUsers(id) {
        return await this.get(configManager.getApiEndpoint().apiUsers, id);
    }

    async postPosts(model) {
        const params = { 
            id: model.id, 
            userId: model.userId, 
            title: model.title, 
            body: model.body
        }
        return await this.post(configManager.getApiEndpoint().apiPosts, params);
    }
}

module.exports = new JsonplaceholderApi();