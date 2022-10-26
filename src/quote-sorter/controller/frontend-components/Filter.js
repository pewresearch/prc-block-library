/* eslint-disable no-param-reassign */
/**
 * External dependencies
 */
import { Dropdown } from 'semantic-ui-react';

function QuoteSorterDropdown({ typologies, placeholder, onchange }) {
	const options = typologies.map((option) => ({
		key: option.value,
		text: option.label,
		value: option.value,
	}));
	return (
		<Dropdown
			placeholder={placeholder}
			options={options}
			fluid
			selection
			search
			clearable
			onChange={(e, data) => {
				onchange(e.target, data.value);
			}}
		/>
	);
}

function QuoteSorterFilterInline({
	typologies,
	onclick,
	includeResetFilter,
	resetLanguage,
	buttonTextColor,
	buttonBackgroundColor,
	activeButtonTextColor,
	activeButtonBackgroundColor,
}) {
	const setButtonActive = (el) => {
		el.style.color = activeButtonTextColor;
		el.style.backgroundColor = activeButtonBackgroundColor;
		el.classList.add('active');
		const getSiblings = (node) =>
			[...node.parentNode.children].filter((c) => c !== node);
		getSiblings(el).forEach((sibling) => {
			sibling.style.color = buttonTextColor;
			sibling.style.backgroundColor = buttonBackgroundColor;
			sibling.classList.remove('active');
		});
		const resetButton = el.parentNode.parentNode.querySelector(
			'.button-group--reset button',
		);
		if (resetButton) {
			resetButton.style.color = buttonTextColor;
			resetButton.style.backgroundColor = buttonBackgroundColor;
			resetButton.classList.remove('active');
		}
	};
	const resetFilterStyles = (el) => {
		el.style.color = activeButtonTextColor;
		el.style.backgroundColor = activeButtonBackgroundColor;
		el.classList.add('active');
		const optionsContainer = el.parentNode.parentNode.querySelector(
			'.button-group--options',
		);
		if (optionsContainer) {
			optionsContainer.querySelectorAll('button').forEach((button) => {
				button.style.color = buttonTextColor;
				button.style.backgroundColor = buttonBackgroundColor;
				button.classList.remove('active');
			});
		}
	};
	return (
		<>
			<div className="button-group button-group--options">
				{typologies.map((option) => (
					<button
						type="button"
						value={option.value}
						style={{
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						}}
						onClick={(e) => {
							onclick(e.target, option.value);
							setButtonActive(e.target);
						}}
					>
						{option.label}
					</button>
				))}
			</div>
			{includeResetFilter && (
				<div className="button-group button-group--reset">
					<button
						type="button"
						className="active"
						basic
						style={{
							color: activeButtonTextColor,
							backgroundColor: activeButtonBackgroundColor,
						}}
						onClick={(e) => {
							onclick(e.target, '');
							resetFilterStyles(e.target);
						}}
					>
						{resetLanguage}
					</button>
				</div>
			)}
		</>
	);
}

export { QuoteSorterDropdown, QuoteSorterFilterInline };
