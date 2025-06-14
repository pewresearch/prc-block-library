/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { register } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import store from './store';
import registerDefaultForms from './register-forms';
import './style.scss';

const { name } = metadata;

export { metadata, name };

export const settings = {
	edit,
	save,
};

register(store);

registerDefaultForms();

registerBlockType(name, { ...metadata, ...settings });

// Prevent adding forms inside forms.
const DISALLOWED_PARENTS = ['prc-block/form'];
addFilter(
	'blockEditor.__unstableCanInsertBlockType',
	'prc-block-library/preventInsertingFormIntoAnotherForm',
	(
		canInsert,
		blockType,
		rootClientId,
		{ getBlock, getBlockParentsByBlockName }
	) => {
		if (blockType.name !== 'prc-block/form') {
			return canInsert;
		}
		for (const disallowedParentType of DISALLOWED_PARENTS) {
			const hasDisallowedParent =
				getBlock(rootClientId)?.name === disallowedParentType ||
				getBlockParentsByBlockName(rootClientId, disallowedParentType)
					.length;
			if (hasDisallowedParent) {
				return false;
			}
		}
		return true;
	}
);
