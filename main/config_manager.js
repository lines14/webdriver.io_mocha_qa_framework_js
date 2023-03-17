const configureData = require('../main/config_data.json');
const testData = require('../test/test_data.json');
const path = require("path");

class ConfigManager {
    getConfigData() {
        const dataPath = JSON.parse(JSON.stringify(configureData));
        return dataPath;
    }
    getTestData() {
        const dataPath = JSON.parse(JSON.stringify(testData));
        return dataPath;
    }
    getTestFile() {
        const filePath = path.join(__dirname, "..", "test_image.jpg");
        return filePath;
    }
}

module.exports = new ConfigManager();