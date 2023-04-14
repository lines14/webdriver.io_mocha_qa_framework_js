const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'firefox',
                acceptInsecureCerts: true,
                "moz:firefoxOptions": {
                    args: ['--private']
                }
            }
        ],
        services: [
            'geckodriver'
        ]
    }
}