/**
 * Integrate Print Engine with Block Visibility inspector controls instead of
 * custom advanced controls. This adds a new "Print" panel (under the existing
 * Block Visibility UI) with two mutually exclusive toggles: Hide on Print and
 * Display on Print. State is stored inside the Block Visibility attribute so
 * that visibility presets/control sets can (in the future) incorporate it.
 *
 * Backwards compatibility: existing content may still have a root-level
 * `printEngine` attribute (added by PHP). We continue to read that on render
 * (see PHP changes) but new edits write to `blockVisibility.printEngine`.
 */

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { dispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import InformationPopover from './info';

const PrintVisibilityControls = (props) => {
	const { blockAtts, setAttributes, enabledControls } = props;
	const controlActive = enabledControls.some(
		( control ) => control.settingSlug === 'print_engine' && control.isActive
	);

	if ( ! controlActive ) {
		return null;
	}

	const current = blockAtts?.printEngine || {
		hideOnPrint: false,
		displayOnPrint: false,
	};

	const { hideOnPrint, displayOnPrint } = current;

	const update = ( values ) => {
		setAttributes( {
			blockVisibility: {
				...blockAtts,
				printEngine: {
					...current,
					...values,
				},
			},
		} );
	};

	return (
		<div className="controls-panel-item print-engine-block-control" style={{
			padding: '0 1em',
		}}>
			<h3 className="controls-panel-item__header" style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'flex-start',
				gap: '0.25em',
				marginTop: 0,
			}}>
				<span>{__('Print Visibility', 'prc-platform')}</span>
				<InformationPopover
					message={ __(
						"The Print control allows you to manage the visibility of this block when printing.",
						'block-visibility'
					) }
					position="bottom center"
				/>
			</h3>
			<div className="controls-panel-item__control-fields">
				<ToggleControl
					label={__('Hide on Print', 'prc-platform')}
					checked={!!hideOnPrint}
					help={__(
						'Hides this block when the page is printed. Block remains visible on screen.',
						'prc-platform'
					)}
					onChange={() =>
						update({ hideOnPrint: !hideOnPrint, displayOnPrint: hideOnPrint ? displayOnPrint : false })
					}
				/>
				<ToggleControl
					label={__('Display Only on Print', 'prc-platform')}
					checked={!!displayOnPrint}
					help={__(
						'Only shows this block when the page is printed. Hidden on screen.',
						'prc-platform'
					)}
					onChange={() =>
						update({ displayOnPrint: !displayOnPrint, hideOnPrint: displayOnPrint ? hideOnPrint : false })
					}
				/>
			</div>
		</div>
	);
};

const PrintVisibilitySettings = (props) => {
	const { visibilityControls, setVisibilityControls } = props;

	return (
		<div><p>Print Visibility Enable?</p></div>
	);
}

// Attach our controls to Block Visibility's inspector controls via filter.
addFilter(
	'blockVisibility.addInspectorControls',
	'prc/print-engine-visibility-controls',
	(Original) => (props) => (
		<>
			<Original {...props} />
			<PrintVisibilityControls {...props} />
		</>
	)
);

// Register the printEngine sub-attribute on the Block Visibility attribute schema.
addFilter(
	'blockVisibility.attributes',
	'prc/print-engine-visibility-attributes',
	( attributeSpec ) => {
		if (
			attributeSpec?.blockVisibility?.properties &&
			! attributeSpec.blockVisibility.properties.printEngine
		) {
			attributeSpec.blockVisibility.properties.printEngine = {
				type: 'object',
				properties: {
					hideOnPrint: { type: 'boolean', default: false },
					displayOnPrint: { type: 'boolean', default: false },
				},
			};
		}
		return attributeSpec;
	}
);

addFilter(
	'blockVisibility.controls',
	'prc/print-engine-visibility-controls',
	(controls) => {
		const printEngineControl = {
			attributeSlug: 'printEngine',
			label: __('Print', 'prc-platform'),
			settingSlug: 'print_engine',
		}
		return [...controls, printEngineControl];
	}
);
