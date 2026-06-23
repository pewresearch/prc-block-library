/**
 * Divider style + inset controls for a core/group using the native grid layout.
 *
 * The divider color is handled by the existing InteriorDividerControls (color
 * panel). These controls add the grid-aware style (solid/dashed/dotted/none) and
 * inset, and only render when the group uses grid layout.
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	RangeControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function GridDividerControls({
	attributes,
	setAttributes,
	clientId,
}) {
	const { layout, dividerStyle, dividerInset } = attributes;

	if (layout?.type !== 'grid') {
		return null;
	}

	return (
		<InspectorControls group="border">
			<ToolsPanelItem
				label={__('Divider Style', 'core-group')}
				hasValue={() => dividerStyle && dividerStyle !== 'solid'}
				onDeselect={() => setAttributes({ dividerStyle: 'solid' })}
				panelId={clientId}
			>
				<ToggleGroupControl
					__nextHasNoMarginBottom
					label={__('Divider Style', 'core-group')}
					value={dividerStyle || 'solid'}
					onChange={(value) => setAttributes({ dividerStyle: value })}
					isBlock
				>
					<ToggleGroupControlOption
						value="solid"
						label={__('Solid', 'core-group')}
					/>
					<ToggleGroupControlOption
						value="dashed"
						label={__('Dashed', 'core-group')}
					/>
					<ToggleGroupControlOption
						value="dotted"
						label={__('Dotted', 'core-group')}
					/>
					<ToggleGroupControlOption
						value="none"
						label={__('None', 'core-group')}
					/>
				</ToggleGroupControl>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={__('Divider Inset', 'core-group')}
				hasValue={() => (dividerInset || 0) > 0}
				onDeselect={() => setAttributes({ dividerInset: 0 })}
				panelId={clientId}
			>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Divider Inset', 'core-group')}
					value={dividerInset || 0}
					onChange={(value) => setAttributes({ dividerInset: value })}
					min={0}
					max={48}
					help={__(
						'Shortens dividers from their ends.',
						'core-group'
					)}
				/>
			</ToolsPanelItem>
		</InspectorControls>
	);
}
