import { assert } from "chai";
import db from '../db/db.js';

describe('Test suite', function(){    
    it('Test case', async function() {
        
    });

    after(async function() {
        await db.writeTestResult(this.currentTest.state);
    });
});