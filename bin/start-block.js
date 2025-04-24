const { exec } = require('child_process');
const prompts = require('prompts');
const readline = require('readline');
const fs = require('fs');

const args = process.argv.slice(2);
let blockName = args[0];
let isInteractive = args[1] === 'true';

(async () => {
	if (!blockName) {
		const response = await prompts({
			type: 'text',
			name: 'blockName',
			message: 'Enter the block name',
		});
		blockName = response.blockName;
	}

	if (isInteractive === false) {
		const response = await prompts({
			type: 'confirm',
			name: 'isInteractive',
			message: 'Does this block utilize the Interactivity API?',
			initial: true,
		});
		isInteractive = response.isInteractive;
	}

	const ellipses = ['.', '..', '...', ''];
	let ellipsesIndex = 0;
	const interval = setInterval(() => {
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(
			`Watching Block Name: ${blockName}${ellipses[ellipsesIndex]}`
		);
		ellipsesIndex = (ellipsesIndex + 1) % ellipses.length;
	}, 500);

	console.log(`Watching ${isInteractive ? 'Interactive' : 'Non-Interactive'} Block For Changes`);

	const src = `./src/${blockName}`;
	const output = `./build/${blockName}`;

	// Check if src directory exists
	if (!fs.existsSync(src)) {
		console.warn(`Block does not exist at ${src}. Build process stopped.`);
		clearInterval(interval);
		process.exit(1);
	}

	// Clear the interval when the build process is done
	let command = 'npx wp-scripts build-blocks-manifest --input=./src --output=./build/blocks-manifest.php;';
		command += `npx wp-scripts start --webpack-src-dir=${src} --output-path=${output} --webpack-copy-php`;
	if (isInteractive) {
		command += ' --experimental-modules';
	}
	// Now run the manifest build command

	exec(command, (error, stdout, stderr) => {
		clearInterval(interval);
		readline.cursorTo(process.stdout, 0);
		console.log(' '.repeat(50)); // Clear the line
		readline.cursorTo(process.stdout, 0);

		if (error) {
			console.error(`Error: ${stderr}`);
		} else {
			console.log(stdout);
		}
	});
})();
