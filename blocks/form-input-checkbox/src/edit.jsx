/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { anchor, label, type, defaultChecked, required } = attributes;

	const blockProps = useBlockProps({
		className: classnames({
			'is-required': required,
		})
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, context: false }} />
			<div {...blockProps}>
				<input
					type={type}
					id={anchor}
					name={anchor}
					required={required}
					checked={defaultChecked}
				/>
				<RichText
					tagName="label"
					placeholder={__('Label', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						setAttributes({ label: newLabel });
					}}
					__unstableOnSplitAtEnd={() => onEnterSplit()}
				/>
			</div>
		</Fragment>
	);
}
