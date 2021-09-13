/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { flipVertical as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('PRC Flip Card'),
    description: __('An unstyled card that has a front and back'),
    supports: {
        align: ['left', 'right'],
    },
    icon,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });