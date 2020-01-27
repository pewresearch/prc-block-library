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
import { registerBlockType } from '@wordpress/blocks';
import StoryItem from './component';

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
		excerpt: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.description',
			default: '<p>Excerpt</p>',
		},
		extra: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.extra',
			default: '',
		},
		// Item Meta
		link: {
			type: 'string',
			default: 'https://www.pewresearch.org/post',
		},
		label: {
			type: 'string',
			default: 'Report',
		},
		date: {
			type: 'string',
			default: 'Jan 01, 2020',
		},
		// Post Meta Data:
		postID: {
			type: 'string',
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
		disableHeader: {
			type: 'boolean',
			default: false,
		},
		disableExcerpt: {
			type: 'boolean',
			default: false,
		},
		headerSize: {
			type: 'string',
			default: 'normal',
		},
	},
	example: {
		attributes: {
			link: 'http://www.pewresearch.org',
			title: 'Anim fugiat incididunt consectetur sunt duis',
			excerpt: 'Ex tempor ut occaecat consequat irure veniam commodo aliqua cupidatat pariatur ad aliquip et. In fugiat Lorem occaecat ex nostrud non incididunt cillum occaecat ex deserunt sit enim ipsum. Sunt elit consectetur quis culpa labore qui pariatur laboris minim incididunt consequat amet.',
			extra: '<a href="#"><strong>Est in cupidatat:</strong> nulla occaecat dolor sint culpa do anim.</a>',
			imageSlot: 'top',
			image: 'https://images.unsplash.com/photo-1555293442-818eb55f7ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3500&q=80',
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
		// Set Image Slot by Style
		if ( 'is-style-default' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'default' });
		}
		if ( 'is-style-top' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'top' });
		}
		if ( 'is-style-bottom' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'bottom' });
		}
		if ( 'is-style-left' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'left' });
		}
		if ( 'is-style-right' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'right' });
		}
		if ( 'is-style-disabled' === props.attributes.className ) {
			props.setAttributes({ imageSlot: 'disabled' });
		}
		
		let data = {
			title: props.attributes.title,
			link: props.attributes.link,
			date: props.attributes.date,
			label: props.attributes.label,
			excerpt: props.attributes.excerpt,
			extra: props.attributes.extra,
			image: {
				slot: props.attributes.imageSlot,
				src: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				emphasis: props.attributes.emphasis,
				disableHeader: props.attributes.disableHeader,
				disableExcerpt: props.attributes.disableExcerpt,
				headerSize: props.attributes.headerSize,
				postID: props.attributes.postID,
			},
			classNames: props.attributes.className,
		};
		
		if ( true === props.isSelected ) {
			data.editMode = true;
			data.setAttributes = props.setAttributes;
		}
		return(
			<StoryItem {...data}/>
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
			title: props.attributes.title,
			link: props.attributes.link,
			date: props.attributes.date,
			label: props.attributes.label,
			excerpt: props.attributes.excerpt,
			extra: props.attributes.extra,
			image: {
				slot: props.attributes.imageSlot,
				src: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				emphasis: props.attributes.emphasis,
				disableHeader: props.attributes.disableHeader,
				disableExcerpt: props.attributes.disableExcerpt,
				headerSize: props.attributes.headerSize,
				postID: props.attributes.postID,
			},
			classNames: props.attributes.className,
		};
		return (
			<StoryItem {...data}/>
		);
	},
} );
