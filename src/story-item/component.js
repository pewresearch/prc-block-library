// WordPress Core
import { Component, Fragment } from '@wordpress/element';
import { RichText, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { SelectControl, TextControl, Toolbar } from '@wordpress/components';

// Utilities
import * as moment from 'moment';
import classNames from 'classnames/bind';

import { getTerms, Image } from "../_shared";

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
		
		getTerms(this.props.taxonomy).then((data)=>{
			let labelOptions = [];

			for (let termID in data) {
				// skip loop if the property is from prototype
				if (!data.hasOwnProperty(termID)) continue;
			
				let termObj = data[termID];
				labelOptions.push({
					value: termObj.name,
					label: termObj.name,
				});
			}

			labelOptions.sort((a, b) =>(a.label > b.label) ? 1: -1);

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

const Description = function({ content, enabled, setAttributes, sansSerif }) {
	let classes = classNames( 'description', {'sans-serif': sansSerif} );
	return(
		<Fragment>
			{ true === enabled && (
				<Fragment>
					{ false !== setAttributes && (
						<RichText
							tagName="div"
							value={ content }
							onChange={ ( excerpt ) => setAttributes( { excerpt } ) } 
							placeholder={ content }
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
	if ( undefined === label ) {
		label = "Report";
	}
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

	item = (attrs) => {
		return(
			<Item as="article" className={attrs.classes}>
				{ ( 'top' === attrs.imageSlot || 'left' === attrs.imageSlot ) && (
					<Image
						img={attrs.image}
						size={attrs.imageSize}
						link={attrs.link}
						slot={attrs.imageSlot}
						chartArt={attrs.isChartArt}
						dataHandler={this.props.setAttributes}
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
							img={attrs.image}
							size={attrs.imageSize}
							link={attrs.link}
							slot={attrs.imageSlot}
							chartArt={attrs.isChartArt}
							dataHandler={this.props.setAttributes}
						/>
					) }

					<Description content={attrs.excerpt} enabled={attrs.enableExcerpt} setAttributes={this.props.setAttributes} sansSerif={!attrs.enableHeader}/>

					<Extra enabled={attrs.enableExtra} content={attrs.extra} setAttributes={this.props.setAttributes}/>
				</Item.Content>

				{ ( 'bottom' === attrs.imageSlot || 'right' === attrs.imageSlot ) && (
					<Image img={attrs.image} size={attrs.imageSize} link={attrs.link} slot={attrs.imageSlot} chartArt={attrs.isChartArt}
						dataHandler={this.props.setAttributes}
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