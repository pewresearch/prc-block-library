/**
 * BLOCK: prc-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, CheckboxControl, TextControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

import FollowUs from './component';

class EditSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsletters: []
		}
	}

	componentDidMount = () => {
		// Convert string to array and store in state:
		let data = this.props.attributes.newsletters;
		data = data.split(',');
		this.setState({ newsletters: data });
	}

	updateNewsletters = ( ID ) => {
		let newsletters = this.state.newsletters;

		if ( newsletters.includes(ID) ) {
			// If currently selected then remove "toggle"
			var index = newsletters.indexOf(ID);
			if ( index > -1 ) {
				newsletters.splice(index, 1);
			}
		} else {
			newsletters.push(ID);
		}
		
		// Update the selection of newsletters in the context of the sidebar:
		this.setState({ newsletters });
		// Covnert array to string for data storage:
		this.props.setAttributes({ newsletters: newsletters.join() });
	}

	isNewsletterSelected = ( ID ) => {
		let newsletters = this.state.newsletters;
		if ( newsletters.includes(ID) ) {
			return true;
		} else {
			return false;
		}
	}

	list = () =>{
		const updateNewsletters = this.updateNewsletters;
		const isNewsletterSelected = this.isNewsletterSelected;
		let data = window.prcMailchimpBlock.interests;
		return(
			<ul>
				{ data.map((item, index) => {
					return (
						<li>
							<CheckboxControl
								label={item.label}
								checked={ isNewsletterSelected(item.value) }
								onChange={ () => {
									updateNewsletters(item.value);
								} }
							/>
						</li>
					)
				}) }
			</ul>
		)
	}

	render = () => {
		const List = this.list;
		return(
			<InspectorControls>
				<PanelBody title={ __( 'Follow Us Options' ) }>
					<div>
						<List/>
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
registerBlockType( 'prc-block/follow-us', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Follow Us' ), // Block title.
	icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'prc' ),
		__( 'newsletter' ),
		__( 'follow us' ),
	],
	supports: {
		html: false, // We do not want to give people the ability to edit the raw html of this block.
	},
	// Attributes are really react props. 
	attributes: {
		newsletters: {
			type: 'string',
			default: ''
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
		console.log(props);
		return(
			<Fragment>
				{ true === props.isSelected && (
					<EditSidebar {...props}/>
				) }
				<FollowUs {...props.attributes}/>
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
		return (
			<div className="js-react-follow-us">
			</div>
		);
	},
} );
