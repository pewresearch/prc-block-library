/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useEffect } from '@wordpress/element';
import {
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const DEFAULT_BLOCK = {
	name: 'prc-block/form-input-checkbox',
	attributesToCopy: ['className', 'fontFamily', 'fontSize', 'type'],
};

const TEMPLATE = [
	[
		'prc-block/form-input-checkbox',
		{
			type: 'radio',
		},
	],
]

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                  Properties passed to the function.
 * @param {Object}   props.attributes       Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.checkboxColor
 * @param            props.setCheckboxColor
 * @param {Function} props.setAttributes    Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	__unstableLayoutClassNames: layoutClassNames
}) {
	const { label, required, metadata } = attributes;
	const { name } = metadata || {};

	const blockProps = useBlockProps({
		className: clsx(
			layoutClassNames,
			{
				'is-required': required,
			}
		),
	});

	const innerBlockProps = useInnerBlocksProps(blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		template: TEMPLATE,
		templateLock: false,
	});

	return (
		<>
			<div {...innerBlockProps}>
				<Controls
					{...{
						attributes,
						setAttributes,
					}}
				/>
				<RichText
					tagName="label"
					placeholder={__('Radio Group Label...', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						const camelCaseLabel = newLabel.replace(/<[^>]*>/g, '').replace(/(?:^| )(\w)/g, (_, letter) => letter.toUpperCase()).replace(/^./, str => str.toLowerCase());
						setAttributes({ label: newLabel, metadata: { ...attributes.metadata, name: camelCaseLabel } });
					}}
					__unstableOnSplitAtEnd={() => onEnterSplit()}
				/>
				{innerBlockProps.children}
			</div>
		</>
	);
}
