/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { date as formatDate } from '@wordpress/date';

/**
 * Internal Dependencies
 */
// import deprecated from './deprecated';
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
			date: formatDate('M j, Y'), // Set the current date.
			image:
				'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
			imageSlot: 'top',
			imageSize: 'A2',
			isPreview: true,
			postId: 0,
		},
	},
	// deprecated,
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
	__experimentalLabel: ({ title }) => title || 'Story Item', // Will change the label to match the title, #experimental.
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
