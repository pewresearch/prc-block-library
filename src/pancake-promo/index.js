//  Import CSS
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { registerBlockType } from '@wordpress/blocks';
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

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
		content: {
			type: 'string',
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
		console.log('edit');
		console.log(props);
		return(
			<div className={props.className}>
			<svg id="election_icon" width="74" height="57" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.98906 10.4812C2.68139 10.4812 0 13.1788 0 16.5065V34.6553C0 37.983 2.68139 40.6806 5.98905 40.6806H11.1692L8.36363 56.6748L29.8727 40.6806H35.4756C38.7832 40.6806 41.4646 37.983 41.4646 34.6553V16.5065C41.4646 13.1788 38.7832 10.4812 35.4756 10.4812H5.98906Z" fill="#3178A7"/>
				<path d="M67.5087 0C70.8164 0 73.4978 2.69763 73.4978 6.02532V24.1741C73.4978 27.5018 70.8164 30.1994 67.5087 30.1994H62.3286L65.1341 46.1936L43.6251 30.1994H38.0222C34.7145 30.1994 32.0331 27.5018 32.0331 24.1741V6.02532C32.0331 2.69763 34.7145 0 38.0222 0H67.5087Z" fill="#DA571F"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M41.4646 30.1993H38.0225C34.7148 30.1993 32.0334 27.5017 32.0334 24.174V10.4814H35.4756C38.7832 10.4814 41.4646 13.1791 41.4646 16.5068V30.1993Z" fill="#6B3635"/>
				<path d="M52.4212 4.79321L54.8808 12.3632L62.8403 12.3632L56.4009 17.0417L58.8605 24.6116L52.4212 19.9331L45.9818 24.6116L48.4414 17.0417L42.002 12.3632L49.9615 12.3632L52.4212 4.79321Z" fill="white"/>
				<path d="M20.7323 14.9265L23.1919 22.4965L31.1514 22.4965L24.712 27.175L27.1717 34.7449L20.7323 30.0664L14.2929 34.7449L16.7525 27.175L10.3131 22.4965L18.2727 22.4965L20.7323 14.9265Z" fill="white"/>
			</svg>
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
		console.log('save');
		console.log(props);
		return (
			<div className={props.className}>
				<svg id="election_icon" width="74" height="57" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5.98906 10.4812C2.68139 10.4812 0 13.1788 0 16.5065V34.6553C0 37.983 2.68139 40.6806 5.98905 40.6806H11.1692L8.36363 56.6748L29.8727 40.6806H35.4756C38.7832 40.6806 41.4646 37.983 41.4646 34.6553V16.5065C41.4646 13.1788 38.7832 10.4812 35.4756 10.4812H5.98906Z" fill="#3178A7"/>
					<path d="M67.5087 0C70.8164 0 73.4978 2.69763 73.4978 6.02532V24.1741C73.4978 27.5018 70.8164 30.1994 67.5087 30.1994H62.3286L65.1341 46.1936L43.6251 30.1994H38.0222C34.7145 30.1994 32.0331 27.5018 32.0331 24.1741V6.02532C32.0331 2.69763 34.7145 0 38.0222 0H67.5087Z" fill="#DA571F"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M41.4646 30.1993H38.0225C34.7148 30.1993 32.0334 27.5017 32.0334 24.174V10.4814H35.4756C38.7832 10.4814 41.4646 13.1791 41.4646 16.5068V30.1993Z" fill="#6B3635"/>
					<path d="M52.4212 4.79321L54.8808 12.3632L62.8403 12.3632L56.4009 17.0417L58.8605 24.6116L52.4212 19.9331L45.9818 24.6116L48.4414 17.0417L42.002 12.3632L49.9615 12.3632L52.4212 4.79321Z" fill="white"/>
					<path d="M20.7323 14.9265L23.1919 22.4965L31.1514 22.4965L24.712 27.175L27.1717 34.7449L20.7323 30.0664L14.2929 34.7449L16.7525 27.175L10.3131 22.4965L18.2727 22.4965L20.7323 14.9265Z" fill="white"/>
				</svg>
				<RichText.Content tagName="div" value={ props.attributes.content } className='sans-serif'/>
			</div>
		);
	},
} );
