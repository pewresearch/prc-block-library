/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import icon from './icon';
import save from './save';
import deprecated from './deprecated';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	deprecated,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });

const legacy__tabsMenuItem = registerBlockType('prc-block/tabs-menu-item', {
	apiVersion: 3,
	title: 'Legacy Tabs Menu Item',
	version: '1.0.0',
	category: 'design',
	name: 'prc-block/tabs-menu-item',
	attributes: {
		title: { type: 'string' },
		slug: { type: 'string' },
		uuid: { type: 'string' },
	},
	supports: {
		inserter: false,
	},
	edit: () => null,
	save: () => null,
});

const legacy__tabsPane = registerBlockType('prc-block/tabs-pane', {
	apiVersion: 3,
	title: 'Legacy Tabs Pane',
	version: '1.0.0',
	category: 'design',
	name: 'prc-block/tabs-pane',
	attributes: {
		uuid: { type: 'string' },
	},
	supports: {
		inserter: false,
	},
	edit: () => null,
	save: () => null,
});

console.log('Legacy Tabs Supports:', {
	menu: legacy__tabsMenuItem,
	pane: legacy__tabsPane,
});
