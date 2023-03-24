const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');
const statusCode = require('./framework/api_codes.json');
const apiEndpoint = require('../test/api/api_endpoints.json');
const apiAuthData = require('../test/api/api_auth_data.json');
const apiToken = require('../test/api/api_token.json');
const path = require("path");

class ConfigManager {
    getConfigData() {
        return JSON.parse(JSON.stringify(configureData));
    }

    getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    getTestFile() {
        return path.join(__dirname, "..", "test_image.jpg");
    }

    getStatusCode() {
        return JSON.parse(JSON.stringify(statusCode));
    }

    getApiEndpoint() {
        return JSON.parse(JSON.stringify(apiEndpoint));
    }

    getApiAuthData() {
        return JSON.parse(JSON.stringify(apiAuthData));
    }

    getApiToken() {
        return JSON.parse(JSON.stringify(apiToken));
    }
}

module.exports = new ConfigManager();