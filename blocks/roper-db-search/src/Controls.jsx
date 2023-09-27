/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	SelectControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { subText, perPage, type } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Roper DB Settings')}>
				<TextControl
					label={__('Sub Text')}
					value={subText}
					onChange={(v) => setAttributes({ subText: v })}
				/>
				<BaseControl label={__('Per Page')}>
					<NumberControl
						value={perPage}
						min={5}
						max={20}
						onChange={(v) => setAttributes({ perPage: v })}
					/>
				</BaseControl>
				<SelectControl
					label={__('Type')}
					value={type}
					options={[
						{ label: 'Default', value: 'default' },
						{ label: 'Global', value: 'global' },
					]}
					onChange={(v) => setAttributes({ type: v })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
