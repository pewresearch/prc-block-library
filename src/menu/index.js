/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { navigation as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';

const { name } = metadata;

const settings = {
	title: __( 'Navigation' ),
	icon,
	description: __(
		'A collection of blocks that allow visitors to get around your site.'
	),
	keywords: [ __( 'menu' ), __( 'navigation' ), __( 'links' ) ],
	variations,
	example: {
		innerBlocks: [
			{
				name: 'prc-block/menu-link',
				attributes: {
					// translators: 'Home' as in a website's home page.
					label: __( 'Home' ),
					url: 'https://make.wordpress.org/',
				},
			},
			{
				name: 'prc-block/menu-link',
				attributes: {
					// translators: 'About' as in a website's about page.
					label: __( 'About' ),
					url: 'https://make.wordpress.org/',
				},
			},
			{
				name: 'prc-block/menu-link',
				attributes: {
					// translators: 'Contact' as in a website's contact page.
					label: __( 'Contact' ),
					url: 'https://make.wordpress.org/',
				},
			},
		],
	},
	edit,
	save,
};
console.log("PRC MENU SETTINGS", {...metadata, ...settings});
registerBlockType( name, {...metadata, ...settings});