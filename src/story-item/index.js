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
import deprecated from './deprecated';
import transforms from './transforms';

const { name } = metadata;

const settings = {
	title: __( 'Story Item' ),
	icon: 'format-aside',
	description: __('A story item is a visual display of a post, usually referencing a stub post.'),
	keywords: [__('prc'), __('story'), __('post'), __('story item')],
	example: {
        attributes: {
            title: 'Ultricies Ipsum Nibh Egestas Purus',
            excerpt: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
            extra: '<li></li>',
            link: '#',
            label: 'Report',
            date: moment().format('MM-DD-YYYY'),
            image: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
            imageSlot: 'top',
            imageSize: 'A2',
        },
    },
    transforms,
    variations: [
        {
            name: 'story-item-default',
            isDefault: true,
            title: __( 'Story Item' ),
            description: __( 'The default story item' ),
            attributes: { 
                imageSlot: 'default',
                imageSize: 'A1'
             },
        },
        {
            name: 'story-item-pub-listing',
            title: __( 'Pub Listing Story Item' ),
            attributes: {
                className: 'is-style-left',
                imageSlot: 'left',
                imageSize: 'A3'
             },
        },
        // Legacy variations to be removed after the new homepage launch
        {
            name: 'story-item-homepage-small',
            title: __( 'Homepage Story Item (Small)' ),
            attributes: {
                imageSize: 'legacy-260-173'
             },
        },
        {
            name: 'story-item-homepage-large',
            title: __( 'Homepage Story Item (Large)' ),
            attributes: {
                className: 'is-style-right',
                headerSize: 1,
                enableEmphasis: true,
                imageSlot: 'right',
                imageSize: 'legacy-260'
             },
        },
    ],
	edit,
    save,
    deprecated,
};

registerBlockType( name, {...metadata, ...settings});