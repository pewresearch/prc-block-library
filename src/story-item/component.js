// WordPress Core
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, SelectControl, DatePicker, Popover, Toolbar } from '@wordpress/components';

// Utilities
import * as moment from 'moment';
import classNames from 'classnames/bind';

import getTerms from '../_shared/get-terms';

// Elements
import { Picture } from 'react-responsive-picture';
import { Item } from 'semantic-ui-react';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

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
			// Force Fact Tank
			if ( 'Formats' === this.props.taxonomy ) {
				labelOptions.push({ value: 'Fact Tank', label: 'Fact Tank' });
			}
			setState({ taxonomy: this.props.taxonomy, labelOptions: labelOptions });
		});
	}

	render() {
		const formatDate = function( dateString ) {
			return moment(dateString).format("MMM D, YYYY");
		}
	
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
						<span onClick={ () => { this.state.open ? this.setState({open: false}) : this.setState({open: true}) } }>{formatDate(this.props.date)}</span>
						{ true === this.state.open && (
							<Popover>
								<div>
								<DatePicker
									currentDate={ this.props.date }
									onChange={ ( date ) => { 
										let dateString = formatDate(date);
										this.props.setAttributes( { date: dateString } );
									} }
								/>
								</div>
							</Popover>
						)}
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
		if ( 'disabled' === this.props.slot ) {
			this.props.setAttributes( { image: media.url, imageSlot: 'default' } )
		} else {
			this.props.setAttributes( { image: media.url } )
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
									<img src={this.props.img} onClick={ open }/>
									<div class="sans-serif"><i>Click image to open media library</i></div>
									<div class="sans-serif remove-image" onClick={()=>{this.props.setAttributes({image:''})}}>Or click here to <strong>REMOVE IMAGE</strong></div>
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

const Image = function({ isChartArt, img, edit, link }) {
	let isMedium = false;
	if ( 'left' === img.slot || 'right' === img.slot ) {
		isMedium = true;
	}
	let classes = classNames({ ui: true, medium: isMedium, image: true, bordered: isChartArt });
	return(
		<Fragment>
			{ undefined !== img && (
				<Fragment>
				{ true === edit.enabled && (
					<Fragment>
						<ImageEditor slot={img.slot} img={img.src} imgClass={classes} isChartArt={isChartArt} setAttributes={edit.setAttributes}/>
					</Fragment>
				)}
				{ true !== edit.enabled && (
					<a href={link} className={classes}>
						<img src={img.src} />
					</a>
				)}
				</Fragment>
			)}
		</Fragment>
	)	
}

const Description = function({ content, enabled, edit, sansSerif }) {
	let classes = classNames( 'description', {'sans-serif': sansSerif} );
	return(
		<Fragment>
			{ true === enabled && (
				<Fragment>
					{true === edit.enabled && (
						<RichText
							tagName="div" // The tag here is the element output and editable in the admin
							value={ content } // Any existing content, either from the database or an attribute default
							onChange={ ( excerpt ) => edit.setAttributes( { excerpt } ) } // Store updated content as a block attribute
							placeholder={ content } // Display this text before any content has been added by the user
							multiline="p"
							className={ classes }
						/>
					)}
					{true !== edit.enabled && ( 
						<RichText.Content tagName="div" value={ content } className={ classes }/>
					)}
				</Fragment>
			) }
		</Fragment>
	)
}

const Extra = function({ enabled, content, edit }) {
	let classes = classNames( 'extra' );
	return(
		<Fragment>
			{true === edit.enabled && true === enabled && (
				<RichText
					tagName="ul" // The tag here is the element output and editable in the admin
					value={ content } // Any existing content, either from the database or an attribute default
					onChange={ ( extra ) => edit.setAttributes( { extra } ) } // Store updated content as a block attribute
					placeholder={ content } // Display this text before any content has been added by the user
					multiline="li"
					className={ classes }
				/>
			)}
			{true !== edit.enabled && true === enabled && ( 
				<RichText.Content tagName="div" value={ content } className={ classes }/>
			)}
		</Fragment>
	)
}

const Kicker = ({ label, date }) => {
	const labelSlug = label.replace(/\s+/g, '-').toLowerCase();
	let classes = classNames( labelSlug, 'label' );
	return(
		<Fragment><span className={classes}>{label ? label : 'Report'}</span> | {date}</Fragment>
	)
}

const PostTitle = ({ title, link, size, as = 'a' }) => {
	return(
		<RichText.Content href={link} tagName={as} value={ title }/>
	)
}

const Header = function({ title, label, date, link, enabled, size, taxonomy, edit }) {
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
            onClick: () => { edit.setAttributes({headerSize: size}) },
        };
	}
	return(
		<Fragment>
			{ true === enabled && (
				<Fragment>
					<Item.Meta>
						{ true === edit.enabled && (
							<MetaEditor date={date} label={label} taxonomy={taxonomy} setAttributes={edit.setAttributes}/>
						) }
						{ true !== edit.enabled && (
							<Kicker label={label} date={date}/>
						) }
					</Item.Meta>
					<Item.Header className={size}>
						{ true === edit.enabled && (
							<Fragment>
								<BlockControls>
									<Toolbar controls={ [ 'small', 'normal', 'large' ].map( createSizeControls ) } />
								</BlockControls>
								<RichText
									tagName="div" // The tag here is the element output and editable in the admin
									value={ title } // Any existing content, either from the database or an attribute default
									onChange={ ( title ) => edit.setAttributes( { title } ) } // Store updated content as a block attribute
									placeholder='Title' // Display this text before any content has been added by the user
									multiline="br"
								/>
							</Fragment>
						)}
						{ true !== edit.enabled && true === enabled && ( 
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
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		let edit = {
			enabled: false,
		}
		if ( undefined !== this.props.editMode ) {
			edit.enabled = true;
			edit.setAttributes = this.props.setAttributes;
		}

		let taxonomy = 'Formats';
		if ( true === this.props.options.taxonomy ) {
			taxonomy = 'Programs';
		}

		let isStacked = true;
		if ( 'left' === this.props.image.slot || 'right' === this.props.image.slot ) {
			isStacked = false;
		}

		let isBordered = false;
		if ( true === this.props.options.emphasis ) {
			isBordered = true;
		}

		let classes = classNames( this.props.classNames, 'story-item', {stacked: isStacked, bordered: isBordered} );
		
		return(
			<Fragment>
				<Item as="article" className={classes}>
					{ ('top' === this.props.image.slot || 'left' === this.props.image.slot) && (
						<Image 
						img={{
							src: this.props.image.src, 
							slot: this.props.image.slot
						}}
						link={this.props.link}
						edit={edit}
						isChartArt={this.props.image.isChartArt}
						/>
					) }
					<Item.Content>
						<Header 
						title={this.props.title}
						date={this.props.date}
						label={this.props.label}
						link={this.props.link}
						edit={edit}
						enabled={this.props.options.enableHeader}
						size={this.props.options.headerSize}
						taxonomy={taxonomy}
						/>
						{ 'default' === this.props.image.slot && (
							<Image 
							img={{
								src: this.props.image.src, 
								slot: this.props.image.slot
							}}
							link={this.props.link}
							edit={edit}
							isChartArt={this.props.image.isChartArt}
							/>
						) }
						{ 'disabled' === this.props.image.slot && true === edit.enabled  && (
							<ImageEditor slot={this.props.image.slot} img='' setAttributes={edit.setAttributes}
							isChartArt={this.props.image.isChartArt}/>
						)}
						<Description content={this.props.excerpt} enabled={this.props.options.enableExcerpt} edit={edit} sansSerif={ ! this.props.options.enableHeader}/>
						<Extra enabled={this.props.options.enableExtra} content={this.props.extra} edit={edit}/>
					</Item.Content>
					{ ('bottom' === this.props.image.slot || 'right' === this.props.image.slot) && (
						<Image 
						img={{
							src: this.props.image.src, 
							slot: this.props.image.slot
						}}
						link={this.props.link}
						edit={edit}
						isChartArt={this.props.image.isChartArt}
						/>
					) }
				</Item>
			</Fragment>
		)
	}	
}

export default StoryItem;