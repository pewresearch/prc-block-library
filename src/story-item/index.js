/**
 * WordPress Dependencies
 */
import * as moment from 'moment';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import deprecated from './deprecated';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
	example: {
		attributes: {
			title: 'Ultricies Ipsum Nibh Egestas Purus',
			excerpt:
				'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
			label: 'Report',
			date: moment().format('MM-DD-YYYY'), // Set the current date.
			image:
				'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
			imageSlot: 'top',
			imageSize: 'A2',
			isPreview: true,
		},
	},
	deprecated,
	variations,
	supports: {
		color: {
			text: true,
			background: false,
		},
		typography: {
			fontSize: true,
		},
	},
	__experimentalLabel: ({ title }) => title || 'Story Item',
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
