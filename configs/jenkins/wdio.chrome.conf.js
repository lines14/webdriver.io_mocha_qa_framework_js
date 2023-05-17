import { config } from './wdio.shared.conf.js';
import allure from 'allure-commandline';

const _config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                "goog:chromeOptions": {
                    args: ['--no-sandbox', '--disable-dev-shm-usage', '--incognito', 'headless', '--start-maximized'],
                },
            },
        ],
        services: ['chromedriver'],
    },
    onComplete: () => {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', (exitCode) => {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve();
            });
        });
    },
}

export { _config as config };