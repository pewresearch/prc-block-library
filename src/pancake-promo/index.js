//  Import CSS
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import electionIconURL, { ReactComponent as electionSVG } from "./election-icon.svg"; 

const ElectionIcon = ({svg, sizeInPX}) => {
	// Go ahead and sanitize the output here instead of waiting for WP to do it, otherwise you'll get a diff error.
	return(
		<img src={svg} width={sizeInPX} height={sizeInPX}/>
	)
}

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
registerBlockType( 'prc-block/promo-pancake', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pancake Promo' ), // Block title.
	icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'prc' ),
		__( 'ad' ),
		__( 'promo' ),
		__( 'pancake' ),
	],
	styles: [
		{
			name: 'oatmeal',
			label: 'Oatmeal',
			isDefault: true,
		},
		{
			name: 'white',
			label: 'White',
		},
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		icon_url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
			default: electionIconURL,
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.sans-serif',
			default: 'EMPTY TEXT',
		},
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
		return(
			<div className={props.className}>
				<ElectionIcon svg={props.attributes.icon_url} sizeInPX='45'/>
				<RichText
					tagName="div" // The tag here is the element output and editable in the admin
					value={ props.attributes.content } // Any existing content, either from the database or an attribute default
					onChange={ ( content ) => props.setAttributes( { content } ) } // Store updated content as a block attribute
					placeholder={ props.attributes.content } // Display this text before any content has been added by the user
					className='sans-serif'
				/>
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
		console.log(props);
		return (
			<div className={props.className}>
				<ElectionIcon svg={props.attributes.icon_url} sizeInPX='45'/>
				<RichText.Content tagName="div" value={ props.attributes.content } className='sans-serif'/>
			</div>
		);
	},
} );
