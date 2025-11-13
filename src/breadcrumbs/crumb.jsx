/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal Dependencies
 */

export default function Crumb({
	addLeadingSeparator,
	crumbTitle,
	editableTitleField = undefined,
	isSelected,
	placeholder,
	separator,
	setAttributes,
	showSeparator,
}) {
	let crumbAnchor;
	let separatorSpan;

	// Keep track of whether or not the title field has been edited.
	// This allows the default site title to be rendered as full "real" text.
	// Then, when it's edited, if the title is removed, it is displayed as a placeholder,
	// until the block is de-selected, where it is then treated as real text again.
	const [isDirty, setIsDirty] = useState();

	useEffect(() => {
		if (!isSelected) {
			setIsDirty(false);
		}
	}, [isSelected]);

	if (separator || isSelected) {
		separatorSpan = (
			<span className="prc-block-breadcrumbs__separator">
				<RichText
					aria-label={__('Separator character')}
					placeholder={__('/')}
					withoutInteractiveFormatting
					value={separator}
					onChange={(html) => setAttributes({ separator: html })}
				/>
			</span>
		);
	}

	if (editableTitleField) {
		/* eslint-disable jsx-a11y/anchor-is-valid */
		crumbAnchor = (
			<div className="prc-block-breadcrumbs__item">
				<a href="#" onClick={(event) => event.preventDefault()}>
					{isSelected ? (
						<RichText
							aria-label={__('Title override')}
							placeholder={placeholder}
							withoutInteractiveFormatting
							value={
								isDirty
									? crumbTitle ?? placeholder
									: crumbTitle || placeholder
							}
							onChange={(html) => {
								setIsDirty(true);
								setAttributes({ [editableTitleField]: html });
							}}
						/>
					) : (
						crumbTitle || placeholder
					)}
				</a>
			</div>
		);
		/* eslint-enable */
	} else if (crumbTitle) {
		/* eslint-disable jsx-a11y/anchor-is-valid */
		crumbAnchor = (
			<a className="prc-block-breadcrumbs__item" href="#" onClick={(event) => event.preventDefault()}>
				{decodeEntities(crumbTitle)}
			</a>
		);
		/* eslint-enable */
	}

	return (
		<>
		{addLeadingSeparator ? separatorSpan : null}
		{crumbAnchor}
		{showSeparator ? separatorSpan : null}
		</>
	);
}
