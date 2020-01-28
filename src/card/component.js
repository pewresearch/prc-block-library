import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';

import { Card as SemanticCard, Image as SemanticImage } from 'semantic-ui-react';

import classNames from 'classnames/bind';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const Image = function({ img, link, edit }) {
	let classes = 'image';
	return(
		<Fragment>
			{ undefined !== img && (
				<Fragment>
				{ true === edit.enabled && (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								edit.setAttributes( { image: media.url } )
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							render={ ( { open } ) => (
								<Fragment>
									{ '' !== img && (
										<div className={classes}>
											<img src={img} onClick={ open }/>
											<i>Click image to open media library</i>
											<p><Button isSmall onClick={ () => edit.setAttributes({image: ''}) }>Remove</Button></p>
										</div>
									) }
									{ '' === img && (
										<p><Button isPrimary onClick={ open }>Insert Image</Button></p>
									) }
								</Fragment>
							) }
						/>
					</MediaUploadCheck>
				)}
				{ true !== edit.enabled && (
					<Fragment>
						{ '' !== link && (
							<a href={link} className={classes}>
								<img src={img}/>
							</a>
						) }
						{ '' === link && (
							<div className={classes}><img src={img}/></div>
						) }
					</Fragment>
				)}
				</Fragment>
			)}
		</Fragment>
	)	
}

class Card extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	options = ({link, label}) => {
		return(
			<Fragment>
				<TextControl
					label="Link"
					value={ link }
					onChange={ ( link ) => this.props.edit.setAttributes({link}) }
				/>
				<TextControl
					label="Link Label"
					value={ label }
					onChange={ ( linkLabel ) => this.props.edit.setAttributes({linkLabel}) }
				/>
			</Fragment>
		)
	}

	render() {
		let isBasic = false;
		if ( 'is-style-borderless' === this.props.className ) {
			isBasic = true;
		}
		let classes = classNames(this.props.className, { basic: isBasic });
		const Options = this.options;
		return(
			<Fragment>
				<SemanticCard fluid className={classes}>
					<SemanticCard.Header>
						<Fragment>
							{ true === this.props.edit.enabled && (
								<RichText
									tagName="div" // The tag here is the element output and editable in the admin
									value={ this.props.title } // Any existing content, either from the database or an attribute default
									onChange={ ( title ) => this.props.edit.setAttributes( { title } ) } // Store updated content as a block attribute
									placeholder='Card Title' // Display this text before any content has been added by the user
								/>
							) }

							{ true !== this.props.edit.enabled && '' === this.props.link && (
								<span>{this.props.title}</span>
							) }
							{ true !== this.props.edit.enabled && '' !== this.props.link && (
								<a href={this.props.link}>{this.props.title}</a>
							) }
						</Fragment>
					</SemanticCard.Header>

					<SemanticCard.Content>
						<Image img={this.props.image} link={this.props.link} edit={this.props.edit}/>

						{ true === this.props.edit.enabled && (
							<RichText
								tagName="div" // The tag here is the element output and editable in the admin
								className="sans-serif"
								multiline="p"
								value={ this.props.excerpt } // Any existing content, either from the database or an attribute default
								onChange={ ( excerpt ) => this.props.edit.setAttributes( { excerpt } ) } // Store updated content as a block attribute
							/>
						) }
						{ true !== this.props.edit.enabled && '' !== this.props.excerpt && (
							<RichText.Content tagName="div" className="sans-serif" value={this.props.excerpt}/>
						) }

						<div className="ui items">
						{ false === this.props.edit.display && (
							<InnerBlocks allowedBlocks={[ 'prc-block/story-item' ]}/>
						) }
						{ true === this.props.edit.display && (
							<InnerBlocks.Content/>
						) }
						</div>

						{ '' !== this.props.label && '' !== this.props.link && (
							<p><strong><a href={this.props.link} className="read-more">{this.props.label}</a></strong></p>
						) }
					</SemanticCard.Content>

				</SemanticCard>
				{ true === this.props.edit.enabled && (
					<Options link={this.props.link} label={this.props.label}/>
				) }
			</Fragment>
		)
	}	
}

export default Card;