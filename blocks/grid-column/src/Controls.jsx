/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BaseControl,
	CardDivider,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

const MARKS = [
	{
		value: 1,
		label: '1',
	},
	{
		value: 2,
		label: '2',
	},
	{
		value: 3,
		label: '3',
	},
	{
		value: 4,
		label: '4',
	},
	{
		value: 5,
		label: '5',
	},
	{
		value: 6,
		label: '6',
	},
	{
		value: 7,
		label: '7',
	},
	{
		value: 8,
		label: '8',
	},
	{
		value: 9,
		label: '9',
	},
	{
		value: 10,
		label: '10',
	},
	{
		value: 11,
		label: '11',
	},
	{
		value: 12,
		label: '12',
	},
];

export default function Controls({ attributes, setAttributes, clientId }) {
	const { gridLayout, verticalAlignment } = attributes;
	const {
		index,
		desktopSpan,
		tabletSpan,
		mobileSpan,
		desktopStart,
		tabletStart,
		mobileStart,
	} = gridLayout;

	const handleGridSpanChange = (newGridSpan, device = 'desktop') => {
		const obj = {};
		obj[`${device}Span`] = newGridSpan;

		setAttributes({
			gridLayout: {
				...gridLayout,
				...obj,
			},
		});
	};

	const handleGridStartChange = (newGridStart, device = 'desktop') => {
		const obj = {};
		obj[`${device}Start`] = newGridStart;

		setAttributes({
			gridLayout: {
				...gridLayout,
				...obj,
			},
		});
	};

	const { rootClientId, blockIndex } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockIndex } = select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			return {
				rootClientId: rootId,
				blockIndex: getBlockIndex(clientId) + 1,
			};
		},
		[clientId],
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const updateVerticalAlignment = (value) => {
		// Update own alignment.
		setAttributes({ verticalAlignment: value });
		// Reset parent Columns block.
		updateBlockAttributes(rootClientId, {
			verticalAlignment: null,
		});
	};

	useEffect(() => {
		if (index !== blockIndex) {
			setAttributes({
				gridLayout: {
					...gridLayout,
					index: blockIndex,
				},
			});
		}
	}, [blockIndex]);

	return (
		<Fragment>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateVerticalAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Grid Span">
					<div className="css-grid-column-controls">
						<RangeControl
							label="Desktop Span"
							value={desktopSpan}
							onChange={(newSpan) => {
								handleGridSpanChange(newSpan, 'desktop');
							}}
							withInputField={false}
							min={1}
							max={12}
							marks={MARKS}
						/>
						<CardDivider />
						<RangeControl
							label="Tablet Span"
							value={tabletSpan}
							onChange={(newSpan) => {
								handleGridSpanChange(newSpan, 'tablet');
							}}
							withInputField={false}
							min={1}
							max={8}
							marks={MARKS.filter((item) => 8 >= item.value)}
						/>
						<CardDivider />
						<RangeControl
							label="Mobile Span"
							value={mobileSpan}
							onChange={(newSpan) => {
								handleGridSpanChange(newSpan, 'mobile');
							}}
							withInputField={false}
							min={1}
							max={4}
							marks={MARKS.filter((item) => 4 >= item.value)}
						/>
					</div>
				</PanelBody>

				<PanelBody title="Grid Start (Experimental)" initialOpen={false}>
					<div className="css-grid-column-controls">
						<BaseControl help="These controls are experimental and currently a work-in-progress. Use them at your own risk, no support will be provided.">
							<RangeControl
								label="Desktop Start"
								value={desktopStart}
								onChange={(newStart) => {
									handleGridStartChange(newStart, 'desktop');
								}}
								withInputField={false}
								min={1}
								max={12}
								marks={MARKS}
								initialPosition={0}
							/>
							<CardDivider />
							<RangeControl
								label="Tablet Start"
								value={tabletStart}
								onChange={(newStart) => {
									handleGridStartChange(newStart, 'tablet');
								}}
								withInputField={false}
								min={1}
								max={8}
								marks={MARKS.filter((item) => 8 >= item.value)}
								initialPosition={0}
							/>
							<CardDivider />
							<RangeControl
								label="Mobile Start"
								value={mobileStart}
								onChange={(newStart) => {
									handleGridStartChange(newStart, 'mobile');
								}}
								withInputField={false}
								min={1}
								max={4}
								marks={MARKS.filter((item) => 4 >= item.value)}
								initialPosition={0}
							/>
						</BaseControl>
					</div>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
