// WordPress Core
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, SelectControl, TextControl, Popover, Toolbar } from '@wordpress/components';

// Utilities
import { addQueryArgs } from '@wordpress/url';
import * as moment from 'moment';
import classNames from 'classnames/bind';

import getTerms from '../_shared/get-terms';

// Elements
import { Item } from 'semantic-ui-react';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const formatDate = ( dateString ) => {
	return moment(dateString).format("MMM D, YYYY");
}

class MetaEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			editLabel: false,
			taxonomy: 'Formats',
			labelOptions: [],
		}
		this.setState = this.setState.bind(this);
		this.getLabelOptions = this.getLabelOptions.bind(this);
	}

	componentDidMount() {
		this.getLabelOptions();
	}

	componentDidUpdate() {
		if ( this.state.taxonomy !== this.props.taxonomy ) {
			this.getLabelOptions();
		}
	}

	getLabelOptions() {
		if ( undefined === wp.api.collections[this.props.taxonomy] ) {
			// Exit early, critical error that we don't want to stop the block from loading.
			return;
		}
		const setState = this.setState;
		
		getTerms(this.props.taxonomy, false).then((data)=>{
			let labelOptions = data;
			setState({ taxonomy: this.props.taxonomy, labelOptions: labelOptions });
		});
	}

	render() {
		return (
			<Fragment>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<div>
						<SelectControl
							value={ this.props.label }
							options={this.state.labelOptions}
							onChange={ ( label ) => { this.props.setAttributes({label}) } }
							style={{marginBottom: '0px'}}
							className='story-label-select'
						/>
					</div>
					<div>&nbsp;|&nbsp;</div>
					<div>
						<TextControl
							value={ this.props.date }
							onChange={ ( date ) => {
								this.props.setAttributes( { date: date } );
							} }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

class ImageEditor extends Component {
	constructor(props) {
		super(props);
		this.mediaHandler = this.mediaHandler.bind(this);
	}
	mediaHandler(media) {
		console.log(media);
		if ( 'disabled' === this.props.slot ) {
			this.props.setAttributes( { image: media.url, imageID: media.id, imageSlot: 'default' } )
		} else {
			this.props.setAttributes( { image: media.url, imageID: media.id } )
		}
	}
	render() {
		return(
			<MediaUploadCheck>
			<MediaUpload
				onSelect={this.mediaHandler}
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				render={ ( { open } ) => (
					<Fragment>
						{ '' !== this.props.img && (
							<Fragment>
								{ ('default' !== this.props.slot && 'disabled' !== this.props.slot) && (
									<BlockControls>
										<Toolbar controls={[{
											icon: 'art',
											title: `Chart Art`,
											isActive: this.props.isChartArt,
											onClick: () => { this.props.setAttributes({ isChartArt: this.props.isChartArt ? false : true  }) },
										}]} />
									</BlockControls>
								) }
								<div className={this.props.imgClass}>
									<img className={'wp-image-'+this.props.id} src={this.props.img} onClick={ open }/>
									<div className="image-editor-options">
										<div>
											<div class="sans-serif"><i>Click image to open media library</i></div>
											<div class="sans-serif remove-image" onClick={()=>{ this.props.setAttributes({image:'', imageSlot: 'disabled'}) }}>Or click here to <strong>REMOVE IMAGE</strong></div>
										</div>
										<div>
											<SelectControl
												label='Image Size'
												value={ this.props.size }
												options={[
													{ value: 'A1', label: 'A1' },
													{ value: 'A2', label: 'A2' },
													{ value: 'A3', label: 'A3' },
													{ value: 'A4', label: 'A4' },
												]}
												onChange={ ( imageSize ) => { this.props.setAttributes({imageSize}); } }
												style={{marginBottom: '0px'}}
											/>
										</div>
									</div>
								</div>
							</Fragment>
						) }
						{ '' === this.props.img && (
							<p><Button isPrimary onClick={ open }>Insert Image</Button></p>
						) }
					</Fragment>
				) }
			/>
			</MediaUploadCheck>
		)
	}
}

const Image = function({ isChartArt, img, setAttributes, link }) {
	let isMedium = false;
	if ( 'left' === img.slot || 'right' === img.slot ) {
		isMedium = true;
	}
	let classes = classNames({ ui: true, medium: isMedium, image: true, bordered: isChartArt });

	const appendImageWidth = (imgURL, slot, size, setAttributes) => {
		if ( '' === imgURL || false === imgURL ) {
			return imgURL;
		}

		let A1 = '564px';
		let A2 = '268px';
		let A3 = '194px';
		let A4 = '268px';

		// If left or right slot we know we have a set image size for that, so change accordingly.
		if ( 'left' === slot || 'right' === slot ) {
			size = 'A2';
			if ( null !== setAttributes ) {
				setAttributes({ imageSize: size });
			}
		}

		// We're making A1 the default
		let width = A1;
		if ( 'A2' === size ) {
			width = A2;
		} else if ( 'A3' === size ) {
			width = A3;
		} else if ( 'A4' === size ) {
			width = A4;
		}

		return addQueryArgs( imgURL, { w: width } );
	}

	return(
		<Fragment>
			{ undefined !== img && (
				<Fragment>
				{ false !== setAttributes && (
					<Fragment>
						<ImageEditor id={img.id} slot={img.slot} img={appendImageWidth(img.src, img.slot, img.size, setAttributes)} size={img.size} imgClass={classes} isChartArt={isChartArt} setAttributes={setAttributes}/>
					</Fragment>
				)}
				{ false === setAttributes && (
					<div className={classes}>
						<a href={link}>
							<img className={'wp-image-' + img.id} src={appendImageWidth(img.src, img.slot, img.size, null)}/>
						</a>
					</div>
				)}
				</Fragment>
			)}
		</Fragment>
	)	
}

const Description = function({ content, enabled, setAttributes, sansSerif }) {
	let classes = classNames( 'description', {'sans-serif': sansSerif} );
	return(
		<Fragment>
			{ true === enabled && (
				<Fragment>
					{ false !== setAttributes && (
						<RichText
							tagName="div" // The tag here is the element output and editable in the admin
							value={ content } // Any existing content, either from the database or an attribute default
							onChange={ ( excerpt ) => setAttributes( { excerpt } ) } // Store updated content as a block attribute
							placeholder={ content } // Display this text before any content has been added by the user
							multiline="p"
							className={ classes }
						/>
					) }
					{ false === setAttributes && ( 
						<RichText.Content tagName="div" value={ content } className={ classes }/>
					) }
				</Fragment>
			) }
		</Fragment>
	)
}

const Extra = function({ enabled, content, setAttributes }) {
	let classes = classNames( 'extra' );
	return(
		<Fragment>
			{ false !== setAttributes && true === enabled && (
				<RichText
					tagName="ul" // The tag here is the element output and editable in the admin
					value={ content } // Any existing content, either from the database or an attribute default
					onChange={ ( extra ) => setAttributes( { extra } ) } // Store updated content as a block attribute
					placeholder={ content } // Display this text before any content has been added by the user
					multiline="li"
					className={ classes }
				/>
			) }
			{ false === setAttributes && true === enabled && ( 
				<RichText.Content tagName="ul" value={ content } className={ classes }/>
			) }
		</Fragment>
	)
}

const Kicker = ({ label, date }) => {
	const labelSlug = label.replace(/\s+/g, '-').toLowerCase();
	let classes = classNames( labelSlug, 'label' );
	return(
		<Fragment><span className={classes}>{label ? label : 'Report'}</span> | {formatDate(date)}</Fragment>
	)
}

const PostTitle = ({ title, link, size, as = 'a' }) => {
	return(
		<RichText.Content href={link} tagName={as} value={title}/>
	)
}

const Header = function({ title, label, date, link, enabled, size, taxonomy, setAttributes }) {
	const currentSize = size;
	const createSizeControls = function( size ) {
		let active = false;
		if ( size === currentSize ) {
			active = true;
		}
        return {
            icon: 'editor-textcolor',
            title: `Size: ${ size }`,
            isActive: active,
            onClick: () => { setAttributes({ headerSize: size }) },
        };
	}
	return(
		<Fragment>
			{ true === enabled && (
				<Fragment>
					<Item.Meta>
						{ false !== setAttributes && (
							<MetaEditor date={date} label={label} taxonomy={taxonomy} setAttributes={setAttributes}/>
						) }
						{ false === setAttributes && (             
							<Kicker label={label} date={date}/>
						) }
					</Item.Meta>
					<Item.Header className={size}>
						{ false !== setAttributes && (
							<Fragment>
								<BlockControls>
									<Toolbar controls={ [ 'small', 'normal', 'large' ].map( createSizeControls ) } />
								</BlockControls>
								<RichText
									tagName="div" // The tag here is the element output and editable in the admin
									value={ title } // Any existing content, either from the database or an attribute default
									onChange={ ( title ) => setAttributes( { title } ) } // Store updated content as a block attribute
									placeholder='Title' // Display this text before any content has been added by the user
									multiline="br"
								/>
							</Fragment>
						) }
						{ false === setAttributes && ( 
							<PostTitle title={title} link={link} as='a' size={size}/>
						) }
					</Item.Header>
				</Fragment>
			) }
		</Fragment>
	)
}

class StoryItem extends Component {
	constructor(props) {
		super(props);
		this.item = this.item.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
	}

	item = (attrs) => {
		return(
			<Item as="article" className={attrs.classes}>
				{ ( 'top' === attrs.imageSlot || 'left' === attrs.imageSlot ) && (
					<Image 
						img={{
							src: attrs.image, 
							id: attrs.imageID,
							slot: attrs.imageSlot,
							size: attrs.imageSize,
						}}
						link={attrs.link}
						setAttributes={this.props.setAttributes}
						isChartArt={attrs.isChartArt}
					/>
				) }
				
				<Item.Content>
					<Header 
						title={attrs.title}
						date={attrs.date}
						label={attrs.label}
						link={attrs.link}
						setAttributes={this.props.setAttributes}
						enabled={attrs.enableHeader}
						size={attrs.headerSize}
						taxonomy={attrs.taxonomy} // Where??
					/>

					{ 'default' === attrs.imageSlot && (
						<Image 
							img={{
								src: attrs.image, 
								id: attrs.imageID,
								slot: attrs.imageSlot,
								size: attrs.imageSize,
							}}
							link={attrs.link}
							setAttributes={this.props.setAttributes}
							isChartArt={attrs.isChartArt}
						/>
					) }

					<Description content={attrs.excerpt} enabled={attrs.enableExcerpt} setAttributes={this.props.setAttributes} sansSerif={!attrs.enableHeader}/>

					<Extra enabled={attrs.enableExtra} content={attrs.extra} setAttributes={this.props.setAttributes}/>
				</Item.Content>

				{ ( 'bottom' === attrs.imageSlot || 'right' === attrs.imageSlot ) && (
					<Image 
						img={{
							src: attrs.image, 
							id: attrs.imageID,
							slot: attrs.imageSlot,
							size: attrs.imageSize,
						}}
						link={attrs.link}
						setAttributes={this.props.setAttributes}
						isChartArt={attrs.isChartArt}
					/>
				) }
			</Item>
		)
	}

	render() {
		// If the block is not selected, it is not in edit mode, disable setAttributes.
		if ( undefined === this.props.isSelected || true !== this.props.isSelected ) {
			this.props.setAttributes = false;
		}
		
		this.props.attributes.taxonomy = 'Formats';
		if ( true === this.props.attributes.enableProgramsTaxonomy ) {
			this.props.attributes.taxonomy = 'Programs';
		}

		let isStacked = true;
		if ( 'left' === this.props.attributes.imageSlot || 'right' === this.props.attributes.imageSlot ) {
			isStacked = false;
		}

		let isBordered = false;
		if ( true === this.props.attributes.emphasis ) {
			isBordered = true;
		}

		this.props.attributes.classes = classNames( this.props.attributes.className, 'story-item', {stacked: isStacked, bordered: isBordered} );
		
		return(
			<Fragment>
				<this.item {...this.props.attributes}/>
			</Fragment>
		)
	}	
}

export default StoryItem;