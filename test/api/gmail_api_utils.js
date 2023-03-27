const fs = require('fs');
const path = require("path");
const logger = require('../../main/framework/logger');

class GmailApiUtils {
    async saveHTML(apiResponse) {
        logger.log('[info] ▶ save html markup to file');
        const decoded = (Buffer.from(apiResponse.body.data, 'base64')).toString();
        const stream = fs.createWriteStream(path.join(__dirname, "..", "index.html"));

        stream.once('open', function() {
            stream.write(decoded);
            stream.end();
        });
    }
}

module.exports = new GmailApiUtils();