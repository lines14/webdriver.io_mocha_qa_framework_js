import DatabaseUtils from '../../main/utils/DB/databaseUtils.js';
import ConfigManager from '../../main/utils/data/configManager.js';
import Logger from '../../main/utils/log/logger.js';
import { config } from '../../wdio.chrome.conf.js';
import Randomizer from '../../main/utils/random/randomizer.js';

class DataBase extends DatabaseUtils {
    constructor() {
        super(
            process.env.DB_HOST || '',
            process.env.DB_USER || '',
            process.env.DB_PASSWORD || '',
            process.env.DB_DATABASE || '',
            );
    }

    async writeProjectAndAuthor() {
        const projectObject = {
            name: ConfigManager.getDBConfigData().DBProjectName,
        }

        const authorObject = {
            name: ConfigManager.getDBConfigData().DBAuthorName,
            login: ConfigManager.getDBConfigData().DBAuthorLogin,
            email: ConfigManager.getDBConfigData().DBAuthorEmail,
        }

        await this.sqlRefresh('project', projectObject);
        await this.sqlRefresh('author', authorObject);
    }

    async getProjectId() {
        return (await this.sqlGet('project', 'id', 'WHERE `name` = ?', [ConfigManager.getDBConfigData().DBProjectName])).pop().id
    }

    async getAuthorId() {
        return (await this.sqlGet('author', 'id', 'WHERE `name` = ?', [ConfigManager.getDBConfigData().DBAuthorName])).pop().id
    }

    async writeTestResult(state) {
        const testObject = {
            name: ConfigManager.getDBConfigData().testName,
            method_name: ConfigManager.getDBConfigData().method_name,
            session_id: await Randomizer.getRandomNumber(ConfigManager.getTestData().maxSessionsCount),
            start_time: (await Logger.getTimings()).shift(),
            end_time: (await Logger.getTimings()).pop(),
            env: ConfigManager.getDBConfigData().env,
            browser: config.capabilities.pop().browserName,
            project_id: await this.getProjectId(),
            author_id: await this.getAuthorId(),
            status_id: (await this.sqlGet('status', 'id', 'WHERE `name` = ?', [state.toUpperCase()])).pop().id,
        }

        await this.sqlAdd('test', testObject);
    }

    async getRandomTests() {
        const listOfIdentifiers = await this.sqlGet('test', 'id', 'ORDER BY id ASC');
        const setOfIdentifiers = new Set();
        for (let i = 0; setOfIdentifiers.size < ConfigManager.getTestData().maxRandomTestsCount; i++) {
            const sortedId = (listOfIdentifiers[i]).id;
            (ConfigManager.getTestData().listOfDoubleDigits).forEach((element) => {
                if ((sortedId.toString()).includes(element.toString())) setOfIdentifiers.add(sortedId);
            });
        }

        return Promise.all([...setOfIdentifiers].map(async (element) => await this.sqlGet('test', '*', 'WHERE `id` = ?', [element])));
    }

    async cloneRandomTests(listOfTests) {
        const projectId = await this.getProjectId();
        const authorId = await this.getAuthorId();
        return Promise.all(listOfTests.map(async (element) => {
            const testObject = element.pop();
            testObject["project_id"] = projectId;
            testObject["author_id"] = authorId;
            delete testObject["id"];
            const info = await this.sqlAdd('test', testObject);
            listToUpdate.push(info.insertId);
            return testObject;
        }));
    }

    async simulateTests(listOfTests) {
        for (let i = 0; i < listOfTests.length; i++) {
            Logger.log(`[info] ▶ run test ${i}`);
            const testObject = listOfTests[i];
            testObject["id"] = listToUpdate[i];
            testObject["start_time"] = moment()
            .format()
            .slice(0, 19)
            .replace('T', ' ');

            await new Promise((resolve) => setTimeout(resolve, ConfigManager.getDBConfigData().DBWaitTime));
            testObject["end_time"] = moment()
            .format()
            .slice(0, 19)
            .replace('T', ' ');

            testObject["status_id"] = await Randomizer.getRandomNumber(ConfigManager.getTestData().maxStatusTestsCount);
            await this.sqlRefresh('test', testObject);
        }
    }

    async deleteTests() {
        await this.sqlDelete('test', 'WHERE `author_id` = ?', [await this.getAuthorId()]);
    }
}

export default new DataBase();