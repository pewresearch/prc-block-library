/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
    title: __( 'Gist', 'prc-block' ),
    description: __( 'Embed a GitHub Gist.', 'prc-block' ),
    keywords: [
        'github',
        'gist'
    ],
    transforms,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });