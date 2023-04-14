const logger = require('./utils/log/logger');
const browserUtils = require('./driver/browser_utils');
const unionReportingDatabase = require('../test/db/db');

exports.mochaHooks = {
    async beforeAll() {
        await browserUtils.configureBrowserCommands();
        await unionReportingDatabase.writeProjectAndAuthor();
    },
    async afterAll() {
        await unionReportingDatabase.deleteTests();
        await unionReportingDatabase.closeConnection();
        await logger.logToFile();
    }
}