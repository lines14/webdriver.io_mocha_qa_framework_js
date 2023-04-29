const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                "goog:chromeOptions": {
                    args: ['--incognito']
                }
            }
        ],
        services: [
            'chromedriver'
        ]
    }
}