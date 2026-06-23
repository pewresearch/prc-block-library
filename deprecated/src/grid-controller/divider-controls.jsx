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

export default function DividerControls({
	dividerStyle,
	dividerInset,
	setAttributes,
	clientId,
}) {
	return (
		<InspectorControls group="border">
			<ToolsPanelItem
				label={__('Divider Style')}
				hasValue={() => dividerStyle && dividerStyle !== 'solid'}
				onDeselect={() => setAttributes({ dividerStyle: 'solid' })}
				panelId={clientId}
			>
				<ToggleGroupControl
					label={__('Divider Style')}
					value={dividerStyle || 'solid'}
					onChange={(value) => setAttributes({ dividerStyle: value })}
					isBlock
				>
					<ToggleGroupControlOption
						value="solid"
						label={__('Solid')}
					/>
					<ToggleGroupControlOption
						value="dashed"
						label={__('Dashed')}
					/>
					<ToggleGroupControlOption
						value="dotted"
						label={__('Dotted')}
					/>
					<ToggleGroupControlOption value="none" label={__('None')} />
				</ToggleGroupControl>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={__('Divider Inset')}
				hasValue={() => (dividerInset || 0) > 0}
				onDeselect={() => setAttributes({ dividerInset: 0 })}
				panelId={clientId}
			>
				<RangeControl
					label={__('Divider Inset')}
					value={dividerInset || 0}
					onChange={(value) => setAttributes({ dividerInset: value })}
					min={0}
					max={48}
					help={__('Shortens dividers from their ends.')}
				/>
			</ToolsPanelItem>
		</InspectorControls>
	);
}
