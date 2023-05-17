import { config } from './wdio.shared.conf.js';

const _config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                "goog:chromeOptions": {
                    args: ['--incognito', '--start-maximized'],
                },
            },
        ],
        services: ['chromedriver'],
    },
}

export { _config as config };