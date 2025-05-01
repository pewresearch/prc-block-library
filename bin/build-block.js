const { exec } = require('child_process');
const prompts = require('prompts');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let blockName = args[0];

(async () => {
	if (!blockName) {
		const response = await prompts({
			type: 'text',
			name: 'blockName',
			message: 'Enter the block name',
		});
		blockName = response.blockName;
	}

	const src = `./src/${blockName}/`;
	const output = `./build/${blockName}/`;

	// Check if src directory exists
	if (!fs.existsSync(src)) {
		process.stdout.write(
			`Block does not exist at ${src}. Build process stopped.`
		);
		process.exit(1);
	}

	// Check block.json for interactivity support
	let isInteractive = false;
	const blockJsonPath = path.join(src, 'block.json');
	if (fs.existsSync(blockJsonPath)) {
		try {
			const blockJson = JSON.parse(
				fs.readFileSync(blockJsonPath, 'utf8')
			);
			isInteractive = blockJson.supports?.interactivity || false;
		} catch (error) {
			process.stdout.write(
				`Warning: Could not parse block.json: ${error.message}\n`
			);
		}
	}

	const ellipses = ['.', '..', '...', ''];
	let ellipsesIndex = 0;
	const interval = setInterval(() => {
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(
			`Building Block Name: ${blockName}${ellipses[ellipsesIndex]}`
		);
		ellipsesIndex = (ellipsesIndex + 1) % ellipses.length;
	}, 500);

	// Clear the interval when the build process is done
	let command = `npx wp-scripts build --source-path=${src} --output-path=${output} --webpack-copy-php`;
	if (isInteractive) {
		command += ' --experimental-modules';
	}
	// Now run the manifest build command
	command +=
		'; npx wp-scripts build-blocks-manifest --input=./src --output=./build/blocks-manifest.php';

	// Execute everything:
	exec(command, (error, stdout, stderr) => {
		process.stdout.write(`Running command: ${command}\n`);
		clearInterval(interval);
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(' '.repeat(50)); // Clear the line
		readline.cursorTo(process.stdout, 0);
		process.stdout.write('Build complete!\n');

		if (error) {
			process.stdout.write(`Error: ${stderr}`);
		} else {
			process.stdout.write(stdout);
		}
	});
})();
