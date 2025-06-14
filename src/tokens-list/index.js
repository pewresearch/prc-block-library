/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import icon, { TokenIcon } from './icon';
import metadata from './block.json';
import { TOKEN_ATTRIBUTES } from './constants';

const { name } = metadata;

const settings = {
	edit,
	save,
	icon,
};

/**
 * Tokens List Block
 */
registerBlockType(name, { ...metadata, ...settings });

/**
 * "Token Button" Block Variation of "core/button"
 */
registerBlockVariation('core/button', {
	name: 'prc-block/tokens-list__button',
	title: 'Token Button',
	description: 'A button for use in a token list.',
	icon: TokenIcon,
	attributes: {
		...TOKEN_ATTRIBUTES,
	},
	isActive: (blockAttributes, variationAttributes) => {
		return blockAttributes.className === variationAttributes.className;
	},
});
