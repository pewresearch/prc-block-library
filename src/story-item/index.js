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
	edit,
	save,
};

registerBlockType( name, {...metadata, ...settings});