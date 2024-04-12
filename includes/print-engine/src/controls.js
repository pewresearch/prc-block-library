/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

function Controls({ attributes, setAttributes }) {
	const { printEngine } = attributes;

	const { hideOnPrint, displayOnPrint } = printEngine || {};

	return (
		<InspectorAdvancedControls>
			<ToggleControl
				label={__('Hide on Print')}
				checked={hideOnPrint}
				help={__(
				`This will hide the block on print, on other media types this block will be displayed.`)}
				onChange={() =>
					setAttributes({
						printEngine: {
							...attributes.printEngine,
							hideOnPrint: !hideOnPrint,
						},
					})
				}
			/>
			<ToggleControl
				label={__('Display on Print')}
				checked={displayOnPrint}
				help={__(
				`This will only display the block on print, on other media types this block will be hidden.`)}
				onChange={() =>
					setAttributes({
						printEngine: {
							...attributes.printEngine,
							displayOnPrint: !displayOnPrint,
						},
					})
				}
			/>
		</InspectorAdvancedControls>
	);
}

/**
 * Add the printEngine controls to all blocks.
 */
addFilter(
	'editor.BlockEdit',
	`prc-print-engine-controls`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function PrintEngineControls(props) {
				const { name, attributes, setAttributes, clientId } = props;
				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes }}
						/>
					</Fragment>
				);
			},
		'withPRCPrintEngineControls'
	),
	100
);
