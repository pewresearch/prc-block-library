// WordPress Core
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText, BlockControls, MediaUpload } from '@wordpress/block-editor';
import { Button, ToggleControl, TextControl, SelectControl, DateTimePicker, Popover, Toolbar } from '@wordpress/components';

// Utilities
import * as moment from 'moment';
import classNames from 'classnames/bind';

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
			labelOptions: [],
		}
		this.setState = this.setState.bind(this);
		this.getLabelOptions = this.getLabelOptions.bind(this);
	}

	componentDidMount() {
		this.getLabelOptions();
	}

	getLabelOptions() {
		if ( undefined === wp.api.collections.Formats ) {
			// Exit early, critical error that we don't want to stop the block from loading.
			return;
		}

		let data = [];
		const setState = this.setState;

		return ( new wp.api.collections.Formats() ).fetch().then( ( terms ) => {
			for (let index = 0; index < terms.length; index++) {
				data.push({ value: terms[index].name, label: terms[index].name });
			}
			setState({labelOptions: data});
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
								<DateTimePicker
									currentDate={ this.props.date }
									onChange={ ( date ) => { 
										let dateString = formatDate(date);
										this.props.setAttributes( { date: dateString } );
									} }
								/>
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
								<div className={this.props.imgClass} onClick={ open }>
									<img src={this.props.img}/>
									<i>Click image to open media library</i>
								</div>
							</Fragment>
						) }
						{ '' === this.props.img && (
							<p><Button isPrimary onClick={ open }>Insert Image</Button></p>
						) }
					</Fragment>
				) }
			/>
		)
	}
}

const Image = function({ isHorizontal, isChartArt, img, edit, link }) {
	let classes = classNames({ ui: true, medium: isHorizontal, image: true, bordered: isChartArt });
	return(
		<Fragment>
			{ undefined !== img && (
				<Fragment>
				{ true === edit.enabled && (
					<Fragment>
						<ImageEditor slot={img.slot} img={img.desktop} imgClass={classes} isChartArt={isChartArt} setAttributes={edit.setAttributes}/>
					</Fragment>
				)}
				{ true !== edit.enabled && (
					<div className={classes}>
						<a href={link}><img src={img.desktop}/></a>
					</div>
				)}
				</Fragment>
			)}
		</Fragment>
	)	
}

const Description = function({ content, disabled, edit, sansSerif }) {
	const sansSerifFont = sansSerif ? 'sans-serif' : null;
	return(
		<Fragment>
			{ true !== disabled && (
				<Item.Description>
					{true === edit.enabled && (
						
						<Fragment>
							<RichText
								tagName="p" // The tag here is the element output and editable in the admin
								value={ content } // Any existing content, either from the database or an attribute default
								onChange={ ( excerpt ) => edit.setAttributes( { excerpt } ) } // Store updated content as a block attribute
								placeholder={ content } // Display this text before any content has been added by the user
								className={ sansSerifFont }
							/>
						</Fragment>
					)}
					{true !== edit.enabled && ( 
						<Fragment>
							<RichText.Content tagName="p" value={ content } className={ sansSerifFont }/>
						</Fragment>
					 )}
				</Item.Description>
			) }
		</Fragment>
	)
}

const Extra = function({ content, edit }) {
	return(
		<Item.Extra>
			{true === edit.enabled && (
				
				<Fragment>
					<RichText
						tagName="p" // The tag here is the element output and editable in the admin
						value={ content } // Any existing content, either from the database or an attribute default
						onChange={ ( extra ) => edit.setAttributes( { extra } ) } // Store updated content as a block attribute
						placeholder={ content } // Display this text before any content has been added by the user
					/>
				</Fragment>
			)}
			{true !== edit.enabled && ( 
				<Fragment>
					<RichText.Content tagName="p" value={ content }/>
				</Fragment>
			)}
		</Item.Extra>
	)
}

const Header = function({ title, label, date, edit, link, disabled, size }) {
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
			{ true !== disabled && (
				<Fragment>
					<Item.Meta>
						{ true === edit.enabled && (
							<MetaEditor date={date} label={label} setAttributes={edit.setAttributes}/>
						) }
						{ true !== edit.enabled && (
							<Fragment>{label ? label : 'Report'} | {date}</Fragment>
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
						{ true !== edit.enabled && true !== disabled && ( <a href={link}><RawHTML>{title}</RawHTML></a> ) }
					</Item.Header>
				</Fragment>
			) }
		</Fragment>
	)
}

const Options = function({emphasis, disableHeader, disableExcerpt, link, edit}) {
	return(
		<Fragment>
			<div className="story-item-options">
				<div>
					<TextControl
						label="Link"
						value={ link }
						onChange={ ( link ) => edit.setAttributes({link}) }
					/>
				</div>
				<div>
					<ToggleControl
						label={ disableHeader ? 'Header Disabled' : 'Header Enabled' }
						checked={ disableHeader }
						onChange={ (value) => { edit.setAttributes({ disableHeader: value }); } }
					/>
				</div>
				<div>
					<ToggleControl
						label={ disableExcerpt ? 'Excerpt Disabled' : 'Excerpt Enabled' }
						checked={ disableExcerpt }
						onChange={ (value) => { edit.setAttributes({ disableExcerpt: value }); } }
					/>
				</div>
				<div>
					<ToggleControl
						label={ emphasis ? 'Emphasis Enabled' : 'Emphasis Disabled' }
						checked={ emphasis }
						onChange={ (value) => { edit.setAttributes({ emphasis: value }); } }
					/>
				</div>
			</div>
		</Fragment>
	)
}

class StoryItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let edit = {
			enabled: false,
		}
		if ( undefined !== this.props.editMode ) {
			edit.enabled = true;
			edit.setAttributes = this.props.setAttributes;
		}

		let classes = classNames( this.props.classNames, 'story-item', {stacked: this.props.options.stacked, bordered: this.props.options.emphasis} );
		
		return(
			<Fragment>
				<Item as="article" className={classes}>
					{ ('top' === this.props.image.slot || 'left' === this.props.image.slot) && (
						<Image 
						isHorizontal={this.props.options.horizontal} 
						img={{
							desktop: this.props.image.desktop, 
							mobile: this.props.image.desktop,
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
						disabled={this.props.options.disableHeader}
						size={this.props.options.headerSize}
						/>
						{ 'default' === this.props.image.slot && (
							<Image 
							isHorizontal={false}
							img={{
								desktop: this.props.image.desktop, 
								mobile: this.props.image.desktop,
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
						<Description content={this.props.excerpt} disabled={this.props.options.disableExcerpt} edit={edit} sansSerif={this.props.options.disableHeader}/>
						<Extra content={this.props.extra} edit={edit}/>
					</Item.Content>
					{ ('bottom' === this.props.image.slot || 'right' === this.props.image.slot) && (
						<Image 
						isHorizontal={this.props.options.horizontal} 
						img={{
							desktop: this.props.image.desktop, 
							mobile: this.props.image.desktop,
							slot: this.props.image.slot
						}}
						link={this.props.link}
						edit={edit}
						isChartArt={this.props.image.isChartArt}
						/>
					) }
				</Item>
				{ true === edit.enabled && (
					<Options emphasis={this.props.options.emphasis} disableHeader={this.props.options.disableHeader} disableExcerpt={this.props.options.disableExcerpt} link={this.props.link} edit={edit}/>
				) }
			</Fragment>
		)
	}	
}

export default StoryItem;