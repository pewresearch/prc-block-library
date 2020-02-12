/**
 * BLOCK: prc-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
// Our front end styles are included in our theme

import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import * as moment from 'moment';
import StoryItem from './component';

const todaysDate = () => {
	return moment().format("MMM D, YYYY");
}

class EditSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
		}
		this.setPostByURL = this.setPostByURL.bind(this);
	}

	componentDidMount = () => {
		this.setState({url: this.props.link});
	}

	/**
	 * Loading Posts
	 */
	setPostByURL = () => {
		console.log('GetPostByURL: ' + this.props.link);
		console.log(this.props);
		const setAttributes = this.props.setAttributes;
		let url = this.props.link;

		const getSiteIDFromURL = (url) => {
			let siteID = 1;
			if ( url.includes('https://www.pewresearch.org/global/' ) || url.includes('https://www.pewglobal.org/' ) ) {
				siteID = 2;
			} else if ( url.includes('https://www.pewresearch.org/hispanic/' ) || url.includes('https://www.pewhispanic.org/' ) ) {
				siteID = 5;
			} else if ( url.includes('https://www.pewresearch.org/science/' ) ) {
				siteID = 16;
			} else if ( url.includes('https://www.pewresearch.org/methods/' ) ) {
				siteID = 10;
			} else if ( url.includes('https://www.people-press.org/' ) ) {
				siteID = 4;
			} else if ( url.includes('https://www.pewforum.org/' ) ) {
				siteID = 7;
			} else if ( url.includes('https://www.journalism.org/' ) ) {
				siteID = 8;
			} else if ( url.includes('https://www.pewsocialtrends.org/' ) ) {
				siteID = 3;
			} else if ( url.includes('https://www.pewresearch.org/internet/' || url.includes('https://www.pewinternet.org/' ) ) ) {
				siteID = 9;
			} else if ( url.includes('https://www.pewresearch.org/' ) ) {
				siteID = 1;
			}
			return siteID;
		}

		if ( undefined === setAttributes || undefined === url ) {
			return;
		}

		apiFetch( { path: '/prc-api/v2/blocks/helpers/get-post-by-url/?url=' + url + '&siteID=' + getSiteIDFromURL(url) } ).then( post => {
			console.info('Post Returned:');
			console.log(post);
			if ( false !== post ) {
				setAttributes({
					title: post.title,
					image: post.image,
					excerpt: post.excerpt,
					link: post.link,
					label: post.label,
					date: post.date,
					postID: post.id,
					extra: '', // We want to clear extra when pulling a new post
				});
			}
        } );
	} 

	render = () => {
		const setAttributes = this.props.setAttributes;
		return(
			<InspectorControls>
				<PanelBody title={ __( 'Story Item Options' ) }>
					<div>
						<TextControl
							label="Post ID"
							value={ this.props.postID }
							disabled
						/>
					</div>
					<div className='story-item-link'>
						<div>
							<TextControl
								label="Link"
								value={ this.props.link }
								onChange={ ( link ) => setAttributes({link}) }
							/>
						</div>
						<div>
							<Button onClick={this.setPostByURL} isPrimary>Fetch</Button>
						</div>
					</div>
					<p><strong>Content Options:</strong></p>
					<div>
						<ToggleControl
							label={ this.props.options.enableHeader ? 'Header Enabled' : 'Header Disabled' }
							checked={ this.props.options.enableHeader }
							onChange={ (value) => { setAttributes({ enableHeader: value }); } }
						/>
					</div>
					<div>
						<ToggleControl
							label={ this.props.options.enableExcerpt ? 'Excerpt Enabled' : 'Excerpt Disabled' }
							checked={ this.props.options.enableExcerpt }
							onChange={ (value) => { setAttributes({ enableExcerpt: value }); } }
						/>
					</div>
					<div>
						<ToggleControl
							label={ this.props.options.enableExtra ? 'Extras Enabled' : 'Extras Disabled' }
							checked={ this.props.options.enableExtra }
							onChange={ (value) => { setAttributes({ enableExtra: value }); } }
						/>
					</div>
					<div>
						<ToggleControl
							label={ this.props.options.emphasis ? 'Emphasis Enabled' : 'Emphasis Disabled' }
							checked={ this.props.options.emphasis }
							onChange={ (value) => { setAttributes({ emphasis: value }); } }
						/>
					</div>
					<div>
						<ToggleControl
							label={ this.props.options.taxonomy ? 'Programs' : 'Formats' }
							checked={ this.props.options.taxonomy }
							onChange={ (value) => { 
								setAttributes({ enableProgramsTaxonomy: value });
							} }
						/>
					</div>
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
registerBlockType( 'prc-block/story-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Story Item' ), // Block title.
	icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'prc' ),
		__( 'story' ),
		__( 'post' ),
		__( 'story item' ),
	],
	styles: [
		{
			name: 'disabled',
			label: 'Image Disabled',
		},
		{
			name: 'default',
			label: 'Default Image Alignment',
			isDefault: true,
		},
		{
			name: 'top',
			label: 'Image Aligned Top',
		},
		{
			name: 'bottom',
			label: 'Image Aligned Bottom',
		},
		{
			name: 'left',
			label: 'Image Aligned Left',
		},
		{
			name: 'right',
			label: 'Image Aligned Right',
		}
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		// Item Content
		title: {
			type: 'string',
			default: 'Title',
		},
		image: {
			type: 'string',
			default: '',
		},
		imageID: {
			type: 'string',
			default: '',
		},
		excerpt: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.description',
			default: '<p>Excerpt</p>',
		},
		link: {
			type: 'string',
			default: '',
		},
		label: {
			type: 'string',
			default: 'Report',
		},
		date: {
			type: 'string',
			default: todaysDate(),
		},
		extra: {
			type: 'string',
			source: 'html',
			multiline: 'li',
			selector: '.extra',
			default: '',
		},
		// Post Meta Data:
		postID: {
			type: 'integer',
		},
		// Item Options
		emphasis: {
			type: 'boolean',
			default: false,
		},
		isChartArt: {
			type: 'boolean',
			default: false,
		},
		imageSlot: {
			type: 'string',
			default: 'disabled',
		},
		horizontal: {
			type: 'boolean',
			default: false,
		},
		stacked: {
			type: 'boolean',
			default: true,
		},
		enableHeader: {
			type: 'boolean',
			default: true,
		},
		enableExcerpt: {
			type: 'boolean',
			default: true,
		},
		enableExtra: {
			type: 'boolean',
			default: false,
		},
		enableProgramsTaxonomy: {
			type: 'boolean',
			default: false,
		},
		headerSize: {
			type: 'string',
			default: 'normal',
		},
	},
	// example: {
	// 	attributes: {
	// 		link: 'http://www.pewresearch.org',
	// 		title: 'Anim fugiat incididunt consectetur sunt duis',
	// 		excerpt: 'Ex tempor ut occaecat consequat irure veniam commodo aliqua cupidatat pariatur ad aliquip et. In fugiat Lorem occaecat ex nostrud non incididunt cillum occaecat ex deserunt sit enim ipsum. Sunt elit consectetur quis culpa labore qui pariatur laboris minim incididunt consequat amet.',
	// 		extra: '<a href="#"><strong>Est in cupidatat:</strong> nulla occaecat dolor sint culpa do anim.</a>',
	// 		imageSlot: 'top',
	// 		image: 'https://images.unsplash.com/photo-1555293442-818eb55f7ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3500&q=80',
	// 	},
	// },
	

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
		// Set Image Slot by Style
		if ( 'is-style-default' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'default' });
		} else if ( 'is-style-top' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'top' });
		} else if ( 'is-style-bottom' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'bottom' });
		} else if ( 'is-style-left' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'left' });
		} else if ( 'is-style-right' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'right' });
		} else if ( 'is-style-disabled' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'disabled' });
		}
		
		let data = {
			postID: props.attributes.postID,
			title: props.attributes.title,
			link: props.attributes.link,
			date: props.attributes.date,
			label: props.attributes.label,
			excerpt: props.attributes.excerpt,
			extra: props.attributes.extra,
			image: {
				id: props.attributes.imageID,
				slot: props.attributes.imageSlot,
				src: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				emphasis: props.attributes.emphasis,
				enableHeader: props.attributes.enableHeader,
				enableExcerpt: props.attributes.enableExcerpt,
				enableExtra: props.attributes.enableExtra,
				headerSize: props.attributes.headerSize,
				taxonomy: props.attributes.enableProgramsTaxonomy,
			},
			classNames: props.attributes.className,
		};
		
		if ( true === props.isSelected ) {
			data.editMode = true;
			data.setAttributes = props.setAttributes;
		}
		return(
			<Fragment>
				{ true === props.isSelected && (
					<EditSidebar {...data}/>
				) }
				<StoryItem {...data}/>
			</Fragment>
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
		const data = {
			postID: props.attributes.postID,
			title: props.attributes.title,
			link: props.attributes.link,
			date: props.attributes.date,
			label: props.attributes.label,
			excerpt: props.attributes.excerpt,
			extra: props.attributes.extra,
			image: {
				id: props.attributes.imageID,
				slot: props.attributes.imageSlot,
				src: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				emphasis: props.attributes.emphasis,
				enableHeader: props.attributes.enableHeader,
				enableExcerpt: props.attributes.enableExcerpt,
				enableExtra: props.attributes.enableExtra,
				headerSize: props.attributes.headerSize,
			},
			classNames: props.attributes.className,
		};
		return (
			<StoryItem {...data}/>
		);
	},
} );
