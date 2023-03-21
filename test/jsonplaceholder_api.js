const ApiTester = require('../main/framework/api_tester');
const modelPost = require('../main/framework/model_post');
const randomizer = require('../main/framework/randomizer');
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
        const params = { 
            id: model.id, 
            userId: model.userId, 
            title: model.title, 
            body: model.body
        }
        return await this.post(configManager.getTestData().apiPosts, params);
    }

    async createRandomModel(endpoint) {
        if (endpoint === 'posts') {
            const post = new modelPost();
            post.userId = configManager.getTestData().apiUserId_1;
            post.title = await randomizer.getRandomString(true, true, true, false);
            post.body = await randomizer.getRandomString(true, true, true, false);
            return JSON.parse(JSON.stringify(post));
        }
    }
}

module.exports = new JsonplaceholderApi();