const { exec } = require('child_process');
const prompts = require('prompts');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let blockName = args[0];

(async () => {
	// Dynamic import for chalk to handle ES module
	const chalk = (await import('chalk')).default;

	if (!blockName) {
		const response = await prompts({
			type: 'text',
			name: 'blockName',
			message: chalk.cyan(
				'Enter the block name, or press enter to build all blocks'
			),
		});
		blockName = response.blockName;
	}

	if (
		!blockName ||
		blockName === 'all' ||
		blockName === 'ALL' ||
		blockName === 'library' ||
		blockName === 'LIBRARY'
	) {
		process.stdout.write(chalk.blue('🔨 Building all blocks...\n'));
		exec(
			'npx wp-scripts build --webpack-copy-php',
			(error, stdout, stderr) => {
				if (error) {
					process.stdout.write(chalk.red(`❌ Error: ${stderr}`));
				} else {
					process.stdout.write(stdout);
				}
				process.stdout.write(
					chalk.green('✅ Non-interactive blocks built!\n')
				);

				exec(
					'npx wp-scripts build --experimental-modules --webpack-copy-php',
					(error, stdout, stderr) => {
						if (error) {
							process.stdout.write(
								chalk.red(`❌ Error: ${stderr}`)
							);
						} else {
							process.stdout.write(stdout);
						}
						process.stdout.write(
							chalk.green('✅ Interactive blocks built!\n')
						);

						exec(
							'npx wp-scripts build-blocks-manifest',
							(error, stdout, stderr) => {
								if (error) {
									process.stdout.write(
										chalk.red(`❌ Error: ${stderr}`)
									);
								} else {
									process.stdout.write(stdout);
								}
								process.stdout.write(
									chalk.green('✅ Blocks manifest built!\n')
								);
							}
						);
					}
				);
			}
		);
	} else {
		const src = `./src/${blockName}/`;
		const output = `./build/${blockName}/`;

		// Check if src directory exists
		if (!fs.existsSync(src)) {
			process.stdout.write(
				chalk.red(
					`❌ Block does not exist at ${src}. Build process stopped.`
				)
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
					chalk.yellow(
						`⚠️  Warning: Could not parse block.json: ${error.message}\n`
					)
				);
			}
		}

		const ellipses = ['.', '..', '...', ''];
		let ellipsesIndex = 0;
		const interval = setInterval(() => {
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(
				chalk.blue(
					`⚒️ Building block: ${chalk.bold(blockName)}${ellipses[ellipsesIndex]}`
				)
			);
			ellipsesIndex = (ellipsesIndex + 1) % ellipses.length;
		}, 500);

		// Clear the interval when the build process is done
		let command = `npx wp-scripts build --source-path=${src} --output-path=${output} --webpack-copy-php`;
		if (isInteractive) {
			command += ' --experimental-modules';
			process.stdout.write(
				chalk.magenta(
					`🏗️ ${chalk.bgMagenta.white('(🔌iAPI)')} Building block: ${blockName}\n`
				)
			);
		} else {
			process.stdout.write(
				chalk.cyan(`🏗️ Building block: ${blockName}\n`)
			);
		}
		// Now run the manifest build command
		command +=
			'; npx wp-scripts build-blocks-manifest --input=./src --output=./build/blocks-manifest.php';

		// Execute everything:
		exec(command, (error, stdout, stderr) => {
			process.stdout.write(chalk.gray(`\nRunning command: ${command}\n`));
			clearInterval(interval);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(' '.repeat(50)); // Clear the line
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(chalk.green('✅ Build process complete!\n'));

			if (error) {
				process.stdout.write(
					chalk.red(`❌ Build process error: ${stderr}`)
				);
			} else {
				process.stdout.write(stdout);
				process.stdout.write(chalk.green('✅ Build complete!\n'));
			}
		});
	}
})();
