import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ToggleControl, TextControl, SelectControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

import PostsList from './component';

class EditSidebar extends Component {
	constructor(props) {
		super(props);
		this.getPosts = this.getPosts.bind(this);
	}

	componentDidMount = () => {
		this.getPosts(this.props.attributes.per_page, this.props.attributes.format);
	}

	getPosts = (perPage, format) => {
		console.info('Getting Posts');

		const formatDate = function( dateString ) {
			return moment(dateString).format("MMM D, YYYY");
		}

		const setAttributes = this.props.setAttributes;
		const collection = new wp.api.collections.Stub();
	
		let data = [];
		let formats = [ Number(format) ];
		perPage = Number(perPage);

		collection.fetch( { data: { 'per_page': perPage, 'formats': formats } } ).then( ( posts ) => {
			console.log(posts);
			for ( let index = 0; index < posts.length; index++ ) {
				data.push({
					title: posts[index].title.rendered,
					date: formatDate(posts[index].date),
					link: posts[index].link,
				});
			}
			setAttributes({ posts: data });
		});
	}

	render = () => {
		const setAttributes = this.props.setAttributes;
		return(
			<InspectorControls>
				<PanelBody title={ __( 'Posts Block Options' ) }>
					<TextControl
						label="Number of Posts"
						value={ Number(this.props.attributes.per_page) }
						onChange={ ( per_page ) => { 
							setAttributes( { per_page: Number(per_page) } );
							this.getPosts(per_page, this.props.attributes.format); 
						} }
					/>
					<SelectControl
						label="Format"
						value={ this.props.attributes.format }
						options={ [
							{ label: 'Report', value: 10818957 },
							{ label: 'Feature', value: 10818948 },
							{ label: 'Fact Tank', value: 10818955 },
						] }
						onChange={ ( format ) => { 
							setAttributes( { format: Number(format) } );
							this.getPosts(this.props.attributes.per_page, format);
						} }
					/>
				</PanelBody>
			</InspectorControls>
		)
	}
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
registerBlockType( 'prc-block/posts', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Posts Block' ), // Block title.
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
		{
			name: 'publication-listing',
			label: 'Publication Listing',
		},
		{
			name: '3-column-lede',
			label: 'Three Column Lede',
		}
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		title: {
			type: 'string',
			default: 'Title',
		},
		format: {
			type: 'integer',
			default: 10818957,
		},
		program: {
			type: 'string',
			default: '',
		},
		per_page: {
			type: 'interger',
			default: 10,
		},
		static: {
			type: 'boolean',
			default: true,
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
		if ( true === props.isSelected ) {
			props.attributes.setAttributes = props.setAttributes;
		}
		return(
			<Fragment>
				{ true === props.isSelected && (
					<EditSidebar {...props}/>
				) }
				<PostsList {...props.attributes}/>
			</Fragment>
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
		return (
			<PostsList {...props.attributes}/>
		);
	},
} );
