/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import {
	justifyBottom,
	justifyCenterVertical,
	justifyStretchVertical,
	justifyTop,
} from '@wordpress/icons';

export const DEFAULT_VERTICAL_ALIGNMENT = 'center';
export const VERTICAL_ALIGNMENT_CONTROLS = [
	'top',
	'center',
	'bottom',
	'stretch',
];

const ALIGNMENT_OPTIONS = [
	{
		value: 'top',
		icon: justifyTop,
		label: __('Align top'),
	},
	{
		value: 'center',
		icon: justifyCenterVertical,
		label: __('Align middle'),
	},
	{
		value: 'bottom',
		icon: justifyBottom,
		label: __('Align bottom'),
	},
	{
		value: 'stretch',
		icon: justifyStretchVertical,
		label: __('Stretch to fill'),
	},
];

/**
 * Toolbar and Layout-panel Alignment controls, including Stretch.
 *
 * Gutenberg's vertical flex Alignment UI omits Stretch, so the slide owns this
 * control and writes `layout.verticalAlignment`.
 *
 * @param {Object}   props
 * @param {string}   props.clientId
 * @param {Object}   props.layout
 * @param {Function} props.setAttributes
 * @return {*} Alignment toolbar and inspector controls.
 */
export default function AlignmentControls({ clientId, layout, setAttributes }) {
	const verticalAlignment =
		layout?.verticalAlignment ?? DEFAULT_VERTICAL_ALIGNMENT;

	function handleVerticalAlignmentChange(value) {
		setAttributes({
			layout: {
				type: 'flex',
				orientation: 'vertical',
				justifyContent: 'center',
				...layout,
				verticalAlignment: value ?? DEFAULT_VERTICAL_ALIGNMENT,
			},
		});
	}

	return (
		<>
			<BlockControls group="block">
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={handleVerticalAlignmentChange}
					controls={VERTICAL_ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
			<InspectorControls group="layout">
				<ToolsPanelItem
					label={__('Alignment')}
					hasValue={() =>
						verticalAlignment !== DEFAULT_VERTICAL_ALIGNMENT
					}
					onDeselect={() =>
						handleVerticalAlignmentChange(
							DEFAULT_VERTICAL_ALIGNMENT
						)
					}
					isShownByDefault
					panelId={clientId}
				>
					<ToggleGroupControl
						__next40pxDefaultSize
						label={__('Alignment')}
						value={verticalAlignment}
						onChange={handleVerticalAlignmentChange}
						className="block-editor-hooks__flex-layout-alignment-controls"
					>
						{ALIGNMENT_OPTIONS.map(({ value, icon, label }) => (
							<ToggleGroupControlOptionIcon
								key={value}
								value={value}
								icon={icon}
								label={label}
							/>
						))}
					</ToggleGroupControl>
				</ToolsPanelItem>
			</InspectorControls>
		</>
	);
}
