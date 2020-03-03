import './imageEditor.scss';

import { Component, Fragment, RawHTML } from '@wordpress/element';
import { Picture } from 'react-responsive-picture';
import { addQueryArgs } from '@wordpress/url';
import classNames from 'classnames/bind';
// Edit
import { Button, IconButton, SelectControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Props:
 * img:
 * size:
 * link:
 * slot: // if set to false then no image size chooser will be display
 * chartArt: // if undefined then no chart art button will appear
 * dataHandler: *When not in "edit mode" this prop should be false to signal that.*
 * 
 * <Image id={} img={} size={} link={} slot={} chartArt={} dataHandler={}/>
 */
class Image extends Component {

	constructor(props) {
		super(props);
	}

	classNames = () => {
		let isMedium = false;
		
		if ( undefined !== this.props.slot ) {
			if ( 'left' === this.props.slot || 'right' === this.props.slot ) {
				isMedium = true;
			}
		}

		let chartArt = false;
		if ( undefined !== this.props.chartArt ) {
			chartArt = this.props.chartArt;
		} 
		return classNames({ ui: true, medium: isMedium, image: true, bordered: chartArt });
	}

	imgMarkup = ({img, size, link}) => {
		const getImgURL = (url, size, variant) => {
			if ( '' === url || false === url ) {
				return url;
			}
	
			const A1 = {
				default: '564,317',
				small: '354,194',
				hidpi: '1128,634',
				smallHidpi: '708,388',
			}
	
			const A2 = {
				default: '268,151',
				small: '354,194',
				hidpi: '536,301',
				smallHidpi: '708,388',
			}
	
			const A3 = {
				default: '194,110',
				small: '148,84',
				hidpi: '388,220',
				smallHidpi: '296,168',
			}
	
			const A4 = {
				default: '268,151',
				small: '354,194',
				hidpi: '536,302',
				smallHidpi: '708,388',
			}

			const legacy = {
				'260': {
					default: '260,260',
					small: '260,260',
					hidpi: '520,520',
					smallHidpi: '520,520',
				},
				'260-173': {
					default: '260,173',
					small: '260,173',
					hidpi: '520,346',
					smallHidpi: '520,346',
				}
			}
	
			// Default to A1
			let args = { resize: A1[variant] };
			if ( 'A2' === size ) {
				args = { resize: A2[variant] };
			} else if ( 'A3' === size ) {
				args = { resize: A3[variant] };
			} else if ( 'A4' === size ) {
				args = { resize: A4[variant] };
			}
			
			// Temp legacy sizes for homepages
			if ( 'legacy-260' === size ) {
				args = { resize: legacy['260'][variant] };
			} else if ( 'legacy-260-173' === size ) {
				args = { resize: legacy['260-173'][variant] };
			}
	
			return addQueryArgs( url, args );
		}

		const getImgSrcSet = (url, size, threshold = 420) => {
			return [
				{
					srcSet: getImgURL(url, size, 'default') + ' 1x, ' + getImgURL(url, size, 'hidpi') + ' 2x',
					media: "(min-width: "+threshold+"px)",
				},
				{
					srcSet: getImgURL(url, size, 'small') + ' 1x, ' + getImgURL(url, size, 'smallHidpi') + ' 2x',
					media: "(max-width: "+threshold+"px)",
				},
			]
		}

		return(
			<Fragment>
				{ '' === link && ( <Picture style={{display: 'block'}} sources={ getImgSrcSet(img, size) }/> ) }
				{ '' !== link && ( <a href={link}><Picture style={{display: 'block'}} sources={ getImgSrcSet(img, size) }/></a> ) }
			</Fragment>
		)
	}

	editMode = ({dataHandler}) => {
		const mediaHandler = (media) => {
			if ( undefined !== this.props.slot && 'disabled' === this.props.slot ) {
				dataHandler( { image: media.url, imageSlot: 'default' } );
			} else {
				dataHandler( { image: media.url } );
			}
		}

		const Toolbar = ({open, dataHandler}) => {
			return(
				<div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f0f2f3'}}>
					<div>
						<div style={{display: 'flex', flexWrap: 'wrap'}}>
							<IconButton
								icon="upload"
								label="Select/Upload New Image"
								onClick={open}
							/>
							<IconButton
								icon="trash"
								label="Remove Image"
								onClick={ ()=>{ dataHandler({ image:'', imageSlot: 'disabled'}) }}
							/>
							
							<Fragment>
							{ undefined !== this.props.chartArt && (
								<IconButton
									icon="art"
									label={ true === this.props.chartArt ? 'Disable Chart Art' : 'Enable Chart Art' }
									onClick={ ()=>{ dataHandler({ isChartArt: ! this.props.chartArt }) }}
								/>
							) }
							</Fragment>
						</div>
					</div>
					{ undefined !== this.props.slot && (
						<div style={{display: 'flex', alignItems:'center'}}>
							<SelectControl
								label='Image Size'
								value={ this.props.size }
								options={[
									{ value: 'A1', label: 'A1' },
									{ value: 'A2', label: 'A2' },
									{ value: 'A3', label: 'A3' },
									{ value: 'A4', label: 'A4' },
									{ value: 'legacy-260', label: 'Legacy Homepage 260x260' },
									{ value: 'legacy-260-173', label: 'Legacy Homepage 260x173' },
								]}
								onChange={ ( imageSize ) => dataHandler({ imageSize }) }
								style={{ marginBottom: '0px' }}
							/>
						</div>
					) }
				</div>
			)
		}
		
		// Internal JSX Tag:
		const ImgMarkup = this.imgMarkup;

		return(
			<MediaUploadCheck>
				<MediaUpload
					onSelect={mediaHandler}
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					render={ ( { open } ) => (
						<Fragment>
							{ '' !== this.props.img && (
								<Fragment>
									<div className={this.classNames()}>
										<ImgMarkup img={this.props.img} size={this.props.size} id={this.props.id} link=''/>
										<Toolbar dataHandler={dataHandler} open={open}/>
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

	render() {
		console.log('Image Component:');
		console.log(this.props);
		/// Internal JSX Tags:
		const Edit = this.editMode;
		const ImgMarkup = this.imgMarkup;
		// We should also have a prop that will let you pass through setAttribute or setState something like onChange
		return(
			<Fragment>
				{ (false === this.props.dataHandler || undefined === this.props.dataHandler) && (
					<div className={this.classNames()}>
						<ImgMarkup 
							img={this.props.img}
							size={this.props.size}
							link={this.props.link}
						/>
					</div>
				) }
				{ (false !== this.props.dataHandler && undefined !== this.props.dataHandler) && (
					<Edit dataHandler={this.props.dataHandler}/>
				) }
			</Fragment>
		)
	}
}

export default Image;