/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexItem,
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

function TooltipControls({ attributes, setAttributes }) {
	const {
		tooltipFormat,
		tooltipActive,
		tooltipOffsetX,
		tooltipCategoryActive,
		tooltipOffsetY,
		tooltipCaretPosition,
	} = attributes;
	return (
		<PanelBody title={__('Tooltip')} initialOpen={false}>
			<ToggleControl
				label={__('Show Tooltip')}
				checked={tooltipActive}
				onChange={() => setAttributes({ tooltipActive: !tooltipActive })}
			/>
			<ToggleControl
				label={__('Show Category')}
				help={__('Show the category name in the tooltip')}
				checked={tooltipCategoryActive}
				onChange={() =>
					setAttributes({
						tooltipCategoryActive: !tooltipCategoryActive,
					})
				}
			/>
			<PanelRow>Tooltip Positioning</PanelRow>
			<PanelRow>
				Determines the position of tooltip relative to it's data point
			</PanelRow>
			<Flex>
				<FlexItem>
					<NumberControl
						label={__('DX')}
						value={tooltipOffsetX}
						disabled={!tooltipActive}
						onChange={(value) =>
							setAttributes({
								tooltipOffsetX: formatNum(value, 'integer'),
							})
						}
					/>
				</FlexItem>
				<FlexItem>
					<NumberControl
						label={__('DY')}
						value={tooltipOffsetY}
						disabled={!tooltipActive}
						onChange={(value) =>
							setAttributes({
								tooltipOffsetY: formatNum(value, 'integer'),
							})
						}
					/>
				</FlexItem>
			</Flex>
			<SelectControl
				label={__('Caret Position')}
				value={tooltipCaretPosition}
				options={[
					{
						value: 'bottom',
						label: 'Bottom',
					},
					{
						value: 'left',
						label: 'Left',
					},
				]}
				onChange={(orientation) => {
					setAttributes({
						tooltipCaretPosition: orientation,
					});
				}}
			/>
			<TextControl
				label={__('Tooltip Format')}
				help={__(
					"Tooltip formatter is a string that takes two variables. The first variable(%1$s) corresponds with the x value of a node, and the second(%2$s), the y value. (eg. '%1$s: %2$s people' would return something like '2010: 500 people')",
				)}
				disabled={!tooltipActive}
				value={tooltipFormat}
				placeholder="%1$s: %2$s"
				onChange={(val) => setAttributes({ tooltipFormat: val })}
			/>
		</PanelBody>
	);
}

export default TooltipControls;
