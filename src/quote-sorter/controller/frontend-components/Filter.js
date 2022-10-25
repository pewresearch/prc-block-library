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
}) {
	const [selectedValue, setSelectedValue] = useState('');
	return (
		<>
			<List horizontal>
				{typologies.map((option) => (
					<List.Item key={option.value}>
						<button
							type="button"
							value={option.value}
							onClick={(e, data) => {
								console.log({ e, data });
								onclick(e.target, data.value);
								setSelectedValue(option.value);
							}}
						>
							{option.label}
						</button>
					</List.Item>
				))}
			</List>
			{includeResetFilter && (
				<List horizontal className="reset-filter">
					<List.Item>
						<button
							type="button"
							basic
							active={'' === selectedValue}
							onClick={(e) => {
								onclick(e.target, '');
								setSelectedValue('');
							}}
						>
							{resetLanguage}
						</button>
					</List.Item>
				</List>
			)}
		</>
	);
}

export { QuoteSorterDropdown, QuoteSorterFilterInline };
