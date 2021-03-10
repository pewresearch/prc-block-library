/**
 * WordPress dependencies
 */
import * as moment from 'moment';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Promo Rotator'),
    description: __(
        'Rotates through each block once on page load.',
    ),
    keywords: [__('promo'), __('experiment'), __('rotator'), __('ad rotator')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
