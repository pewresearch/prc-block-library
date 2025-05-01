/**
 * WordPress Dependencies
 */
import { select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';
import { useMemo } from '@wordpress/element';

/**
 * Recursively searches for blocks with name 'prc-block/render-to-region' in parsed content
 *
 * @param {Array|Object} blocks - The blocks to search through
 * @returns {Array} - Array of found render-to-region blocks
 */
function findRenderToRegionBlocks(blocks) {
	const renderToRegionBlocks = [];

	// Handle both single block object and array of blocks
	const blocksArray = Array.isArray(blocks) ? blocks : [blocks];

	function searchBlocks(block) {
		// Check if current block is a render-to-region block
		if (block.name === 'prc-block/render-to-region') {
			renderToRegionBlocks.push(block);
		}

		// Recursively search innerBlocks if they exist
		if (block.innerBlocks && block.innerBlocks.length > 0) {
			block.innerBlocks.forEach((innerBlock) => {
				searchBlocks(innerBlock);
			});
		}
	}

	// Start the recursive search
	blocksArray.forEach((block) => {
		searchBlocks(block);
	});

	return renderToRegionBlocks;
}

/**
 * Get all the regionName's from the blocks.
 * @param {Array} blocks - The blocks to search through
 * @returns {Array} - Array of found render-to-region blocks
 */
function getRegionNames(blocks) {
	const regionNames = [];
	blocks.forEach((block) => {
		// Check if the block has an attributes property and if it has a regionNames property
		if (block.attributes && block.attributes.regionName) {
			regionNames.push(block.attributes.regionName);
		}
	});
	return regionNames;
}

export function getRegionsFromPost(postId, postType) {
	const post = select(coreStore).getEntityRecord(
		'postType',
		postType,
		postId
	);
	// if no post, return an empty array
	if (!post) {
		return [];
	}
	// if no content, return an empty array
	if (!post.content.raw) {
		return [];
	}
	const parsedContent = parse(post?.content?.raw);
	const renderToRegionBlocks = findRenderToRegionBlocks(parsedContent);
	const regionNames = getRegionNames(renderToRegionBlocks);
	return regionNames;
}

export default function useRegionsFromPost(postId, postType) {
	const regions = useMemo(() => {
		return getRegionsFromPost(postId, postType);
	}, [postId, postType]); // Only recompute if postId or postType changes

	return regions;
}
