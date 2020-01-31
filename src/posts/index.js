import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ToggleControl, TextControl, SelectControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

import PostsList from './styles/list';

class EditSidebar extends Component {
	constructor(props) {
		super(props);
		this.getPosts = this.getPosts.bind(this);
	}

	componentDidMount = () => {
		this.getPosts(this.props.attributes.per_page, this.props.attributes.format);
	}

	getPosts = (perPage, format, program) => {
		const formatDate = function( dateString ) {
			return moment(dateString).format("MMM D, YYYY");
		}
		const setAttributes = this.props.setAttributes;
		const collection = new wp.api.collections.Stub();

		let args = { 'per_page': Number(perPage), 'formats': [ Number(format) ] };
		if ( 0 !== program ) {
			args.programs = Number(program);
		}
		let data = [];

		collection.fetch( { data: args } ).then( ( posts ) => {
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
		console.log('edit sidebar');
		console.log(this.props);
		const setAttributes = this.props.setAttributes;
		// If the style is fact-tank then the format should be set to fact-tank
		if ( "wp-block-prc-block-posts is-style-fact-tank" === this.props.className ) {
			setAttributes({format: 10818955});
			this.getPosts(this.props.attributes.per_page, 10818955, this.props.attributes.program); 
		}
		return(
			<InspectorControls>
				<PanelBody title={ __( 'Posts Block Options' ) }>
					<TextControl
						label="Number of Posts"
						value={ Number(this.props.attributes.per_page) }
						onChange={ ( per_page ) => { 
							setAttributes( { per_page: Number(per_page) } );
							this.getPosts(per_page, this.props.attributes.format, this.props.attributes.program); 
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
							this.getPosts(this.props.attributes.per_page, format, this.props.attributes.program);
						} }
					/>
					<SelectControl
						label="Research Program"
						value={ this.props.attributes.program }
						options={ [
							{ label: 'All Programs', value: 0 },
							{ label: 'Global', value: 10818960 },
							{ label: 'Internet', value: 10818962 },
							{ label: 'Religion', value: 10818963 },
							{ label: 'Journalism', value: 10818964 },
						] }
						onChange={ ( program ) => { 
							setAttributes( { program: Number(program) } );
							this.getPosts(this.props.attributes.per_page, this.props.attributes.format, program);
						} }
					/>
					{ "wp-block-prc-block-posts is-style-columns" === this.props.className && (
						<TextControl
							label="Column Count"
							value={ Number(this.props.attributes.columns) }
							onChange={ ( columns ) => { 
								setAttributes( { columns } );
							} }
						/>
					) }
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
		__( 'publication listing' ),
	],
	styles: [
		{
			name: 'list',
			label: 'Simple List',
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
			name: '4-story-lede',
			label: '4 Story Lede',
		},
		{
			name: 'columns',
			label: 'Columns',
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
			default: 10818957, // Report
		},
		program: {
			type: 'integer',
			default: 0,
		},
		per_page: {
			type: 'integer',
			default: 10,
		},
		// If static is true then we should output on save only a holder div that would contain the options and the style template to use and then the frontend loader will load the posts. This mean will be 
		static: {
			type: 'boolean',
			default: true,
		},
		columns: {
			type: 'string',
			default: '5',
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
		const data = props.attributes;
		data.className = props.className;
		if ( true === props.isSelected ) {
			data.setAttributes = props.setAttributes;
		}
		data.disableLink = true;
		return(
			<Fragment>
				{ true === props.isSelected && (
					<EditSidebar {...props}/>
				) }
				<div className={data.className}>
					<PostsList {...data}/>
				</div>
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
		const data = props.attributes;
		data.className = props.className;
		data.disableLink = false;
		return (
			<div className={data.className}>
				<PostsList {...data}/>
			</div>
		);
	},
} );
