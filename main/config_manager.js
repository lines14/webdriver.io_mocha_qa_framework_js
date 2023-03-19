const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');
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
}

module.exports = new ConfigManager();