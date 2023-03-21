const { assert, expect } = require("chai");
const configManager = require('../../main/config_manager');
const jsonplaceholderApi = require('../jsonplaceholder_api');

describe('REST API (GET/POST) task', function(){    
    it('Test JSONPlaceholder API', async function() {
        let response = await jsonplaceholderApi.getPosts();
        assert.equal(response.status, configManager.getTestData().code_200, 'status code is not 200');
    });
});