import configureData from '../main/config_data.json' assert { type: "json" };
import testData from '../test/test_data.json' assert { type: "json" };
import statusCode from './framework/api_codes.json' assert { type: "json" };
import apiEndpoint from '../test/api/api_endpoints.json' assert { type: "json" };
import apiConfigData from '../test/api/api_config_data.json' assert { type: "json" };
import databaseConfigData from '../test/db/db_config_data.json' assert { type: "json" };
import path from "path";

class ConfigManager {
    getConfigData() {
        return JSON.parse(JSON.stringify(configureData));
    }

    getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    getTestFile() {
        return path.join(path.resolve(), "test", "template.jpg");
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

export default new ConfigManager();