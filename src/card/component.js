
const { Component, Fragment } = wp.element;
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { TextControl, Button } = wp.components;

import { Card as SemanticCard, Image as SemanticImage } from 'semantic-ui-react';

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
		console.log(this.props.backgroundColor);
	}

	render() {
		let styles = {};
		if ( '#fff' !== this.props.backgroundColor ) {
			styles = {backgroundColor: this.props.backgroundColor}
		}
		let basic = '';
		if ( true === this.props.disableBorder ) {
			basic = 'basic';
		}
		return(
			<Fragment>
				<SemanticCard fluid style={styles} className={basic}>
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

						{ '' !== this.props.linkLabel && (
							<p><strong><a href={this.props.link} className="read-more">{this.props.linkLabel}</a></strong></p>
						) }
					</SemanticCard.Content>
				</SemanticCard>
				{ true === this.props.edit.enabled && (
					<Fragment>
						<TextControl
							label="Link"
							value={ this.props.link }
							onChange={ ( link ) => this.props.edit.setAttributes({link}) }
						/>
						<TextControl
							label="Link Label"
							value={ this.props.linkLabel }
							onChange={ ( linkLabel ) => this.props.edit.setAttributes({linkLabel}) }
						/>
					</Fragment>
				) }
			</Fragment>
		)
	}	
}

export default Card;