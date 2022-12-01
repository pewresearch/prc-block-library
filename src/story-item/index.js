/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { date as formatDate } from '@wordpress/date';

/**
 * Internal Dependencies
 */
// import deprecated from './deprecated';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
	variations,
	transforms,
	__experimentalLabel: ({ title }) => title || 'Story Item', // Will change the label to match the title, #experimental.
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
