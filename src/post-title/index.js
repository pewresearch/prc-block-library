/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Depdendencies
 */
import './style.scss';

/**
 * Change post title supports to include more typography settings.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

// addFilter(
// 	'blocks.registerBlockType',
// 	'core/post-title',
// 	(settings) => {
// 		if( 'core/post-title' === settings.name ){
// 			console.log('post')
// 			settings.supports = Object.assign( settings.supports, {
// 				typography: {
// 					fontSize: true,
// 					lineHeight: true,
// 					fontAppearance: false,
// 					"__experimentalFontStyle": false,
// 					"__experimentalFontFamily": true,
// 					"__experimentalFontWeight": true,
// 					"__experimentalLetterSpacing": true,
// 					"__experimentalTextTransform": true,
// 					"__experimentalDefaultControls": {
// 						fontSize: true,
// 						lineHeight: true,
// 						"__experimentalFontFamily": true,
// 					}
// 				},
// 			});
// 		}
// 		return settings;
// 	}
// );
