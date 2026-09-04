/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

export default function Crumb({
	addLeadingSeparator,
	crumbTitle,
	editableTitleField = undefined,
	isSelected,
	placeholder,
	separator,
	setAttributes,
	showSeparator,
	asIcon = false,
	hasDropdown = false,
}) {
	let crumbAnchor;
	let separatorSpan;

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

	const caret = hasDropdown ? (
		<span className="prc-block-breadcrumbs__caret" aria-hidden="true">
			<Icon icon="caret-down" library="solid" size={0.7} />
		</span>
	) : null;

	const itemClassName = hasDropdown
		? 'prc-block-breadcrumbs__item has-dropdown'
		: 'prc-block-breadcrumbs__item';

	if (asIcon) {
		/* eslint-disable jsx-a11y/anchor-is-valid */
		crumbAnchor = (
			<div className={itemClassName}>
				<a
					href="#"
					onClick={(event) => event.preventDefault()}
					aria-label={crumbTitle || __('Home')}
				>
					<Icon icon="house" library="solid" size={1} />
				</a>
				{caret}
			</div>
		);
		/* eslint-enable */
	} else if (editableTitleField) {
		/* eslint-disable jsx-a11y/anchor-is-valid */
		crumbAnchor = (
			<div className={itemClassName}>
				<a href="#" onClick={(event) => event.preventDefault()}>
					{isSelected ? (
						<RichText
							aria-label={__('Title override')}
							placeholder={placeholder}
							withoutInteractiveFormatting
							value={
								isDirty
									? (crumbTitle ?? placeholder)
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
				{caret}
			</div>
		);
		/* eslint-enable */
	} else if (crumbTitle) {
		/* eslint-disable jsx-a11y/anchor-is-valid */
		crumbAnchor = (
			<div className={itemClassName}>
				<a
					className="prc-block-breadcrumbs__link"
					href="#"
					onClick={(event) => event.preventDefault()}
				>
					{decodeEntities(crumbTitle)}
				</a>
				{caret}
			</div>
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
