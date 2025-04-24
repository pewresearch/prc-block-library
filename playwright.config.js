import { defineConfig } from '@playwright/test';
import baseConfig from '@wordpress/scripts/config/playwright.config';

const testDir = './tests';

export default defineConfig({
	...baseConfig,
	testDir,
	outputDir: './tests/artifacts',
	use: {
		...baseConfig.use,
		video: 'on',
		trace: 'on',
	},
	reporter: [
		...baseConfig.reporter,
		['html', { outputFolder: './tests/artifacts/reports' }],
	],
});
