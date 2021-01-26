/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { share as shareIcon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Social Link'),
    icon: shareIcon,
    description: __(
        'Add a link to a social network to a profile or to share the current post.',
    ),
    // variations: [
    //     {
    //         name: 'link',
    //         isDefault: true,
    //         title: __('Link'),
    //         description: __('A link to a URL.'),
    //         attributes: {},
    //     },
    //     {
    //         name: 'post',
    //         icon: postIcon,
    //         title: __('Post Link'),
    //         description: __('A link to a post.'),
    //         attributes: { type: 'post' },
    //     },
    // ],
    __experimentalLabel: ({ label }) => label,
    merge(leftAttributes, { label: rightLabel = '' }) {
        return {
            ...leftAttributes,
            label: leftAttributes.label + rightLabel,
        };
    },
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
