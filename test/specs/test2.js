import unionReportingDatabase from '../DB/unionReportingDatabase.js';

describe('Database task', () => {
    let tests;
    it('Test case 2', async () => {
        tests = await unionReportingDatabase.cloneRandomTests(await unionReportingDatabase.getRandomTests());
        await unionReportingDatabase.simulateTests(tests);
    });
});