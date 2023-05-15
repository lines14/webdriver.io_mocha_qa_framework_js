import { config } from './wdio.shared.conf.js';

const _config = {
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

export { _config as config };