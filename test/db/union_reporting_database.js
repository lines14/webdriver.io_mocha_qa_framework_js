const DatabaseUtils = require('../../main/framework/database_utils');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');
const { config } = require('../../wdio.chrome.conf');
const randomizer = require('../../main/framework/randomizer');
const moment = require('moment');
const listOfIdentifiers = new Array();

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

        await this.sqlRefresh(configManager.getDatabaseEndpoint().dbProjectTable, projectObject);
        await this.sqlRefresh(configManager.getDatabaseEndpoint().dbAuthorTable, authorObject);
    }

    async getProjectId() {
        return (await this.sqlGet(
            configManager.getDatabaseEndpoint().dbProjectTable, 
            `\`${configManager.getDatabaseEndpoint().dbNameColumn}\` = ?`,
            [configManager.getDatabaseConfigData().dbProjectName], 
            configManager.getDatabaseEndpoint().dbIdColumn
            )).pop().id
    }

    async getAuthorId() {
        return (await this.sqlGet(
            configManager.getDatabaseEndpoint().dbAuthorTable, 
            `\`${configManager.getDatabaseEndpoint().dbNameColumn}\` = ?`,
            [configManager.getDatabaseConfigData().dbAuthorName], 
            configManager.getDatabaseEndpoint().dbIdColumn
            )).pop().id
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

            status_id: (await this.sqlGet(
                configManager.getDatabaseEndpoint().dbStatusTable, 
                `\`${configManager.getDatabaseEndpoint().dbNameColumn}\` = ?`,
                [state.toUpperCase()], 
                configManager.getDatabaseEndpoint().dbIdColumn
                )).pop().id,
        }

        await this.sqlAdd(configManager.getDatabaseEndpoint().dbTestTable, testObject);
    }

    async getRandomTests() {
        const setOfDigits = new Set();
        for (let i = 0; setOfDigits.size < configManager.getTestData().maxRandomTestsCount; i++) {
            setOfDigits.add(await randomizer.getRandomNumber());
        }

        const listOfValues = (Array.from(setOfDigits)).map(element => [Number(element.toString() + element.toString())]);
        const conditions = `\`${configManager.getDatabaseEndpoint().dbIdColumn}\` = ?`;

        const listOfTests = new Array();
        for (let i = 0; i < configManager.getTestData().maxRandomTestsCount; i++) {
            listOfTests.push(await this.sqlGet(configManager.getDatabaseEndpoint().dbTestTable, conditions, listOfValues[i]));
        }

        return listOfTests;
    }

    async cloneRandomTests(listOfTests) {
        const updatedTests = new Array();
        const projectId = await this.getProjectId();
        const authorId = await this.getAuthorId();

        for (let i = 0; i < listOfTests.length; i++) {
            const testObject = listOfTests[i].pop();
            testObject["project_id"] = projectId;
            testObject["author_id"] = authorId;
            delete testObject["id"];
            updatedTests.push(testObject);

            const info = await this.sqlAdd(configManager.getDatabaseEndpoint().dbTestTable, testObject);
            listOfIdentifiers.push(info.insertId);
        }

        return updatedTests;
    }

    async simulateTests(listOfTests) {
        for (let i = 0; i < listOfTests.length; i++) {
            logger.log(`[info] ▶ run test ${i}`);
            const testObject = listOfTests[i];
            testObject["id"] = listOfIdentifiers[i];
            testObject["start_time"] = moment().format().slice(0, 19).replace('T', ' ');
            await new Promise(resolve => setTimeout(resolve, configManager.getConfigData().waitTime));
            testObject["end_time"] = moment().format().slice(0, 19).replace('T', ' ');
            testObject["status_id"] = await randomizer.getRandomNumber(configManager.getTestData().maxStatusTestsCount);

            await this.sqlRefresh(configManager.getDatabaseEndpoint().dbTestTable, testObject);
        }
    }

    async deleteTests() {
        const conditions = `\`${configManager.getDatabaseEndpoint().dbAuthorIdColumn}\` = ?`
        const values = [await this.getAuthorId()];

        await this.sqlDelete(configManager.getDatabaseEndpoint().dbTestTable, conditions, values);
    }
}

module.exports = new UnionReportingDatabase();