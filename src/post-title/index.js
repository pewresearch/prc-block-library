/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Depdendencies
 */
import './style.scss';

/**
 * Change the value attribute to have a default value that includes fancy quotes.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

addFilter(
	'blocks.registerBlockType',
	'core/post-title',
	(settings) => {
		//check if object exists for old Gutenberg version compatibility
		if( 'core/post-title' === settings.name ){
			// console.log('post-title settings', settings);
			// settings.supports = Object.assign( settings.supports, {
			// 	align: [ 'left', 'right', 'wide' ],
			// 	typography: {
			// 		fontSize: true,
			// 		"__experimentalFontStyle": false,
			// 		"__experimentalFontWeight": false,
			// 		"__experimentalLetterSpacing": false,
			// 		"__experimentalTextTransform": false,
			// 		"__experimentalDefaultControls": {
			// 			fontSize: true,
			// 			fontAppearance: false
			// 		}
			// 	},
			// });
		}
		return settings;
	}
);
