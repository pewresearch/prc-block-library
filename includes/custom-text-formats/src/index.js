/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat, registerFormatType } from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@wordpress/block-editor';

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

const underline = {
	name: 'custom-text-formats/underline',
	title: __('Underline'),
	tagName: 'span',
	icon: 'editor-underline',
	className: null,
	attributes: {
		style: 'style',
	},
	edit: (params) => {
		const { value, onChange, isActive } = params;
		const onToggle = () => {
			onChange(
				toggleFormat(value, {
					type: 'custom-text-formats/underline',
					attributes: {
						style: 'text-decoration: underline;',
					},
				})
			);
		};

		return (
			<Fragment>
				<RichTextShortcut
					type="primary"
					character="u"
					onUse={onToggle}
				/>
				<RichTextToolbarButton
					icon="editor-underline"
					title={__('Underline')}
					onClick={onToggle}
					isActive={isActive}
				/>
			</Fragment>
		);
	},
};

const formats = [reverseFont, underline];

formats.forEach((format) => {
	registerFormatType(format.name, {
		...format,
	});
});
