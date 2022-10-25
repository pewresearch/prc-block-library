/* eslint-disable no-param-reassign */
/**
 * External dependencies
 */
import { Dropdown, List, Button } from 'semantic-ui-react';
import { useState } from '@wordpress/element';

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
				console.log(data);
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
	const [selectedValue, setSelectedValue] = useState('');
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
	};
	return (
		<>
			<div className="button-group">
				{typologies.map((option) => (
					<button
						type="button"
						value={option.value}
						style={{
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						}}
						onClick={(e) => {
							console.log({ e, option });
							onclick(e.target, option.value);
							setButtonActive(e.target);
							setSelectedValue(option.value);
						}}
					>
						{option.label}
					</button>
				))}
			</div>
			{includeResetFilter && (
				<div className="button-group">
					<button
						type="button"
						basic
						active={'' === selectedValue}
						style={{
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
						}}
						onClick={(e) => {
							onclick(e.target, '');
							setSelectedValue('');
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
