/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Change the value attribute to have a default value that includes fancy quotes.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

addFilter(
	'blocks.registerBlockType',
	'core/post-date',
	(settings) => {
		//check if object exists for old Gutenberg version compatibility
		if( 'core/post-date' === settings.name ){
			// console.log('post-date settings', settings);
			settings.supports = Object.assign( settings.supports, {
				align: [ 'left', 'right', 'wide' ],
				typography: {
					fontSize: true,
					fontAppearance: false,
					"__experimentalFontStyle": false,
					"__experimentalFontWeight": true,
					"__experimentalLetterSpacing": true,
					"__experimentalTextTransform": true,
					"__experimentalDefaultControls": {
						fontSize: true,
						"__experimentalLetterSpacing": true,
						"__experimentalTextTransform": true,
					}
				},
			});
		}
		return settings;
	}
);
