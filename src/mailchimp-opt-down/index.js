/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

const settings = {
	edit,
	save: () => <Fragment/>,
};

registerBlockType(name, { ...metadata, ...settings });
