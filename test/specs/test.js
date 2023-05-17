import { assert } from "chai";
import dataBase from '../DB/dataBase.js';

describe('Test suite', () => {    
    it('Test case', async () => {
        
    });

    after(async function () {
        await dataBase.writeTestResult(this.currentTest.state);
    });
});