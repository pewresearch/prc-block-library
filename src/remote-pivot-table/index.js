/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

import edit from './edit';
import save from './save';
import icon from './icon';
import metadata from './block.json';

const { name } = metadata;

const settings = {
	edit,
	save,
	icon,
};

registerBlockType(name, { ...metadata, ...settings });
