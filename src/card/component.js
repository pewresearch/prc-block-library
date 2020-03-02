import './card.scss';

import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';

import { Card as SemanticCard, Image as SemanticImage } from 'semantic-ui-react';
import { Image } from '../_shared';

import classNames from 'classnames/bind';

class Card extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let isBasic = false;
		if ( 'is-style-borderless' === this.props.className ) {
			isBasic = true;
		}
		let classes = classNames(this.props.className, { basic: isBasic });
		let dataHandler = false;
		if ( true === this.props.edit.enabled ) {
			dataHandler = this.props.edit.setAttributes;
		}
		return(
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
					<Image
						img={this.props.image}
						size='A2'
						link={this.props.link}
						dataHandler={dataHandler}
					/>

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

					<div className="ui relaxed items">
					{ false === this.props.edit.display && (
						<InnerBlocks />
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
		)
	}	
}

export default Card;