/**
 * BLOCK: prc-posts-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import PostsList from './component';

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
registerBlockType( 'prc-block/posts', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Posts Block (Fact Tank Widget)' ), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [
		__( 'prc' ),
		__( 'fact tank' ),
		__( 'posts listing' ),
		__( 'posts' ),
		__( 'posts widget' ),
	],
	styles: [
		{
			name: 'default',
			label: 'Default',
			isDefault: true,
		},
		{
			name: 'fact-tank',
			label: 'Fact Tank',
		},
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		title: {
			type: 'string',
			default: 'Test Title',
		},
		post_type: {
			type: 'string',
			default: 'post',
		},
		isFactTank: {
			type: 'boolean',
			default: false,
		},
		posts: {
			type: 'array',
			default: false,
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
	edit: ( props ) => {
		console.log(props.attributes);
		if ( 'is-style-fact-tank' === props.attributes.className ) {
			props.setAttributes({ isFactTank: true });
		} else if ( 'is-style-default' === props.attributes.className ) {
			props.setAttributes({ isFactTank: false });
		}
		const data = props.attributes;
		if ( props.isSelected ) {
			data.edit = {
				setAttributes: props.setAttributes
			}
		}
		return(
			<PostsList {...data}/>
		)
	},
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
		const data = props.attributes;
		return (
			<PostsList {...data}/>
		);
	},
} );
