/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { store as noticesStore } from '@wordpress/notices';
import { dispatch } from '@wordpress/data';
import jabber from 'jabber';
import topics from './topics';

/**
 * Internal Dependencies
 */
import metadata from './block.json';

const { name } = metadata;

const MAX_BLOCKS = 15;

// Helper function to get random number between min and max
const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to create varied content blocks
const createVariedContent = (jab, totalBlocks) => {
	const blocks = [];

	// If we have more than 3 blocks, add a heading at the start
	if (totalBlocks > 3) {
		blocks.push(
			createBlock('core/heading', {
				level: 2,
				content: jab.createParagraph(1).replace(/[.,]/g, ''),
			})
		);
	}

	// Create the main content blocks
	for (let i = 0; i < totalBlocks; i++) {
		// Vary paragraph lengths between 30-70 words
		const wordCount = getRandomInt(30, 70);

		// Every 3rd block has a chance to be a different type
		if (i > 0 && i % 3 === 0) {
			const blockType = Math.random();

			if (blockType < 0.3) {
				// Create a quote block
				blocks.push(
					createBlock('core/quote', {
						value: `<p>${jab.createParagraph(wordCount / 2)}</p>`,
						citation: jab.createParagraph(1).replace(/[.,]/g, ''),
					})
				);
			} else if (blockType < 0.6) {
				// Create a list block
				const listItems = Array.from(
					{ length: getRandomInt(3, 6) },
					() => jab.createParagraph(getRandomInt(10, 20))
				);
				blocks.push(
					createBlock('core/list', {
						values: listItems
							.map((item) => `<li>${item}</li>`)
							.join(''),
					})
				);
			} else {
				// Regular paragraph
				blocks.push(
					createBlock('core/paragraph', {
						content: jab.createParagraph(wordCount),
					})
				);
			}
		} else {
			// Regular paragraph
			blocks.push(
				createBlock('core/paragraph', {
					content: jab.createParagraph(wordCount),
				})
			);
		}
	}

	return blocks;
};

const transforms = {
	from: [
		{
			type: 'enter',
			regExp: /%ipsum/,
			transform: ({ content }) => {
				const match = content.match(/%ipsum\s*(\d+)/);
				let number = match && match[1] ? parseInt(match[1], 10) : 1;

				// Limit the number of blocks to MAX_BLOCKS
				if (number > MAX_BLOCKS) {
					dispatch(noticesStore).createNotice(
						'warning',
						`Maximum of ${MAX_BLOCKS} lorem ipsum blocks allowed. Generating ${MAX_BLOCKS} instead.`,
						{
							type: 'snackbar',
							isDismissible: true,
						}
					);
					number = MAX_BLOCKS;
				}

				const jab = new jabber(topics, 6);
				return createVariedContent(jab, number);
			},
		},
	],
};

// This is sorta a "ghost" block. It's not really a block, but it's used to inject this transformer into the editor.
const settings = {
	edit: () => null,
	save: () => null,
	transforms,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });
