/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import useNavigationPanelsState from './use-navigation-panels-state';


function navLevelHelp(level) {
	switch (level) {
		case 'child':
			return 'Sets this navigation as a child of the nearest parent navigation. (Adds options to parent).';
		case 'parent':
			return 'Sets this navigation as a parent navigation.';
		default:
			return 'Render navigation independent of any hierarchical structure.';
	}
}

function layoutHelp(layout) {
	switch (layout) {
		case 'left':
			return 'Display navigation options in a fixed left block.';
		default: // top
			return 'Display navigation return options above the navigation panel only.';
	}
}

function createPanelOptions(panelSiblings) {
	return panelSiblings.map((block, index) => {
		return {
			label: `${index + 1}. ${block.attributes.label}`,
			value: index,
		};
	});
}

function InspectorPanel({ attributes, setAttributes, clientId }) {
	const { level, activePanelIndex, desktopLayout, mobileLayout, navigationStyle } = attributes;
	const { panelSiblings } = useNavigationPanelsState(clientId);

	return (
		<InspectorControls>
			<PanelBody title={__('Settings', 'navigation-panels')}>
				<SelectControl
					label={__('Navigation Level', 'navigation-panels')}
					value={level}
					help={navLevelHelp(level)}
					options={[
						{
							label: __('Independent', 'navigation-panels'),
							value: 'independent',
						},
						{
							label: __('Parent', 'navigation-panels'),
							value: 'parent',
						},
						{
							label: __('Child', 'navigation-panels'),
							value: 'child',
						},
					]}
					onChange={(value) => setAttributes({ level: value })}
					__nextHasNoMarginBottom
				/>
				<SelectControl
					label={__('Default Panel', 'navigation-panels')}
					value={activePanelIndex}
					help={__(
						'Pre-selected panel. On top layout, content stays hidden until the user opens it.',
						'navigation-panels'
					)}
					options={[
						...createPanelOptions(panelSiblings),
					]}
					onChange={(value) =>
						setAttributes({ activePanelIndex: +value })
					}
					__nextHasNoMarginBottom
				/>
			</PanelBody>
			<PanelBody title={__('Style', 'navigation-panels')}>
				<SelectControl
					label={__('Navigation Style', 'navigation-panels')}
					value={navigationStyle}
					help={__('Select a navigation option style', 'navigation-panels')}
					options={[
						{
							label: __('No Style', 'navigation-panels'),
							value: 'none',
						},
						{
							label: 'Caret ( ▶ )',
							value: 'play',
							// icon: {panelUp}
						},
						{
							label: __('Chevron ( ❯ )', 'navigation-panels'),
							value: 'angle-right',
						},
					]}
					onChange={(value) => setAttributes({ navigationStyle: value })}
					__nextHasNoMarginBottom
				/>
				<UnitControl
					label={__('Navigation width', 'navigation-panels')}
					value={attributes.optionsMinWidth}
					onChange={(value) => setAttributes({ optionsMinWidth: value })}
					help={__('Minimum width of the navigation options column.', 'navigation-panels')}
				/>
				<SelectControl
					label={__('Desktop Layout', 'navigation-panel')}
					value={desktopLayout}
					help={layoutHelp(desktopLayout)}
					options={[
						{
							label: __('Left', 'navigation-panels'),
							value: 'left',
						},
						{
							label: __('Top', 'navigation-panels'),
							value: 'top',
						},
					]}
					onChange={(value) =>
						setAttributes({ desktopLayout: value })
					}
					__nextHasNoMarginBottom
				/>
				<SelectControl
					label={__('Mobile Layout', 'navigation-panel')}
					value={mobileLayout}
					help={layoutHelp(mobileLayout)}
					options={[
						{
							label: __('Left', 'navigation-panels'),
							value: 'left',
						},
						{
							label: __('Top', 'navigation-panels'),
							value: 'top',
						},
					]}
					onChange={(value) => setAttributes({ mobileLayout: value })}
					__nextHasNoMarginBottom
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	return (
		<Fragment>
			<InspectorPanel
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
		</Fragment>
	);
}
