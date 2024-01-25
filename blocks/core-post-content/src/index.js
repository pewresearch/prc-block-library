/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

// Because theres no good way to inject this in the build process we're defaulting to transforming the core block name like so. You can manually change this if you want.
const BLOCKNAME = 'core/post-content';
const BLOCKIDENTIFIER = 'prc-block-library/core-post-content';
