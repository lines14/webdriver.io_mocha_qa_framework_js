import Logger from './utils/log/logger.js';
import BrowserUtils from './driver/browserUtils.js';
import dataBase from '../test/DB/dataBase.js';

export const mochaHooks = {
    async beforeAll() {
        await BrowserUtils.configureBrowserCommands();
        await dataBase.writeProjectAndAuthor();
    },
    async afterAll() {
        await dataBase.deleteTests();
        await dataBase.closeConnection();
        await Logger.logToFile();
    },
}