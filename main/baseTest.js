import logger from './utils/log/logger.js';
import browserUtils from './driver/browserUtils.js';
import dataBase from '../test/DB/dataBase.js';

export const mochaHooks = {
    async beforeAll() {
        await browserUtils.configureBrowserCommands();
        await dataBase.writeProjectAndAuthor();
    },
    async afterAll() {
        await dataBase.deleteTests();
        await dataBase.closeConnection();
        await logger.logToFile();
    },
}