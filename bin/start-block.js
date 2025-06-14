const { spawn } = require('child_process');
const prompts = require('prompts');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

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

	if (!blockName) {
		process.stdout.write('Starting all blocks...\n');
	} else {
	}

	const src = `./src/${blockName}/`;
	const output = `./build/${blockName}/`;

	// Check if src directory exists
	if (!fs.existsSync(src)) {
		process.stdout.write(
			`❌ Block does not exist at ${src}. Build process stopped.`
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
				`⚠️ Warning: Could not parse block.json: ${error.message}\n`
			);
		}
	}

	const ellipses = ['.', '..', '...', ''];
	let ellipsesIndex = 0;
	const interval = setInterval(() => {
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(
			`⚒️ Watching block: ${blockName}${ellipses[ellipsesIndex]}`
		);
		ellipsesIndex = (ellipsesIndex + 1) % ellipses.length;
	}, 500);

	let command =
		'npx wp-scripts build-blocks-manifest --input=./src --output=./build/blocks-manifest.php';
	// Clear the interval when the build process is done
	command += `; npx wp-scripts start --source-path=${src} --output-path=${output} --webpack-copy-php`;
	if (isInteractive) {
		command += ' --experimental-modules';
	}

	// Split the command into parts for spawn
	const [manifestCmd, ...manifestArgs] = command
		.split(';')[0]
		.trim()
		.split(' ');
	const [startCmd, ...startArgs] = command.split(';')[1].trim().split(' ');

	// Run the manifest build first
	const manifestProcess = spawn(manifestCmd, manifestArgs, { shell: true });

	manifestProcess.stdout.on('data', (data) => {
		process.stdout.write(data);
		process.stdout.write(chalk.green('✅ Build complete!\n'));
		process.stdout.write('\x07'); // Terminal chime
	});

	manifestProcess.stderr.on('data', (data) => {
		process.stderr.write(data);
	});

	manifestProcess.on('close', (code) => {
		if (code !== 0) {
			process.stdout.write(
				chalk.red(`❌ Manifest build failed with code ${code}\n`)
			);
			clearInterval(interval);
			process.exit(code);
		}

		// After manifest build completes, start the watch process
		const startProcess = spawn(startCmd, startArgs, { shell: true });

		startProcess.stdout.on('data', (data) => {
			clearInterval(interval);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(' '.repeat(50)); // Clear the line
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(data);
			const now = new Date();
			const timestamp = now.toLocaleString('en-US', {
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			});
			process.stdout.write(
				chalk.green(`✅ Build complete! [${timestamp}]\n`)
			);
			process.stdout.write('\x07'); // Terminal chime
		});

		startProcess.stderr.on('data', (data) => {
			clearInterval(interval);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(' '.repeat(50)); // Clear the line
			readline.cursorTo(process.stdout, 0);
			process.stderr.write(data);
		});

		startProcess.on('close', (code) => {
			clearInterval(interval);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(' '.repeat(50)); // Clear the line
			readline.cursorTo(process.stdout, 0);
			if (code !== 0) {
				process.stdout.write(
					chalk.red(`❌ Build process exited with code ${code}\n`)
				);
			} else {
				const now = new Date();
				const timestamp = now.toLocaleString('en-US', {
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: true,
				});
				process.stdout.write(
					chalk.green(`✅ Build complete! [${timestamp}]\n`)
				);
				process.stdout.write('\x07'); // Terminal chime
			}
		});
	});
})();
