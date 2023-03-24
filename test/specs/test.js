const { assert } = require('chai');
const configManager = require('../../main/config_manager');
const logger = require('../../main/framework/logger');
const gmailApi = require('../api/gmail_api');
const gmailApiUtils = require('../api/gmail_api_utils');

describe('Gmail API Euronews (API + WEB) task', function(){    
    before(async function() {
        await gmailApiUtils.refreshToken();
    });

    it('Test Gmail API', async function() {
        
    });

    after(async function() {
        await logger.logToFile();
    });
});