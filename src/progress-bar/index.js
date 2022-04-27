/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
// import icon from './icon';
// import './style.scss';

const { name } = metadata;

const settings = {
	title: __('Progress Bar'),
	icon: 'chart-bar',
	keywords: [
		__('progress'),
		__('bar'),
		__('quiz'),
		__('result'),
		__('chart'),
		__('horizontal'),
	],
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
