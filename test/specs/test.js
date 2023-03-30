const { assert } = require("chai");
const logger = require('../../main/framework/logger');
const browserUtils = require('../../main/framework/browser_utils');
const database = require('../db/database');

describe('Database task', function(){
    before(async function() {
        await browserUtils.configureBrowserLogger();
    });
    
    it('Test case 1', async function() {
        
    });

    after(async function() {
        await database.writeTestResult(this.currentTest.state);
        await database.closeConnection();
        await logger.logToFile();
    });
});