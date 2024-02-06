const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function updateWPScripts() {
	try {
		const { data } = await axios.get(
			'https://registry.npmjs.org/@wordpress/scripts'
		);
		const latestVersion = data['dist-tags'].latest;

		const packageJsonPaths = glob.sync('./blocks/*/package.json');

		for (const packageJsonPath of packageJsonPaths) {
			const packageJson = await fs.readJson(packageJsonPath);

			packageJson.devDependencies['@wordpress/scripts'] = `^${latestVersion}`;

			await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
			console.log(`Updated @wordpress/scripts in ${path.relative('./', packageJsonPath)}`);
		}

		console.log('All package.json files updated successfully');
	} catch (error) {
		console.error('Failed to update @wordpress/scripts:', error);
	}
}

updateWPScripts();
