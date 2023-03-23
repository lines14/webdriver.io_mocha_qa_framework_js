const Post = require('../../main/framework/post_model');
const randomizer = require('../../main/framework/randomizer');
const configManager = require('../../main/config_manager');

class ModelsCreator {
    async createRandomModel(endpoint) {
        if (endpoint === 'posts') {
            const post = new Post();
            post.userId = configManager.getTestData().resourceUserId_1;
            post.title = await randomizer.getRandomString(true, true, true, false);
            post.body = await randomizer.getRandomString(true, true, true, false);
            return JSON.parse(JSON.stringify(post));
        }
    }
}

module.exports = new ModelsCreator();