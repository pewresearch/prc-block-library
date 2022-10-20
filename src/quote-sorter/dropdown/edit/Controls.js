/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import Sorter from '../../_shared/Sorter';

function Controls({ attributes, options, setAttributes }) {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Filter options')}>
					<TextControl
						label={__('Placeholder text')}
						value={attributes.placeholder}
						onChange={(value) => setAttributes({ placeholder: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Arrange dropdown order')}>
					<Sorter options={options} setAttributes={setAttributes} />
				</PanelBody>
				<PanelBody title={__('Filter Reset')}>
					<ToggleControl
						label={__('Include filter reset?')}
						checked={attributes.includeResetFilter}
						onChange={(value) => {
							setAttributes({ includeResetFilter: value });
						}}
					/>
					<TextControl
						label={__('Reset langauge')}
						value={attributes.resetLanguage}
						disabled={!attributes.includeResetFilter}
						onChange={(value) => setAttributes({ resetLanguage: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Dynamic Text Element')}>
					<ToggleControl
						label={__('Use dynamic text element?')}
						checked={attributes.hasDynamicTextElement}
						onChange={(value) => {
							setAttributes({ hasDynamicTextElement: value });
						}}
					/>
					<TextControl
						label={__('Dynamic Text Block ID')}
						placeholder={__('ex. d83a97da-eb12-4eac-a51f-e6facd850116')}
						value={attributes.dynamicTextBlockId}
						help={__(
							'This is the ID of the Dynamic Text Block you want to associate with this filter. The ID can be found by adding a Dynamic Text Block to your page.',
						)}
						disabled={!attributes.hasDynamicTextElement}
						onChange={(value) => setAttributes({ dynamicTextBlockId: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls />
		</Fragment>
	);
}

export default Controls;
