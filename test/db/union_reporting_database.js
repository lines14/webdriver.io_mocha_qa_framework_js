import DatabaseUtils from '../../main/framework/database_utils.js';
import configManager from '../../main/config_manager.js';
import logger from '../../main/framework/logger.js';
import { config } from '../../wdio.chrome.conf.js';
import randomizer from '../../main/framework/randomizer.js';
import moment from 'moment';
const listToUpdate = [];

class UnionReportingDatabase extends DatabaseUtils {
    constructor() {
        super(
            process.env.DB_HOST || '',
            process.env.DB_USER || '',
            process.env.DB_PASSWORD || '',
            process.env.DB_DATABASE || ''
            );
    }

    async writeProjectAndAuthor() {
        const projectObject = {
            name: configManager.getDatabaseConfigData().dbProjectName
        }

        const authorObject = {
            name: configManager.getDatabaseConfigData().dbAuthorName,
            login: configManager.getDatabaseConfigData().dbAuthorLogin,
            email: configManager.getDatabaseConfigData().dbAuthorEmail
        }

        await this.sqlRefresh('project', projectObject);
        await this.sqlRefresh('author', authorObject);
    }

    async getProjectId() {
        return (await this.sqlGet('project', 'id', 'WHERE `name` = ?', [configManager.getDatabaseConfigData().dbProjectName])).pop().id
    }

    async getAuthorId() {
        return (await this.sqlGet('author', 'id', 'WHERE `name` = ?', [configManager.getDatabaseConfigData().dbAuthorName])).pop().id
    }

    async writeTestResult(state) {
        const testObject = {
            name: configManager.getDatabaseConfigData().testName,
            method_name: configManager.getDatabaseConfigData().method_name,
            session_id: await randomizer.getRandomNumber(configManager.getTestData().maxSessionsCount),
            start_time: (await logger.getTimings()).shift(),
            end_time: (await logger.getTimings()).pop(),
            env: configManager.getDatabaseConfigData().env,
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

            (configManager.getTestData().listOfDoubleDigits).map(function(element) {
                if ((sortedId.toString()).includes(element.toString())) {
                    setOfIdentifiers.add(sortedId);
                }
            });
        }

        return Promise.all((Array.from(setOfIdentifiers)).map(async (element) => await this.sqlGet('test', '*', 'WHERE `id` = ?', [element])));
    }

    async cloneRandomTests(listOfTests) {
        const updatedTests = [];
        const projectId = await this.getProjectId();
        const authorId = await this.getAuthorId();

        for (let i = 0; i < listOfTests.length; i++) {
            const testObject = listOfTests[i].pop();
            testObject["project_id"] = projectId;
            testObject["author_id"] = authorId;
            delete testObject["id"];
            updatedTests.push(testObject);

            const info = await this.sqlAdd('test', testObject);
            listToUpdate.push(info.insertId);
        }

        return updatedTests;
    }

    async simulateTests(listOfTests) {
        for (let i = 0; i < listOfTests.length; i++) {
            logger.log(`[info] ▶ run test ${i}`);
            const testObject = listOfTests[i];
            testObject["id"] = listToUpdate[i];
            testObject["start_time"] = moment().format().slice(0, 19).replace('T', ' ');
            await new Promise(resolve => setTimeout(resolve, configManager.getDatabaseConfigData().dbWaitTime));
            testObject["end_time"] = moment().format().slice(0, 19).replace('T', ' ');
            testObject["status_id"] = await randomizer.getRandomNumber(configManager.getTestData().maxStatusTestsCount);

            await this.sqlRefresh('test', testObject);
        }
    }

    async deleteTests() {
        await this.sqlDelete('test', 'WHERE `author_id` = ?', [await this.getAuthorId()]);
    }
}

export default new UnionReportingDatabase();