/**
 * WordPress Dependencies
 */
import {
	PanelBody,
	RangeControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { MARKS } from './utils';

export default function SpanControls({ gridLayout, setAttributes }) {
	const { desktopSpan, tabletSpan, mobileSpan } = gridLayout;

	const deviceType = useSelect((select) => {
		const type = select('core/editor').getDeviceType();
		return type ? type.toLowerCase() : 'desktop';
	}, []);

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

	const isDesktop = deviceType === 'desktop';
	const isTablet = deviceType === 'tablet';
	const isMobile = deviceType === 'mobile';

	return (
		<PanelBody title="Column Span">
			<VStack spacing="2em" style={{ marginBottom: '1.5em' }}>
				{isDesktop && (
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
				)}
				{(isDesktop || isTablet) && (
					<RangeControl
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
				)}
				{(isDesktop || isMobile) && (
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
				)}
			</VStack>
		</PanelBody>
	);
}
