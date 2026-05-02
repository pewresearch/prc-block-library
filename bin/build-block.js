const { exec } = require('child_process');
const prompts = require('prompts');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let blockName = args[0];

// Configuration for different block sources
const BLOCK_SOURCES = {
	library: {
		srcDir: './src/',
		buildDir: './build/',
		manifestInput: './src',
		manifestOutput: './build/blocks-manifest.php',
	},
	core: {
		srcDir: './core-blocks/src/',
		buildDir: './core-blocks/build/',
		manifestInput: './core-blocks/src',
		manifestOutput: './core-blocks/build/blocks-manifest.php',
	},
	deprecated: {
		srcDir: './deprecated/src/',
		buildDir: './deprecated/build/',
		manifestInput: './deprecated/src',
		manifestOutput: './deprecated/build/blocks-manifest.php',
	},
};

// Function to build a single block
async function buildSingleBlock(name, chalk, source = 'library') {
	const config = BLOCK_SOURCES[source];
	const src = `${config.srcDir}${name}/`;
	const output = `${config.buildDir}${name}/`;

	// Check if src directory exists
	if (!fs.existsSync(src)) {
		process.stdout.write(
			chalk.red(`❌ Block does not exist at ${src}. Skipping...\n`)
		);
		return false;
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
					`⚠️  Warning: Could not parse block.json for ${name}: ${error.message}\n`
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
				`⚒️ Building block: ${chalk.bold(name)}${
					ellipses[ellipsesIndex]
				}`
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
				`🏗️ ${chalk.bgMagenta.white(
					'(🔌iAPI)'
				)} Building block: ${name}\n`
			)
		);
	} else {
		process.stdout.write(chalk.cyan(`🏗️ Building block: ${name}\n`));
	}
	// Now run the manifest build command
	command += `; npx wp-scripts build-blocks-manifest --input=${config.manifestInput} --output=${config.manifestOutput}`;

	return new Promise((resolve) => {
		// Execute everything:
		exec(command, (error, stdout, stderr) => {
			process.stdout.write(chalk.gray(`\nRunning command: ${command}\n`));
			clearInterval(interval);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(' '.repeat(50)); // Clear the line
			readline.cursorTo(process.stdout, 0);

			// Check for webpack compilation errors in stdout
			const hasWebpackError =
				stdout &&
				((stdout.includes('webpack compiled with') &&
					stdout.includes('error')) ||
					stdout.includes('ERROR in') ||
					stdout.includes('Failed to compile'));

			if (error || hasWebpackError) {
				process.stdout.write(stdout);
				process.stdout.write(
					chalk.red(
						`❌ Build failed for ${name}${
							stderr ? ':\n' + stderr : ''
						}\n`
					)
				);
				resolve(false);
			} else {
				process.stdout.write(stdout);
				process.stdout.write(
					chalk.green(`✅ ${name} built successfully!\n`)
				);
				resolve(true);
			}
		});
	});
}

