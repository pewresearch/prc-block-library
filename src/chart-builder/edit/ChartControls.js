/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	ExternalLink,
	FormTokenField,
	Button,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { uploadMedia } from '@wordpress/media-utils';
import { dispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
/**
 * External dependencies
 */
import html2canvas from 'html2canvas';
/**
 * Internal dependencies
 */
import { colorNames } from '../utils/colors';
import { formatNum } from '../utils/helpers';
import XAxisControls from './XAxisControls';
import YAxisControls from './YAxisControls';
import DataControls from './DataControls';
import LineControls from './LineControls';
import BarControls from './BarControls';
import LabelControls from './LabelControls';
import LegendControls from './LegendControls';
import TooltipControls from './TooltipControls';
import TextFieldControls from './TextFieldControls';
import NodeControls from './NodeControls';

const { editPost } = dispatch('core/editor');

const ChartControls = ({ attributes, setAttributes, clientId }) => {
	const [imageLoading, setImageLoading] = useState(false);
	const [svgLoading, setSVGLoading] = useState(false);
	const {
		chartType,
		chartOrientation,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		height,
		width,
		horizontalRules,
		colorValue,
		customColors,
		pngUrl,
		pngId,
		tabsActive,
	} = attributes;
	const upload = (blob, name, type) => {
		uploadMedia({
			filesList: [
				new File([blob], name, {
					type,
				}),
			],
			onFileChange: ([fileObj]) => {
				console.log({ fileObj });
				setAttributes({
					pngUrl: fileObj.url,
					pngId: fileObj.id,
				});
				editPost({ featured_media: fileObj.id });
				setImageLoading(false);
			},
			onError: console.error,
		});
	};
	const createSvg = () => {
		setSVGLoading(true);
		const blockEl = document.querySelector(`[data-block="${clientId}"]`);
		const svg = blockEl.querySelector('svg');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
		var blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement('a');
		downloadLink.href = url;
		downloadLink.download = `chart-${clientId}.svg`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		setSVGLoading(false);
	};
	const createCanvas = () => {
		setImageLoading(true);
		const blockEl = document.querySelector(`[data-block="${clientId}"]`);
		const resizerEl = blockEl.querySelector(
			'.components-resizable-box__container',
		);
		resizerEl.classList.remove('has-show-handle');
		html2canvas(blockEl).then((canvas) => {
			canvas.toBlob(
				function (blob) {
					upload(
						blob,
						`chart-${clientId}-${Date.now()}.png`,
						'image/png',
					);
				},
				'image/png',
				1,
			);
			resizerEl.classList.add('has-show-handle');
		});
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Chart Configuration')}>
					{chartType === 'bar' && (
						<SelectControl
							label={__('Chart Orientation (Bar charts only)')}
							value={chartOrientation}
							options={[
								{
									value: 'vertical',
									label: 'Vertical',
								},
								{
									value: 'horizontal',
									label: 'Horizontal',
								},
							]}
							onChange={(orientation) => {
								setAttributes({
									chartOrientation: orientation,
								});
							}}
						/>
					)}
					<RangeControl
						label={__('Width')}
						withInputField
						min={0}
						max={640}
						value={parseInt(width)}
						onChange={(width) =>
							setAttributes({
								width: formatNum(width, 'integer'),
							})
						}
					/>
					<RangeControl
						label={__('Height')}
						withInputField
						min={0}
						max={1200}
						value={parseInt(height)}
						onChange={(height) =>
							setAttributes({
								height: formatNum(height, 'integer'),
							})
						}
					/>
					<ToggleControl
						label={__('Show horizontal rules')}
						help={__('Show horizontal rules above and below chart')}
						checked={horizontalRules}
						onChange={() =>
							setAttributes({ horizontalRules: !horizontalRules })
						}
					></ToggleControl>
					<NumberControl
						label={__('Padding Top')}
						value={paddingTop}
						disableUnits={true}
						disabledUnits={true}
						onChange={(value) => {
							setAttributes({
								paddingTop: formatNum(value, 'integer'),
							});
						}}
					/>
					<NumberControl
						label={__('Padding Right')}
						value={paddingRight}
						disableUnits={true}
						disabledUnits={true}
						onChange={(value) => {
							setAttributes({
								paddingRight: formatNum(value, 'integer'),
							});
						}}
					/>
					<NumberControl
						label={__('Padding Bottom')}
						value={paddingBottom}
						disableUnits={true}
						disabledUnits={true}
						onChange={(value) => {
							setAttributes({
								paddingBottom: formatNum(value, 'integer'),
							});
						}}
					/>
					<NumberControl
						label={__('Padding Left')}
						value={paddingLeft}
						disableUnits={true}
						disabledUnits={true}
						onChange={(value) => {
							setAttributes({
								paddingLeft: formatNum(value, 'integer'),
							});
						}}
					/>
					<SelectControl
						label={__('Color Pallette')}
						value={colorValue}
						options={colorNames}
						help={__(
							"Sets a predefined color pallette for the chart's color scale. If you wish to define your own colors. Use the Custom Colors input below, which will override all preset colors.",
						)}
						onChange={(colors) => {
							setAttributes({ colorValue: colors });
						}}
					/>
					<FormTokenField
						label={__('Custom Colors')}
						value={customColors || []}
						placeholder={'#000000'}
						onChange={(colors) =>
							setAttributes({ customColors: colors })
						}
					/>
					<ExternalLink href="https://codepen.io/benjiwo/pen/GdBNPP">
						Pew Research Color Guide
					</ExternalLink>
				</PanelBody>
				<PanelBody title={__('Chart Tabs')} initialOpen={false}>
					<ToggleControl
						label={__('Show data and share tabs')}
						checked={tabsActive}
						help={__(
							'If unchecked, only the chart will be shown. Disable this for small multiples and charts where you do not want to show underlying data.',
						)}
						onChange={() =>
							setAttributes({ tabsActive: !tabsActive })
						}
					/>
				</PanelBody>
				<TextFieldControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<XAxisControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<YAxisControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<DataControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<LabelControls
					attributes={attributes}
					setAttributes={setAttributes}
					chartType={chartType}
				/>
				<LegendControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<TooltipControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				{(chartType === 'bar' || chartType === 'stacked-bar') && (
					<BarControls
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				)}
				{(chartType === 'line' || chartType === 'area') && (
					<LineControls
						attributes={attributes}
						setAttributes={setAttributes}
						chartType={chartType}
					/>
				)}
				{(chartType === 'line' ||
					chartType === 'area' ||
					chartType === 'dot-plot' ||
					chartType === 'scatter') && (
					<NodeControls
						attributes={attributes}
						setAttributes={setAttributes}
						chartType={chartType}
					/>
				)}
				<PanelBody title="Image Exports" initialOpen={false}>
					<PanelRow>
						<Button
							isSecondary
							isBusy={svgLoading}
							onClick={createSvg}
						>
							Download SVG
						</Button>
					</PanelRow>
					<PanelRow>
						<Button
							isSecondary
							isBusy={imageLoading}
							onClick={createCanvas}
						>
							Upload Chart PNG to Media Library
						</Button>
					</PanelRow>
					<PanelRow>
						{imageLoading && (
							<p>
								Creating image. This will take several moments
								...
							</p>
						)}
						{svgLoading && <p>Preparing SVG ...</p>}
					</PanelRow>
					{pngUrl.length > 0 && (
						<>
							<PanelRow>
								<TextControl
									label={__('PNG URL')}
									value={pngUrl}
								/>
							</PanelRow>
							<PanelRow>
								<ExternalLink href={pngUrl}>
									Preview Image
								</ExternalLink>
							</PanelRow>
						</>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default ChartControls;
