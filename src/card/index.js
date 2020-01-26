/**
 * BLOCK: prc-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
// Our front end styles are included in our theme

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ColorPalette, ToggleControl } = wp.components;

import Card from './component';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'prc-block/card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card' ), // Block title.
	icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'prc' ),
		__( 'card' ),
		__( 'baseball card' ),
		__( 'packaged card' ),
	],
	styles: [
		{
			name: 'default',
			label: 'Basic (Baseball Card)',
			isDefault: true,
		},
		{
			name: 'borderless',
			label: 'Basic Borderless',
		},
		{
			name: 'oatmeal',
			label: 'Oatmeal (Borderless)',
		},
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		link: {
			type: 'string',
			default: '{https://www.pewresearch.org/page}',
		},
		linkLabel: {
			type: 'string',
			default: 'Read More',
		},
		title: {
			type: 'string',
			default: '{Card Title}',
		},
		excerpt: {
			type: 'html',
			default: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p><p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
		},
		image: {
			type: 'string',
			default: '',
		},
		backgroundColor: {
			type: 'string',
			default: '#fff',
		},
		disableBorder: {
			type: 'boolean',
			defaul: false,
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		if ( 'is-style-default' === props.attributes.className ) {
			props.setAttributes({backgroundColor: '#fff', disableBorder: false});
		}
		if ( 'is-style-borderless' === props.attributes.className ) {
			props.setAttributes({disableBorder: true});
		}
		if ( 'is-style-oatmeal' === props.attributes.className ) {
			props.setAttributes({backgroundColor: '#f8f9f5', disableBorder: true});
		}

		let data = props.attributes;
		data.edit = {
			enabled: false,
			display: false,
			setAttributes: props.setAttributes,
		}
		if ( true === props.isSelected ) {
			data.edit.enabled = true;
		}
		
		return(
			<div style={{maxWidth: '400px'}}>
				<Card {...data}/>
			</div>
		)
	},

	// Seth Learning Note: SO save literally only transforms on post_content filter. You won't see this result inside the gutenberg editor, you will however see it if you look at code view.
	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		let data = props.attributes;
		data.edit = {
			enabled: false,
			display: true,
			setAttributes: props.setAttributes,
		};
		return (
			<Card {...data}/>
		);
	},
} );
