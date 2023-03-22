const logger = require('./logger');

class JsonValidator {
    async isJson(response) {
        try {
            logger.log(`▶    check response is json`);
            return typeof response === "object" ? true : false;
        }
        catch (error) {
            return false;
        }
    }
}

module.exports = new JsonValidator();