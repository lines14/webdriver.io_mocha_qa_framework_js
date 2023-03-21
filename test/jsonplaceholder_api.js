const ApiTester = require('../main/framework/api_tester');
const configManager = require('../main/config_manager');

class JsonplaceholderApi extends ApiTester {
    constructor() {
        super(configManager.getConfigData().baseUrl, configManager.getConfigData().timeout);
    }

    async getPosts(id) {
        return await this.get(configManager.getTestData().apiPosts, id);
    }

    async getUsers(id) {
        return await this.get(configManager.getTestData().apiUsers, id);
    }

    async postPosts(model) {
        return await this.post(configManager.getTestData().apiPosts, model);
    }

    isJsonString(data) {
        try {
            JSON.parse(data);
        } catch (error) {
            return false;
        }
        return true;
    }
}

module.exports = new JsonplaceholderApi();