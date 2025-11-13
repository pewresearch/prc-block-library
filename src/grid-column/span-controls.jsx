/**
 * External Dependencies
 */
import { MarkedRangeControl } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { CardDivider, PanelBody } from '@wordpress/components';

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

export default function SpanControls({ gridLayout, setAttributes }) {
	const { desktopSpan, tabletSpan, mobileSpan } = gridLayout;

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

	return (
		<PanelBody title="Column Span">
			<div className="css-grid-column-controls">
				<MarkedRangeControl
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
				<MarkedRangeControl
					label="Tablet Span"
					value={tabletSpan}
					onChange={(newSpan) => {
						handleGridSpanChange(newSpan, 'tablet');
					}}
					withInputField={false}
					min={1}
					max={12}
					marks={MARKS}
				/>
				<CardDivider />
				<MarkedRangeControl
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
	);
}
