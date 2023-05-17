import configData from '../main/configData.json' assert { type: "json" };
import testData from '../test/testData.json' assert { type: "json" };
import APICodes from './framework/APICodes.json' assert { type: "json" };
import APIEndpoints from '../test/API/APIEndpoints.json' assert { type: "json" };
import APIConfigData from '../test/API/APIConfigData.json' assert { type: "json" };
import DBConfigData from '../test/DB/DBConfigData.json' assert { type: "json" };
import path from "path";

class ConfigManager {
    getConfigData() {
        return JSON.parse(JSON.stringify(configData));
    }

    getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    getTestFile() {
        return path.join(path.resolve(), "test", "template.jpg");
    }

    getStatusCode() {
        return JSON.parse(JSON.stringify(APICodes));
    }

    getAPIEndpoint() {
        return JSON.parse(JSON.stringify(APIEndpoints));
    }

    getAPIConfigData() {
        return JSON.parse(JSON.stringify(APIConfigData));
    }

    getDBConfigData() {
        return JSON.parse(JSON.stringify(DBConfigData));
    }
}

export default new ConfigManager();