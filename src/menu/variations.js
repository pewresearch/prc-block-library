/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'horizontal',
		isDefault: true,
		title: __( 'PRC Menu (horizontal)' ),
		description: __( 'A horizontal menu, all items will be displayed in a row.' ),
		attributes: { orientation: 'horizontal' },
		scope: [ 'inserter', 'transform' ],
	},
	{
		name: 'vertical',
		title: __( 'PRC Vertical (vertical)' ),
		description: __( 'A vertical menu, all items will be displayed in a column.' ),
		attributes: { orientation: 'vertical' },
		scope: [ 'inserter', 'transform' ],
	},
];

export default variations;
