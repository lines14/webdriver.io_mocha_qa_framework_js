const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');
const statusCode = require('./framework/api_codes.json');
const apiEndpoint = require('../test/api/api_endpoints.json');
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
}

module.exports = new ConfigManager();