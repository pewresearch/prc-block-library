import { select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';
import { getPostMeta } from '@prc/platform/utils';

const getAllRegionsFromPostId = (postId) => {
	// Using getEntityREcord we'll get the dited post meta and get that value.
};

const getTemplateIdForPost = (postId) => {
	// Using getEntityREcord we'll get the dited post meta and get that value.
};

const getAllRegionsForPost = (postId) => {
	// This will get the given post's rs.egions and then check it's templates for regions.
	// It will then return an array of all the combined regions.
	const regions = getAllRegionsFromPostId(postId);
	const templateId = getTemplateIdForPost(postId);
	const templateRegions = getAllRegionsFromPostId(templateId);
	return [...regions, ...templateRegions];
};

/**
 * Recursively searches for blocks with name 'prc-block/render-to-region' in parsed content
 *
 * @param {Array|Object} blocks - The blocks to search through
 * @returns {Array} - Array of found render-to-region blocks
 */
export function findRenderToRegionBlocks(blocks) {
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
export function getRegionNames(blocks) {
	const regionNames = [];
	blocks.forEach((block) => {
		// Check if the block has an attributes property and if it has a regionNames property
		if (block.attributes && block.attributes.regionName) {
			regionNames.push(block.attributes.regionName);
		}
	});
	return regionNames;
}

export default getAllRegionsForPost;
