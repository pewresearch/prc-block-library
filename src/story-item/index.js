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
import transforms from './transforms';

const { name } = metadata;

const settings = {
    title: __('Story Item'),
    icon: 'format-aside',
    description: __(
        'A story item is a visual display of a post, usually referencing a stub post.',
    ),
    keywords: [__('prc'), __('story'), __('post'), __('story item')],
    example: {
        attributes: {
            title: 'Ultricies Ipsum Nibh Egestas Purus',
            excerpt:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
            extra: '<li></li>',
            link: '#',
            label: 'Report',
            date: moment().format('MM-DD-YYYY'),
            image:
                'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
            imageSlot: 'top',
            imageSize: 'A2',
            isPreview: true,
        },
    },
    variations: [
        {
            name: 'story-item-default',
            isDefault: true,
            title: __('Story Item'),
            description: __('The default story item'),
            attributes: {
                imageSlot: 'default',
                imageSize: 'A1',
            },
        },
        {
            name: 'story-item-pub-listing',
            title: __('Pub Listing Story Item'),
            attributes: {
                className: 'is-style-left',
                imageSlot: 'left',
                imageSize: 'A3',
            },
        },
    ],
    transforms,
    deprecated: [
        {
            attributes: {
                title: {
                    type: 'string',
                },
                excerpt: {
                    type: 'string',
                    source: 'html',
                    multiline: 'p',
                    default: '<p>Excerpt</p>',
                },
                extra: {
                    type: 'string',
                    source: 'html',
                    multiline: 'li',
                },
                link: {
                    type: 'string',
                },
                label: {
                    type: 'string',
                    default: 'Report',
                },
                date: {
                    type: 'string',
                },
                // Images
                image: {
                    type: 'string',
                    default: '',
                },
                imageSlot: {
                    type: 'string',
                    default: 'default',
                },
                imageSize: {
                    type: 'string',
                    default: 'A1',
                },
                isChartArt: {
                    type: 'boolean',
                    default: false,
                },
                postID: {
                    type: 'integer',
                },
                headerSize: {
                    type: 'integer',
                    default: 2,
                },
                enableAltHeaderWeight: {
                    type: 'boolean',
                    default: false,
                },
                enableEmphasis: {
                    type: 'boolean',
                    default: false,
                },
                enableHeader: {
                    type: 'boolean',
                    default: true,
                },
                enableExcerpt: {
                    type: 'boolean',
                    default: true,
                },
                enableExcerptBelow: {
                    type: 'boolean',
                    default: false,
                },
                enableExtra: {
                    type: 'boolean',
                    default: false,
                },
                enableBreakingNews: {
                    type: 'boolean',
                    default: false,
                },
                enableAltTaxonomy: {
                    type: 'boolean',
                    default: false,
                },
                enableMeta: {
                    type: 'boolean',
                    default: true,
                },
                inLoop: {
                    type: 'boolean',
                    default: false,
                },
                isPreview: {
                    type: 'boolean',
                    default: false,
                },
                isTransformed: {
                    type: 'boolean',
                    default: false,
                },
            },
 
            migrate( { excerpt, postID } ) {
                return {
                    description: excerpt,
                    postId: postID
                };
            },
 
            save( { attributes } ) {
                return <save attributes={attributes}/>
            },
        },
    ],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
