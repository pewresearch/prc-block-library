/**
 * External Dependencies
 */
import { MarkedRangeControl } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { ToolbarGroup, ToolbarButton, Dropdown } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';

const SPAN_MARKS = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
	{ value: 7, label: '7' },
	{ value: 8, label: '8' },
	{ value: 9, label: '9' },
	{ value: 10, label: '10' },
	{ value: 11, label: '11' },
	{ value: 12, label: '12' },
];

/**
 * Get device-specific labels and values
 *
 * @param {string} deviceType - The device type (desktop, tablet, or mobile)
 * @return {Object} Device configuration object
 */
function getDeviceConfig(deviceType) {
	const configs = {
		desktop: {
			label: 'Desktop',
			icon: '🖥️',
			spanMax: 12,
			spanMarks: SPAN_MARKS,
		},
		tablet: {
			label: 'Tablet',
			icon: '📱',
			spanMax: 12,
			spanMarks: SPAN_MARKS,
		},
		mobile: {
			label: 'Mobile',
			icon: '📱',
			spanMax: 4,
			spanMarks: SPAN_MARKS.filter((item) => item.value <= 4),
		},
	};

	return configs[deviceType] || configs.desktop;
}

/**
 * Responsive toolbar controls for span and order
 * Shows only the controls for the currently selected device in the editor
 *
 * @param {Object}   root0               - Component props
 * @param {Object}   root0.gridLayout    - Grid layout attributes
 * @param {Function} root0.setAttributes - Function to update attributes
 * @param {string}   root0.clientId      - Block client ID
 * @return {Element} The toolbar controls component
 */
export default function ResponsiveToolbarControls({
	gridLayout,
	setAttributes,
	clientId,
}) {
	const {
		index,
		desktopSpan,
		tabletSpan,
		mobileSpan,
		tabletPosition,
		mobilePosition,
	} = gridLayout;

	// Get current device type from editor
	const { deviceType } = useSelect((select) => {
		const type = select('core/editor').getDeviceType();
		return {
			deviceType: type ? type.toLowerCase() : 'desktop',
		};
	}, []);

	// Get column count and siblings for order controls
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

	const deviceConfig = useMemo(
		() => getDeviceConfig(deviceType),
		[deviceType]
	);

	// Get current span value for active device
	const currentSpan = useMemo(() => {
		if (deviceType === 'desktop') return desktopSpan;
		if (deviceType === 'tablet') return tabletSpan;
		if (deviceType === 'mobile') return mobileSpan;
		return desktopSpan;
	}, [deviceType, desktopSpan, tabletSpan, mobileSpan]);

	// Get current position value for active device
	const currentPosition = useMemo(() => {
		if (deviceType === 'desktop') return index; // Desktop uses DOM order
		if (deviceType === 'tablet') return tabletPosition || index;
		if (deviceType === 'mobile') return mobilePosition || index;
		return index;
	}, [deviceType, index, tabletPosition, mobilePosition]);

	// Generate marks for ordering based on column count
	const orderMarks = useMemo(
		() =>
			Array.from({ length: columnCount }, (_, i) => ({
				value: i + 1,
				label: String(i + 1),
			})),
		[columnCount]
	);

	/**
	 * Handle span change for current device
	 *
	 * @param {number} newSpan - The new span value
	 */
	const handleSpanChange = (newSpan) => {
		const spanKey = `${deviceType}Span`;

		setAttributes({
			gridLayout: {
				...gridLayout,
				[spanKey]: newSpan,
			},
		});
	};

	/**
	 * Handle position change for current device
	 *
	 * @param {number} newPosition - The new position value
	 */
	const handlePositionChange = (newPosition) => {
		// Desktop doesn't support custom positioning
		if (deviceType === 'desktop') {
			return;
		}

		const positionKey =
			deviceType === 'tablet' ? 'tabletPosition' : 'mobilePosition';

		// If setting to sequential position (matching DOM order), set to null
		const positionValue = newPosition === index ? null : newPosition;

		setAttributes({
			gridLayout: {
				...gridLayout,
				[positionKey]: positionValue,
			},
		});

		// Recalculate dividers after position changes
		setTimeout(() => {
			calculateDividers(siblingColumns, updateBlockAttributes);
		}, 50);
	};

	/**
	 * Calculate dividers based on visual position
	 *
	 * @param {Array}    columns     - Array of column blocks
	 * @param {Function} updateAttrs - Function to update block attributes
	 */
	const calculateDividers = (columns, updateAttrs) => {
		if (!columns || columns.length === 0) return;

		columns.forEach((column, domIndex) => {
			const columnLayout = column.attributes.gridLayout || {};
			const columnIndex = domIndex + 1;

			const desktopDivider = columnIndex !== 1;
			const tabletPos = columnLayout.tabletPosition || columnIndex;
			const tabletDivider = tabletPos !== 1;
			const mobilePos = columnLayout.mobilePosition || columnIndex;
			const mobileDivider = mobilePos !== 1;

			if (
				columnLayout.desktopDivider !== desktopDivider ||
				columnLayout.tabletDivider !== tabletDivider ||
				columnLayout.mobileDivider !== mobileDivider
			) {
				updateAttrs(column.clientId, {
					gridLayout: {
						...columnLayout,
						desktopDivider,
						tabletDivider,
						mobileDivider,
					},
				});
			}
		});
	};

	return (
		<ToolbarGroup>
			<Dropdown
				popoverProps={{
					placement: 'bottom-start',
				}}
				renderToggle={({ isOpen, onToggle }) => (
					<ToolbarButton
						onClick={onToggle}
						aria-expanded={isOpen}
						aria-label={`${deviceConfig.label} Span (${currentSpan})`}
					>
						{`Span: ${currentSpan}`}
					</ToolbarButton>
				)}
				renderContent={() => (
					<div
						style={{
							padding: '16px',
							minWidth: '280px',
						}}
					>
						<div
							style={{
								marginBottom: '8px',
								fontSize: '12px',
								fontWeight: 600,
								color: '#1e1e1e',
							}}
						>
							{deviceConfig.label} Column Span
						</div>
						<MarkedRangeControl
							value={currentSpan}
							onChange={handleSpanChange}
							withInputField={false}
							min={1}
							max={deviceConfig.spanMax}
							marks={deviceConfig.spanMarks}
						/>
					</div>
				)}
			/>
			{deviceType !== 'desktop' && (
				<Dropdown
					popoverProps={{
						placement: 'bottom-start',
					}}
					renderToggle={({ isOpen, onToggle }) => (
						<ToolbarButton
							onClick={onToggle}
							aria-expanded={isOpen}
							aria-label={`${deviceConfig.label} Order (${currentPosition})`}
						>
							{`Order: ${currentPosition}`}
						</ToolbarButton>
					)}
					renderContent={() => (
						<div
							style={{
								padding: '16px',
								minWidth: '280px',
							}}
						>
							<div
								style={{
									marginBottom: '8px',
									fontSize: '12px',
									fontWeight: 600,
									color: '#1e1e1e',
								}}
							>
								{deviceConfig.label} Column Order
							</div>
							<MarkedRangeControl
								value={currentPosition}
								onChange={handlePositionChange}
								withInputField={false}
								min={1}
								max={columnCount}
								marks={orderMarks}
								help="Visual position of this column"
							/>
						</div>
					)}
				/>
			)}
		</ToolbarGroup>
	);
}
