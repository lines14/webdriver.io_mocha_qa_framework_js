const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                "goog:chromeOptions": {
                    args: ['--incognito', 'headless', '--start-maximized']
                }
            }
        ],
        services: [
            'chromedriver'
        ]
    }
}