// Function to build all core blocks (used when building "all")
async function buildAllCoreBlocks(chalk) {
	const config = BLOCK_SOURCES.core;

	if (!fs.existsSync(config.srcDir)) {
		process.stdout.write(
			chalk.yellow(
				`⚠️  Core blocks source directory ${config.srcDir} does not exist. Skipping core blocks.\n`
			)
		);
		return;
	}

	process.stdout.write(chalk.blue('\n🔨 Building all core blocks...\n'));

	// Get all block directories in core-blocks/src
	const coreBlocks = fs
		.readdirSync(config.srcDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.filter((dirent) => dirent.name !== 'utils') // Exclude utils folder
		.map((dirent) => dirent.name);

	if (coreBlocks.length === 0) {
		process.stdout.write(
			chalk.yellow('⚠️  No core blocks found to build.\n')
		);
		return;
	}

	let successCount = 0;
	for (const block of coreBlocks) {
		const success = await buildSingleBlock(block, chalk, 'core');
		if (success) successCount++;
	}

	// Build blocks manifest for core blocks
	exec(
		`npx wp-scripts build-blocks-manifest --input=${config.manifestInput} --output=${config.manifestOutput}`,
		(error, stdout, stderr) => {
			if (error) {
				process.stdout.write(
					chalk.red(
						`❌ Error building core blocks manifest: ${stderr}\n`
					)
				);
			} else {
				process.stdout.write(stdout);
				process.stdout.write(
					chalk.green('✅ Core blocks manifest built!\n')
				);
			}
		}
	);

	process.stdout.write(
		chalk.green(
			`✅ Core blocks build complete! ${successCount}/${coreBlocks.length} blocks built successfully.\n`
		)
	);
}

async function buildAllDeprecatedBlocks(chalk) {
	const config = BLOCK_SOURCES.deprecated;

	if (!fs.existsSync(config.srcDir)) {
		process.stdout.write(
			chalk.yellow(
				`⚠️  Deprecated blocks source directory ${config.srcDir} does not exist. Skipping deprecated blocks.\n`
			)
		);
		return;
	}

	process.stdout.write(
		chalk.blue('\n🔨 Building all deprecated blocks...\n')
	);

	const deprecatedBlocks = fs
		.readdirSync(config.srcDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	if (deprecatedBlocks.length === 0) {
		process.stdout.write(
			chalk.yellow('⚠️  No deprecated blocks found to build.\n')
		);
		return;
	}

	let successCount = 0;
	for (const block of deprecatedBlocks) {
		const success = await buildSingleBlock(block, chalk, 'deprecated');
		if (success) successCount++;
	}

	process.stdout.write(
		chalk.green(
			`✅ Deprecated blocks build complete! ${successCount}/${deprecatedBlocks.length} blocks built successfully.\n`
		)
	);
}

(async () => {
	// Dynamic import for chalk to handle ES module
	const chalk = (await import('chalk')).default;

	if (!blockName) {
		const response = await prompts({
			type: 'text',
			name: 'blockName',
			message: chalk.cyan(
				'Enter the block name (supports wildcards like form-*), use "core:" prefix for core blocks (e.g., core:tabs), "deprecated:" for deprecated blocks (e.g., deprecated:tabs), or press enter to build all blocks'
			),
		});
		blockName = response.blockName;
	}

	// Check if building core or deprecated blocks
	const isCoreBlock = blockName && blockName.startsWith('core:');
	const isDeprecatedBlock = blockName && blockName.startsWith('deprecated:');
	const isAllCore =
		blockName === 'core' ||
		blockName === 'core-blocks' ||
		blockName === 'CORE';
	const isAllDeprecated =
		blockName === 'deprecated' || blockName === 'DEPRECATED';

	if (isCoreBlock) {
		blockName = blockName.replace('core:', '');
	}
	if (isDeprecatedBlock) {
		blockName = blockName.replace('deprecated:', '');
	}

	// Handle wildcard patterns
	if (blockName && blockName.includes('*')) {
		// Convert wildcard pattern to regex
		const regexPattern = blockName.replace(/\*/g, '.*');
		const regex = new RegExp(`^${regexPattern}$`);

		// Get all directories in src folder
		const source = isCoreBlock
			? 'core'
			: isDeprecatedBlock
			? 'deprecated'
			: 'library';
		const config = BLOCK_SOURCES[source];
		const srcDir = config.srcDir;
		if (!fs.existsSync(srcDir)) {
			process.stdout.write(
				chalk.red(`❌ Source directory ${srcDir} does not exist.`)
			);
			process.exit(1);
		}

		const allBlocks = fs
			.readdirSync(srcDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.filter((dirent) => dirent.name !== 'utils') // Exclude utils folder
			.map((dirent) => dirent.name);

		// Filter blocks that match the pattern
		const matchingBlocks = allBlocks.filter((block) => regex.test(block));

		if (matchingBlocks.length === 0) {
			process.stdout.write(
				chalk.yellow(
					`⚠️  No blocks found matching pattern: ${blockName}\n`
				)
			);
			process.exit(1);
		}

		const sourceLabel = isCoreBlock ? 'core ' : '';
		process.stdout.write(
			chalk.blue(
				`🔨 Found ${
					matchingBlocks.length
				} ${sourceLabel}blocks matching pattern "${blockName}": ${matchingBlocks.join(
					', '
				)}\n`
			)
		);

		// Build each matching block sequentially
		let successCount = 0;
		for (const block of matchingBlocks) {
			const success = await buildSingleBlock(block, chalk, source);
			if (success) successCount++;
		}

		process.stdout.write(
			chalk.green(
				`✅ Pattern build complete! ${successCount}/${matchingBlocks.length} ${sourceLabel}blocks built successfully.\n`
			)
		);

		if (successCount < matchingBlocks.length) {
			process.exit(1);
		}
		return;
	}

	// Handle building all deprecated blocks
	if (isAllDeprecated) {
		await buildAllDeprecatedBlocks(chalk);
		return;
	}

	// Handle building all core blocks
	if (isAllCore) {
		process.stdout.write(chalk.blue('🔨 Building all core blocks...\n'));
		const config = BLOCK_SOURCES.core;

		// Get all block directories in core-blocks/src
		const coreBlocks = fs
			.readdirSync(config.srcDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.filter((dirent) => dirent.name !== 'utils') // Exclude utils folder
			.map((dirent) => dirent.name);

		let successCount = 0;
		for (const block of coreBlocks) {
			const success = await buildSingleBlock(block, chalk, 'core');
			if (success) successCount++;
		}

		// Build blocks manifest for core blocks
		exec(
			`npx wp-scripts build-blocks-manifest --input=${config.manifestInput} --output=${config.manifestOutput}`,
			(error, stdout, stderr) => {
				if (error) {
					process.stdout.write(
						chalk.red(
							`❌ Error building core blocks manifest: ${stderr}`
						)
					);
				} else {
					process.stdout.write(stdout);
					process.stdout.write(
						chalk.green('✅ Core blocks manifest built!\n')
					);
				}
			}
		);

		process.stdout.write(
			chalk.green(
				`✅ Core blocks build complete! ${successCount}/${coreBlocks.length} blocks built successfully.\n`
			)
		);

		if (successCount < coreBlocks.length) {
			process.exit(1);
		}
		return;
	}

	if (
		!blockName ||
		blockName === 'all' ||
		blockName === 'ALL' ||
		blockName === 'library' ||
		blockName === 'LIBRARY'
	) {
		process.stdout.write(chalk.blue('🔨 Building all library blocks...\n'));
		exec(
			'npx wp-scripts build --webpack-copy-php',
			(error, stdout, stderr) => {
				if (error) {
					process.stdout.write(chalk.red(`❌ Error: ${stderr}`));
				} else {
					process.stdout.write(stdout);
				}
				process.stdout.write(
					chalk.green('✅ Non-interactive library blocks built!\n')
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
							chalk.green(
								'✅ Interactive library blocks built!\n'
							)
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
									chalk.green(
										'✅ Library blocks manifest built!\n'
									)
								);

								// Now build deprecated and core blocks
								buildAllDeprecatedBlocks(chalk).then(() =>
									buildAllCoreBlocks(chalk)
								);
							}
						);
					}
				);
			}
		);
	} else if (isCoreBlock) {
		// Build single specific core block
		const success = await buildSingleBlock(blockName, chalk, 'core');
		if (!success) {
			process.exit(1);
		}
	} else if (isDeprecatedBlock) {
		// Build single specific deprecated block
		const success = await buildSingleBlock(blockName, chalk, 'deprecated');
		if (!success) {
			process.exit(1);
		}
	} else {
		// Build single specific library block
		const success = await buildSingleBlock(blockName, chalk, 'library');
		if (!success) {
			process.exit(1);
		}
	}
})();
