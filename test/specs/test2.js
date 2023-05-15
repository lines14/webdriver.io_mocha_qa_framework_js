import unionReportingDatabase from '../db/union_reporting_database.js';

describe('Database task', function(){
    let tests;
    it('Test case 2', async function() {
        tests = await unionReportingDatabase.cloneRandomTests(await unionReportingDatabase.getRandomTests());
        await unionReportingDatabase.simulateTests(tests);
    });
});