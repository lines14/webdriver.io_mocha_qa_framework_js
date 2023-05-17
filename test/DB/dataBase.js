import DatabaseUtils from '../../main/utils/DB/databaseUtils.js';
import configManager from '../../main/utils/data/configManager.js';
import logger from '../../main/utils/log/logger.js';
import { config } from '../../wdio.chrome.conf.js';
import randomizer from '../../main/utils/random/randomizer.js';

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
            name: configManager.getDBConfigData().DBProjectName,
        }

        const authorObject = {
            name: configManager.getDBConfigData().DBAuthorName,
            login: configManager.getDBConfigData().DBAuthorLogin,
            email: configManager.getDBConfigData().DBAuthorEmail,
        }

        await this.sqlRefresh('project', projectObject);
        await this.sqlRefresh('author', authorObject);
    }

    async getProjectId() {
        return (await this.sqlGet('project', 'id', 'WHERE `name` = ?', [configManager.getDBConfigData().DBProjectName])).pop().id
    }

    async getAuthorId() {
        return (await this.sqlGet('author', 'id', 'WHERE `name` = ?', [configManager.getDBConfigData().DBAuthorName])).pop().id
    }

    async writeTestResult(state) {
        const testObject = {
            name: configManager.getDBConfigData().testName,
            method_name: configManager.getDBConfigData().method_name,
            session_id: await randomizer.getRandomNumber(configManager.getTestData().maxSessionsCount),
            start_time: (await logger.getTimings()).shift(),
            end_time: (await logger.getTimings()).pop(),
            env: configManager.getDBConfigData().env,
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
        for (let i = 0; setOfIdentifiers.size < configManager.getTestData().maxRandomTestsCount; i++) {
            const sortedId = (listOfIdentifiers[i]).id;
            (configManager.getTestData().listOfDoubleDigits).forEach((element) => {
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
            logger.log(`[info] ▶ run test ${i}`);
            const testObject = listOfTests[i];
            testObject["id"] = listToUpdate[i];
            testObject["start_time"] = moment()
            .format()
            .slice(0, 19)
            .replace('T', ' ');

            await new Promise((resolve) => setTimeout(resolve, configManager.getDBConfigData().DBWaitTime));
            testObject["end_time"] = moment()
            .format()
            .slice(0, 19)
            .replace('T', ' ');

            testObject["status_id"] = await randomizer.getRandomNumber(configManager.getTestData().maxStatusTestsCount);
            await this.sqlRefresh('test', testObject);
        }
    }

    async deleteTests() {
        await this.sqlDelete('test', 'WHERE `author_id` = ?', [await this.getAuthorId()]);
    }
}

export default new DataBase();