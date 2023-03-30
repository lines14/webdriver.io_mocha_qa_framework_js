const DatabaseUtils = require('../../main/framework/database_utils');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');
const { config } = require('../../wdio.chrome.conf');
const randomizer = require('../../main/framework/randomizer');

class UnionReportingDatabase extends DatabaseUtils {
    constructor() {
        super(
            configManager.getDatabaseConfigData().dbHost || '',
            configManager.getDatabaseConfigData().dbUser || '',
            configManager.getDatabaseConfigData().dbPassword || '',
            configManager.getDatabaseConfigData().dbDatabase || ''
            );
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

    async deleteTests() {
        await this.sqlDelete('test', 'WHERE `author_id` = ?', [await this.getAuthorId()]);
    }
}

module.exports = new UnionReportingDatabase();