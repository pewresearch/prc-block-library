/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
	RangeControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function DividerControls({
	dividerStyle,
	dividerWidth,
	dividerInset,
	setAttributes,
}) {
	return (
		<InspectorControls>
			<PanelBody title={__('Divider')} initialOpen={false}>
				<VStack spacing="1.5em">
					<ToggleGroupControl
						label={__('Style')}
						value={dividerStyle || 'solid'}
						onChange={(value) =>
							setAttributes({ dividerStyle: value })
						}
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
						<ToggleGroupControlOption
							value="none"
							label={__('None')}
						/>
					</ToggleGroupControl>
					<RangeControl
						label={__('Width')}
						value={dividerWidth || 1}
						onChange={(value) =>
							setAttributes({ dividerWidth: value })
						}
						min={1}
						max={4}
						withInputField={false}
						marks={[
							{ value: 1, label: '1px' },
							{ value: 2, label: '2px' },
							{ value: 3, label: '3px' },
							{ value: 4, label: '4px' },
						]}
					/>
					<RangeControl
						label={__('Inset')}
						value={dividerInset || 0}
						onChange={(value) =>
							setAttributes({ dividerInset: value })
						}
						min={0}
						max={48}
						help={__('Shortens dividers from their ends.')}
					/>
				</VStack>
			</PanelBody>
		</InspectorControls>
	);
}
