const unionReportingDatabase = require('../db/union_reporting_database');
const logger = require('../../main/framework/logger');

describe('Database task', function(){
    let tests;
    before(async function() {
        await unionReportingDatabase.writeProjectAndAuthor();
        tests = await unionReportingDatabase.cloneRandomTests(await unionReportingDatabase.getRandomTests());
    });
    
    it('Test case 2', async function() {
        await unionReportingDatabase.simulateTests(tests);
    });

    after(async function() {
        await unionReportingDatabase.deleteTests();
        await logger.logToFile();
    });
});