import logger from './utils/log/logger.js';
import browserUtils from './driver/browser_utils.js';
import db from '../test/db/db.js';

export const mochaHooks = {
    async beforeAll() {
        await browserUtils.configureBrowserCommands();
        await db.writeProjectAndAuthor();
    },
    async afterAll() {
        await db.deleteTests();
        await db.closeConnection();
        await logger.logToFile();
    }
}