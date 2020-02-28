import { Component, Fragment } from '@wordpress/element';
import { Picture } from 'react-responsive-picture';
import { addQueryArgs } from '@wordpress/url';
import classNames from 'classnames/bind';
// Edit
import { Button, ButtonGroup, SelectControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Props:
 * id:
 * img:
 * size:
 * link:
 * slot:
 * chartArt:
 * dataHandler: *When not in "edit mode" this prop should be false to signal that.*
 */
class Image extends Component {

	constructor(props) {
		super(props);
	}

	classNames = (slot, chartArt) => {
		let isMedium = false;
		if ( 'left' === slot || 'right' === slot ) {
			isMedium = true;
		}
		return classNames({ ui: true, medium: isMedium, image: true, bordered: chartArt });
	}

	imgMarkup = ({img, size, id, link}) => {
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
				args = { resize: '260,260' };
			} else if ( 'legacy-260-173' === size ) {
				args = { resize: '260,173' };
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

		return <Picture className={'wp-image-' + id} sources={ getImgSrcSet(img, size) }/>
	}

	editMode = ({dataHandler, size, slot}) => {
		console.log('Edit Mode');
		console.log(dataHandler);
		console.log(size);
		const mediaHandler = (media) => {
			console.log(media);
			if ( 'disabled' === slot ) {
				dataHandler( { image: media.url, imageID: media.id, imageSlot: 'default' } );
			} else {
				dataHandler( { image: media.url, imageID: media.id } );
			}
		}

		const Toolbar = ({open, dataHandler, isChartArt}) => {
			return(
				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					<div>
						<ButtonGroup>
							<Button isPrimary onClick={open}>Select Image</Button>
							<Button onClick={ ()=>{ dataHandler({image:'', imageSlot: 'disabled'}) }}>Remove</Button>
							<Button onClick={ () => { dataHandler({isChartArt: ! isChartArt }) } }>Enable Chart Art</Button>
						</ButtonGroup>
					</div>
					<div>
						<SelectControl
							label='Image Size'
							value={ size }
							options={[
								{ value: 'A1', label: 'A1' },
								{ value: 'A2', label: 'A2' },
								{ value: 'A3', label: 'A3' },
								{ value: 'A4', label: 'A4' },
								{ value: 'legacy-260', label: 'Legacy Homepage 260x260' },
								{ value: 'legacy-260-173', label: 'Legacy Homepage 260x173' },
							]}
							onChange={ ( imageSize ) => dataHandler({imageSize}) }
							style={{marginBottom: '0px'}}
						/>
					</div>
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
										<ImgMarkup img={this.props.img} size={this.props.size} id={this.props.id} link={this.props.link} slot={this.props.slot}/>
										<Toolbar dataHandler={dataHandler} open={open} isChartArt={this.props.chartArt}/>
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
				{ false === this.props.dataHandler && (
					<div className={this.classNames(this.props.slot)}>
						<ImgMarkup 
						id={this.props.id}
						img={this.props.img}
						size={this.props.size}
						link={this.props.link}
						/>
					</div>
				) }
				{ false !== this.props.dataHandler && (
					<Edit dataHandler={this.props.dataHandler} size={this.props.size} slot={this.props.slot}/>
				) }
			</Fragment>
		)
	}
}

export default Image;