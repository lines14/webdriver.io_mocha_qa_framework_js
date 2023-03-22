const path = require("path");
const logList = new Array();
const fs = require('fs');
const moment = require('moment');

class Logger {
    log(step) {
        console.log(step);
        logList.push(`${moment().format("hh:mm:ss")} ${step}\n`);
    }

    async logToFile() {
        const stream = fs.createWriteStream(path.join(__dirname, "..", "..", "test", "log.txt"));

        stream.once('open', function() {
            logList.map(element => stream.write(element));
            stream.end();
        });
    }
}

module.exports = new Logger();