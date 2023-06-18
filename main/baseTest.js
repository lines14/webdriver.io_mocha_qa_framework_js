import logger from './framework/logger.js';
import browserUtils from './framework/browserUtils.js';
import unionReportingDatabase from '../test/DB/unionReportingDatabase.js';

export const mochaHooks = {
    async beforeAll() {
        await browserUtils.configureBrowserCommands();
    },
    async afterAll() {
        await unionReportingDatabase.deleteTests();
        await unionReportingDatabase.closeConnection();
        await logger.logToFile();
    },
}