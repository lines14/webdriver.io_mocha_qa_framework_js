const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');
const statusCode = require('./framework/api_codes.json');
const apiEndpoint = require('../test/api/api_endpoints.json');
const apiConfigData = require('../test/api/api_config_data.json');
const databaseConfigData = require('../test/db/db_config_data.json');
const path = require("path");

class ConfigManager {
    getConfigData() {
        return JSON.parse(JSON.stringify(configureData));
    }

    getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    getTestFile() {
        return path.join(__dirname, "..", "template.jpg");
    }

    getStatusCode() {
        return JSON.parse(JSON.stringify(statusCode));
    }

    getApiEndpoint() {
        return JSON.parse(JSON.stringify(apiEndpoint));
    }

    getApiConfigData() {
        return JSON.parse(JSON.stringify(apiConfigData));
    }

    getDatabaseConfigData() {
        return JSON.parse(JSON.stringify(databaseConfigData));
    }
}

module.exports = new ConfigManager();