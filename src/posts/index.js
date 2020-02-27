import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl, SelectControl, ColorPalette } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

import getPosts from '../_shared/get-posts';
import getTerms from '../_shared/get-terms';

import PostsList from './styles/list';
import FactTankList from './styles/fact-tank';
import PostsColumns from './styles/columns';

class EditSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formats: false,
			formatsRaw: false,
			programs: false,
			programsRaw: false,
		}
		this.setState = this.setState.bind(this);
	}

	componentDidMount = () => {
		const setState = this.setState;
		const setAttributes = this.props.setAttributes;

		// Build Select Fields Data:
		getTerms('Formats').then((data)=>{
			let formatOptions = [];

			for (let termID in data) {
				// skip loop if the property is from prototype
				if (!data.hasOwnProperty(termID)) continue;
			
				let termObj = data[termID];
				formatOptions.push({
					value: termObj.id,
					label: termObj.name,
				});
			}

			setState({ formatsRaw: data, formats: formatOptions });
		});
		
		getTerms('Programs').then((data)=>{
			let programOptions = [];

			data[0] = {
				id: 0,
				name: 'All',
				slug: 'all',
			}

			for (let termID in data) {
				// skip loop if the property is from prototype
				if (!data.hasOwnProperty(termID)) continue;
			
				let termObj = data[termID];
				programOptions.push({
					value: termObj.id,
					label: termObj.name,
				});
			}

			setState({ programsRaw: data, programs: programOptions });
		});

		// Initial Fetch Posts:
		if ( false === this.props.attributes.posts ) {
			getPosts(this.props.attributes.per_page, this.props.attributes.format, this.props.attributes.program, this.props.attributes.taxonomyToDisplay, true).then( (posts) => {
				setAttributes({posts});
			});
			if ( true === this.props.className.includes('is-style-fact-tank') ) {
				setAttributes({format: 10818955});
				getPosts(this.props.attributes.per_page, this.props.attributes.format, 10818955, this.props.attributes.taxonomyToDisplay, true).then( (posts) => {
					setAttributes({posts});
				});
			}
		}
	}

	// Insert a story block as a column 
	insertStoryBlock = (blockClientID, item, index) => {
		console.log('Insert Story Block');

		const parentID = window.wp.data.select('core/block-editor').getBlockHierarchyRootClientId( clientID );
		const parentBlockOrder = window.wp.data.select('core/block-editor').getBlockOrder(parentID);
		const parentBlock = window.wp.data.select('core/block-editor').getBlock(parentBlockOrder[1]);

		console.log(parentBlockOrder[1]);
		console.log(parentBlock);
		console.log(parentID);
		
		let block = window.wp.blocks.createBlock( 'prc-block/story-item', {
			title: item.title,
			image: item.image,
			excerpt: item.excerpt,
			link: item.link,
			label: item.label,
			date: item.date,
			extra: '',
			// Post Meta Data:
			postID: item.id,
			// Item Options
			emphasis: false,
			isChartArt: false,
			imageSlot: 'top',
			horizontal: false,
			stacked: true,
			enableHeader: true,
			enableExcerpt: false,
			enableExtra: false,
			enableProgramsTaxonomy: false,
			headerSize: 'normal',
		} );

		window.wp.data.dispatch('core/block-editor').insertBlocks(block, index, blockClientID);
	}

	render = () => {
		const setAttributes = this.props.setAttributes;
		const backgrounds = [
			{ name: 'White', color: '#fff' },
			{ name: 'Oatmeal', color: '#f8f9f5' },
		];
		// If the style is fact-tank then the format should be set to fact-tank
		return(
			<InspectorControls>
				<PanelBody title={ __( 'Posts Block Options' ) }>
					<TextControl
						label="Title"
						value={ this.props.attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
					/>
					<TextControl
						label="Number of Posts"
						value={ Number(this.props.attributes.per_page) }
						onChange={ ( per_page ) => { 
							setAttributes( { per_page: Number(per_page) } );
							getPosts(per_page, this.props.attributes.formatID, this.props.attributes.programID, this.props.attributes.taxonomyToDisplay, true).then( (posts) => {
								setAttributes({posts});
							});
						} }
					/>
					<SelectControl
						label="Format"
						value={ this.props.attributes.formatID }
						options={ this.state.formats }
						onChange={ ( format ) => { 
							let f = this.state.formatsRaw[Number(format)];
							setAttributes( { formatID: f.id, formatSlug: f.slug, format: f.name } );
							getPosts(this.props.attributes.per_page, f.id, this.props.attributes.programID, this.props.attributes.taxonomyToDisplay, true).then( (posts) => {
								setAttributes({posts});
							});
						} }
					/>
					<SelectControl
						label="Research Program"
						value={ this.props.attributes.programID }
						options={ this.state.programs }
						onChange={ ( program ) => {
							let p = this.state.programsRaw[Number(program)];
							setAttributes( { programID: p.id, programSlug: p.slug, program: p.name } );
							getPosts(this.props.attributes.per_page, this.props.attributes.formatID, p.id, this.props.attributes.taxonomyToDisplay, true).then( (posts) => {
								setAttributes({posts});
							});
						} }
					/>
					<SelectControl
						label="Label Taxonomy"
						value={ this.props.attributes.taxonomyToDisplay }
						options={ [
							{ label: 'Formats', value: 'formats' },
							{ label: 'Programs', value: 'programs' },
						] }
						onChange={ ( taxonomyToDisplay ) => { 
							setAttributes( { taxonomyToDisplay } );
							getPosts(this.props.attributes.per_page, this.props.attributes.formatID, this.props.attributes.programID, taxonomyToDisplay, true).then( (posts) => {
								setAttributes({posts});
							});
						} }
					/>
					<ToggleControl
						label="Dynamic Mode"
						help={ this.props.attributes.dynamic ? 'Updates posts in real time, every 5 minutes.' : 'Posts are saved statically (will not update in real time).' }
						checked={ this.props.attributes.dynamic }
						onChange={ () => setAttributes({ dynamic: ! this.props.attributes.dynamic }) }
					/>
					<strong>Background Color:</strong><br/>
					<ColorPalette
						colors={ backgrounds }
						value={ this.props.attributes.backgroundColor }
						onChange={ ( color ) => setAttributes( { backgroundColor: color } ) }
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
			name: 'columns',
			label: 'Columns',
		},
		// {
		// 	name: 'publication-listing',
		// 	label: 'Publication Listing',
		// },
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
		moreLink: {
			type: 'string',
			default: '',
		},
		formatID: {
			type: 'integer',
			default: 10818957, // Report
		},
		formatSlug: {
			type: 'string',
			default: 'report',
		},
		format: {
			type: 'string',
			default: 'Report',
		},
		programID: {
			type: 'integer',
			default: 0, // All
		},
		programSlug: {
			type: 'string',
			default: '',
		},
		program: {
			type: 'string',
			default: '',
		},
		per_page: {
			type: 'integer',
			default: 5,
		},
		backgroundColor: {
			tyle: 'string',
			default: '#fff',
		},
		// If static is true then we should output on save only a holder div that would contain the options and the style template to use and then the frontend loader will load the posts. This mean will be 
		dynamic: {
			type: 'boolean',
			default: false,
		},
		taxonomyToDisplay: {
			type: 'string',
			default: 'formats',
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
		let style = props.attributes.className;
		let isFactTank = false;
		if ( undefined !== style && style.includes('is-style-fact-tank') ) {
			isFactTank = true;
		}
		let isList = false;
		if ( undefined === style || style.includes('is-style-list') ) {
			isList = true;
		}
		let isColumns = false;
		if ( undefined !== style && style.includes('is-style-columns') ) {
			isColumns = true;
		}
		data.className = style;

		if ( true === props.isSelected ) {
			data.setAttributes = props.setAttributes;
		}

		data.clientID = props.clientId;

		data.disableLink = true; // While editing we do not want users to accidentally click on a post.
		return(
			<Fragment>
				{ true === props.isSelected && (
					<EditSidebar {...props}/>
				) }
				<div className={data.className}>
					{ true === isFactTank && (
						<FactTankList {...data}/>
					) }
					{ true === isList && (
						<PostsList {...data}/>
					) }
					{ true === isColumns && (
						<PostsColumns {...data}/>
					) }
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

		let style = props.attributes.className;
		let isFactTank = false;
		if ( undefined !== style && style.includes('is-style-fact-tank') ) {
			isFactTank = true;
		}
		let isList = false;
		if ( undefined !== style && style.includes('is-style-list') ) {
			isList = true;
		}
		let isColumns = false;
		if ( undefined !== style && style.includes('is-style-columns') ) {
			isColumns = true;
		}
		data.className = style;

		data.disableLink = false;
		return (
			<div className={data.className}>
				{ true !== props.attributes.dynamic && true === isFactTank && (
					<FactTankList {...data}/>
				) }
				{ true !== props.attributes.dynamic && true === isList && (
					<PostsList {...data}/>
				) }
				{ true !== props.attributes.dynamic && true === isColumns && (
					<PostsColumns {...data}/>
				) }
				{ true === props.attributes.dynamic && (
					<div className='js-react-posts-block'
						data-title={props.attributes.title}
						data-format={props.attributes.format}
						data-format-id={props.attributes.formatID}
						data-format-slug={props.attributes.formatSlug}
						data-program={props.attributes.program}
						data-program-id={props.attributes.programID}
						data-program-slug={props.attributes.programSlug}
						data-number={props.attributes.per_page}
						data-background={props.attributes.backgroundColor}
						data-style={style}
					/>
				) }
			</div>
		);
	},
} );
