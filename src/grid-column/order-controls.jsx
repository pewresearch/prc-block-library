/**
 * External Dependencies
 */

/**
 * Internal Dependencies
 */
import { calculateDividers } from './utils';

/**
 * WordPress Dependencies
 */
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export default function OrderControls({ gridLayout, setAttributes, clientId }) {
	const { index, tabletPosition, mobilePosition } = gridLayout;

	const deviceType = useSelect((select) => {
		const type = select('core/editor').getDeviceType();
		return type ? type.toLowerCase() : 'desktop';
	}, []);

	const { columnCount, siblingColumns } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockCount, getBlocks } =
				select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			return {
				columnCount: getBlockCount(rootId),
				siblingColumns: getBlocks(rootId),
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// Generate marks for ordering based on column count
	const orderMarks = Array.from({ length: columnCount }, (_, i) => ({
		value: i + 1,
		label: String(i + 1),
	}));

	/**
	 * Get current position (1-based for display)
	 *
	 * @param {string} device - Device type (tablet or mobile)
	 * @return {number} 1-based position
	 */
	const getCurrentPosition = (device) => {
		if (device === 'tablet') {
			return tabletPosition || index;
		}
		if (device === 'mobile') {
			return mobilePosition || index;
		}
		return index;
	};

	/**
	 * Update column position
	 *
	 * @param {number} newPosition - New 1-based position
	 * @param {string} device      - Device type (tablet or mobile)
	 */
	const handlePositionChange = (newPosition, device) => {
		const positionKey =
			device === 'tablet' ? 'tabletPosition' : 'mobilePosition';
		// If setting to sequential position (matching DOM order), set to null
		const positionValue = newPosition === index ? null : newPosition;

		setAttributes({
			gridLayout: {
				...gridLayout,
				[positionKey]: positionValue,
			},
		});

		// Recalculate dividers after position changes
		// Use setTimeout to ensure all attribute updates are processed first
		setTimeout(() => {
			calculateDividers(siblingColumns, updateBlockAttributes);
		}, 50); // Slightly longer timeout to account for multiple updates
	};

	// Calculate dividers when columns are added, removed, or reordered
	useEffect(() => {
		calculateDividers(siblingColumns, updateBlockAttributes);
	}, [
		columnCount,
		tabletPosition,
		mobilePosition,
		siblingColumns,
		updateBlockAttributes,
	]);

	const isDesktop = deviceType === 'desktop';
	const isTablet = deviceType === 'tablet';
	const isMobile = deviceType === 'mobile';

	return (
		<PanelBody title="Column Order" initialOpen={false}>
			<p className="grid-column-order-help">
				Set the visual order of this column at different screen sizes.
				Desktop order follows the column position in the editor.
			</p>
			<VStack spacing="2em" style={{ marginBottom: '1.5em' }}>
				{(isDesktop || isTablet) && (
					<RangeControl
						label="Tablet Position"
						value={getCurrentPosition('tablet')}
						onChange={(newPosition) => {
							handlePositionChange(newPosition, 'tablet');
						}}
						withInputField={false}
						min={1}
						max={columnCount}
						marks={orderMarks}
						help="Visual position of this column on tablet devices"
					/>
				)}
				{(isDesktop || isMobile) && (
					<RangeControl
						label="Mobile Position"
						value={getCurrentPosition('mobile')}
						onChange={(newPosition) => {
							handlePositionChange(newPosition, 'mobile');
						}}
						withInputField={false}
						min={1}
						max={columnCount}
						marks={orderMarks}
						help="Visual position of this column on mobile devices"
					/>
				)}
			</VStack>
		</PanelBody>
	);
}
