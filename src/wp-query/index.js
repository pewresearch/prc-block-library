/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { postList as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Query'),
    description: __(
        'Query posts by format, topic, region, and/or date. Posts are displayed as Story Items.',
    ),
    icon,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
