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
		link: {
			type: 'string',
			default: 'https://www.pewresearch.org/post',
		},
		title: {
			type: 'string',
			default: 'TITLE',
		},
		date: {
			type: 'string',
			default: 'Jan 01, 2020',
		},
		label: {
			type: 'string',
			default: 'Report',
		},
		excerpt: {
			type: 'string',
			default: 'EXCERPT',
		},
		extra: {
			type: 'string',
			default: '',
		},
		image: {
			type: 'string',
			default: '',
		},
		// Options
		emphasis: {
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
		isChartArt: {
			type: 'boolean',
			default: false,
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
		if ( 'is-style-default' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'default', horizontal: false, stacked: true});
		}
		if ( 'is-style-top' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'top', horizontal: false, stacked: true});
		}
		if ( 'is-style-bottom' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'bottom', horizontal: false, stacked: true});
		}
		if ( 'is-style-left' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'left', horizontal: true, stacked: false});
		}
		if ( 'is-style-right' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'right', horizontal: true, stacked: false});
		}
		if ( 'is-style-disabled' === props.attributes.className ) {
			props.setAttributes({imageSlot: 'disabled', horizontal: false, stacked: true});
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
				desktop: props.attributes.image,
				mobile: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				stacked: props.attributes.stacked,
				horizontal: props.attributes.horizontal,
				emphasis: props.attributes.emphasis,
				disableHeader: props.attributes.disableHeader,
				disableExcerpt: props.attributes.disableExcerpt,
				headerSize: props.attributes.headerSize,
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
				desktop: props.attributes.image,
				mobile: props.attributes.image,
				isChartArt: props.attributes.isChartArt,
			},
			options: {
				stacked: props.attributes.stacked,
				horizontal: props.attributes.horizontal,
				emphasis: props.attributes.emphasis,
				disableHeader: props.attributes.disableHeader,
				disableExcerpt: props.attributes.disableExcerpt,
				headerSize: props.attributes.headerSize,
			},
			classNames: props.attributes.className,
		};
		return (
			<StoryItem {...data}/>
		);
	},
} );
