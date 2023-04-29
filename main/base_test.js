const logger = require('./framework/logger');
const browserUtils = require('./framework/browser_utils');
const unionReportingDatabase = require('../test/db/union_reporting_database');

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