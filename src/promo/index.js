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
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Promo (Ad)'),
    description: 'Stylized block to create promos/ads.',
    category: 'layout',
    keywords: [__('prc'), __('ad'), __('promo'), __('pancake')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
