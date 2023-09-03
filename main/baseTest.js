import Logger from './framework/logger.js';
import BrowserUtils from './framework/browserUtils.js';
import unionReportingDatabase from '../test/DB/unionReportingDatabase.js';

export const mochaHooks = {
    async beforeAll() {
        await BrowserUtils.configureBrowserCommands();
    },
    async afterAll() {
        await unionReportingDatabase.deleteTests();
        await unionReportingDatabase.closeConnection();
        await Logger.logToFile();
    },
}