/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { toggleFormat, registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

// import { Icon } from '@prc/icons';

const reverseFont = {
	name: 'custom-text-formats/toggle-serif',
	title: __('Toggle Serif Font'),
	tagName: 'span',
	className: 'has-sans-serif-font-family',
	attributes: null,
	edit: (params) => {
		const { value, onChange, isActive } = params;
		const onToggle = () => {
			// if has class 'has-sans-serif-font-family' remove it and add 'has-serif-font-family'
			// if has class 'has-serif-font-family' remove it and add 'has-sans-serif-font-family'
			onChange(
				toggleFormat(value, {
					type: 'custom-text-formats/toggle-serif',
					className: isActive
						? 'has-serif-font-family'
						: 'has-sans-serif-font-family',
				})
			);
		};

		return (
			<RichTextToolbarButton
				title={__('Toggle Serif Font')}
				onClick={onToggle}
				isActive={isActive}
			/>
		);
	},
};

const formats = [reverseFont];

formats.forEach((format) => {
	registerFormatType(format.name, {
		...format,
	});
});
