const ApiTester = require('../../main/framework/api_tester');
const configManager = require('../../main/config_manager');

class JsonplaceholderApi extends ApiTester {
    constructor() {
        super(configManager.getConfigData().baseUrl, configManager.getConfigData().timeout);
    }

    async getPosts(id) {
        return id ? await this.get(`${configManager.getApiEndpoint().apiPosts}/${id}`) : await this.get(configManager.getApiEndpoint().apiPosts);
    }

    async getUsers(id) {
        return id ? await this.get(`${configManager.getApiEndpoint().apiUsers}/${id}`) : await this.get(configManager.getApiEndpoint().apiUsers);
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