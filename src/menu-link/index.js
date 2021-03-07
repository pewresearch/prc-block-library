/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    category as categoryIcon,
    mapMarker as linkIcon,
    page as pageIcon,
    postTitle as postIcon,
    tag as tagIcon,
} from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export const settings = {
    title: __('Link'),

    icon: linkIcon,

    description: __('Add a page, link, or another item to your navigation.'),

    variations: [
        {
            name: 'link',
            isDefault: true,
            title: __('Link'),
            description: __('A link to a URL.'),
            attributes: {},
        },
        {
            name: 'post',
            icon: postIcon,
            title: __('Post Link'),
            description: __('A link to a post.'),
            attributes: { type: 'post' },
        },
        {
            name: 'page',
            icon: pageIcon,
            title: __('Page Link'),
            description: __('A link to a page.'),
            attributes: { type: 'page' },
        },
        {
            name: 'topic',
            icon: categoryIcon,
            title: __('Topic Page Link'),
            description: __('A link to a topic.'),
            attributes: { type: 'topic' },
        },
        {
            name: 'formats',
            icon: tagIcon,
            title: __('Format Link'),
            description: __('A link to a format.'),
            attributes: { type: 'formats' },
        },
        {
            name: 'programs',
            icon: tagIcon,
            title: __('Program Link'),
            description: __('A link to a program.'),
            attributes: { type: 'programs' },
        },
    ],

    __experimentalLabel: ({ label }) => label,

    merge(leftAttributes, { label: rightLabel = '' }) {
        return {
            ...leftAttributes,
            label: leftAttributes.label + rightLabel,
        };
    },

    edit,

    save,

    deprecated: [
        {
            isEligible(attributes) {
                return attributes.nofollow;
            },

            attributes: {
                label: {
                    type: 'string',
                },
                type: {
                    type: 'string',
                },
                nofollow: {
                    type: 'boolean',
                },
                description: {
                    type: 'string',
                },
                id: {
                    type: 'number',
                },
                opensInNewTab: {
                    type: 'boolean',
                    default: false,
                },
                url: {
                    type: 'string',
                },
            },

            migrate({ nofollow, ...rest }) {
                return {
                    rel: nofollow ? 'nofollow' : '',
                    ...rest,
                };
            },

            save() {
                return <InnerBlocks.Content />;
            },
        },
    ],
};

registerBlockType(name, { ...metadata, ...settings });
