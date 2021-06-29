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
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Responsive View'),
    description: 'A block of blocks that appears and hides at specific viewport widths.',
    icon: 'art',
    category: 'layout',
    keywords: [__('ai2html'), __('Illustrator'), __('Responsive')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
