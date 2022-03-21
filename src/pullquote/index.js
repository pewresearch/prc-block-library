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

// addFilter(
// 	'blocks.registerBlockType',
// 	'core/pullquote',
// 	(settings) => {
// 		//check if object exists for old Gutenberg version compatibility
// 		if( 'core/pullquote' === settings.name && typeof settings.supports !== 'undefined' ){
// 			settings.supports = Object.assign( settings.supports, {
// 				align: [ 'left', 'right', 'wide' ],

// 			});
// 		}
// 		return settings;
// 	}
// );
