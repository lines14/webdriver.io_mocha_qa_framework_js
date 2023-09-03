import Logger from '../log/logger.js';

class JSONValidator {
    static async isJson(response) {
        Logger.log(`[info] ▶ check response is json`);
        return typeof response === "object";
    }
}

export default JSONValidator;