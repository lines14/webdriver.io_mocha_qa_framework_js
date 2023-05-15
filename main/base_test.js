import logger from './framework/logger.js';
import browserUtils from './framework/browser_utils.js';
import unionReportingDatabase from '../test/db/union_reporting_database.js';

export const mochaHooks = {
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