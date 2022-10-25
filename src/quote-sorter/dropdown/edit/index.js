/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect, Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { SelectControl, ButtonGroup, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = [];

const isStyle = (needle, haystack) => {
	const arr = haystack.split(' ');
	return arr.includes(needle);
};

const edit = ({ attributes, className, setAttributes, context }) => {
	const { placeholder, sortedTypologies, includeResetFilter, resetLanguage } =
		attributes;
	const typologies = JSON.parse(context['prc-block/quote-sorter-typologies']);
	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});
	const allTypologies = Object.keys(typologies).map((key) => ({
		label: typologies[key].name,
		name: typologies[key].name,
		value: key,
		disabled: false,
	}));
	useEffect(() => {
		setAttributes({
			sortedTypologies:
				0 < sortedTypologies.length ? sortedTypologies : allTypologies,
		});
	}, [sortedTypologies, allTypologies]);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		className: 'ui selection dropdown',
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});
	const buttonStyles = {
		backgroundColor: attributes.buttonBackgroundColor,
		color: attributes.buttonTextColor,
	};
	return (
		<div {...innerBlocksProps}>
			<Controls
				attributes={attributes}
				options={sortedTypologies}
				setAttributes={setAttributes}
				activeButtonBackgroundColor={attributes.activeButtonBackgroundColor}
				activeButtonTextColor={attributes.activeButtonTextColor}
				buttonBackgroundColor={attributes.buttonBackgroundColor}
				buttonTextColor={attributes.buttonTextColor}
			/>
			{isStyle('is-style-list-inline', blockProps.className) && (
				<Fragment>
					<div className="button-group">
						{sortedTypologies
							.filter((option) => !option.disabled)
							.map((option) => (
								<button
									type="button"
									variant="secondary"
									key={option.value}
									style={buttonStyles}
								>
									{option.label}
								</button>
							))}
					</div>
					{includeResetFilter && (
						<div className="button-group">
							<button
								type="button"
								variant="secondary"
								key="reset"
								style={buttonStyles}
							>
								{resetLanguage}
							</button>
						</div>
					)}
				</Fragment>
			)}
			{isStyle('is-style-list-column', blockProps.className) && (
				<div className="button-group">
					{sortedTypologies
						.filter((option) => !option.disabled)
						.map((option) => (
							<button
								type="button"
								variant="secondary"
								key={option.value}
								style={buttonStyles}
							>
								{option.label}
							</button>
						))}
					{includeResetFilter && (
						<button
							type="button"
							variant="secondary"
							key="reset"
							style={buttonStyles}
						>
							{resetLanguage}
						</button>
					)}
				</div>
			)}
			{isStyle('is-style-dropdown', blockProps.className) && (
				<SelectControl
					options={sortedTypologies.filter((option) => !option.disabled)}
					onChange={(e) => {
						console.log(e);
						// setSelectedOption(selectedItem);
					}}
					// value={selectedOption.label}
				/>
			)}
		</div>
	);
};

export default edit;
