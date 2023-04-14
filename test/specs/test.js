const { assert } = require("chai");
const database = require('../db/db');

describe('Test suite', function(){    
    it('Test case', async function() {
        
    });

    after(async function() {
        await database.writeTestResult(this.currentTest.state);
    });
});