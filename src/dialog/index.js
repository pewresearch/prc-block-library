/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import variations from './variations';
import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });


const popupControllerUpgrade = (clientId) => {
	// Get an array of this block's innerblocks and change the name of prc-block/popup-content to prc-block/dialog-trigger and prc-block/popup-modal to prc-block/dialog-element
	// Finally, I need to change this block's name to prc-block/dialog and then replace this block instance with that new block instance.
	const block = select('core/block-editor').getBlock(clientId);
	const innerBlocks = block.innerBlocks;
	const newInnerBlocks = innerBlocks.map((innerBlock) => {
		if (innerBlock.name === 'prc-block/popup-content') {
			innerBlock.name = 'prc-block/dialog-trigger';
		} else if (innerBlock.name === 'prc-block/popup-modal') {
			innerBlock.name = 'prc-block/dialog-element';
		}
		return innerBlock;
	});
	const newBlock = {
		...block,
		name: 'prc-block/dialog',
		innerBlocks: newInnerBlocks,
	};
	dispatch('core/block-editor').replaceBlocks(clientId, newBlock);
}

const legacy__popupController = registerBlockType(
	'prc-block/popup-controller',
	{
		apiVersion: 3,
		title: 'Legacy Popup Controller',
		version: '1.0.0',
		category: 'design',
		name: 'prc-block/popup-controller',
		attributes: {},
		supports: {
			inserter: false,
		},
		edit: ({clientId}) => {
			popupControllerUpgrade(clientId);
			return null;
		},
		save: () => null,
	}
);

const legacy__popupContent = registerBlockType('prc-block/popup-content', {
	apiVersion: 3,
	title: 'Legacy Popup Content',
	version: '1.0.0',
	category: 'design',
	name: 'prc-block/popup-content',
	attributes: {
		allowedBlocks: {
			type: 'array',
		},
		disengageClickHandler: {
			type: 'boolean',
			default: false,
		}
	},
	supports: {
		inserter: false,
	},
	edit: () => null,
	save: () => null,
});

const legacy_popupModal = registerBlockType('prc-block/popup-modal', {
	apiVersion: 3,
	title: 'Legacy Popup Modal',
	version: '1.0.0',
	category: 'design',
	name: 'prc-block/popup-modal',
	attributes: {
		allowedBlocks: {
			type: 'array',
		},
		title: {
			type: 'string',
		},
		transition: {
			type: 'string',
			default: 'scale',
		},
		shadeBackgroundLite: {
			type: 'boolean',
			default: false,
		},
		controllerId: {
			type: 'string',
		},
		isVideo: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		inserter: false,
	},
	edit: () => null,
	save: () => null,
});
