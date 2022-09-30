/**
 * WordPress Dependencies
 */
import { hydrate, useEffect, useState } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

function parseStylesString(stylesString) {
	// check if stylesString is empty.
	if (!stylesString) {
		return {};
	}
	return stylesString
		.split(';')
		.filter((style) => style)
		.reduce((acc, style) => {
			const [key, value] = style.split(':');
			// convert key to camelCase.
			const camelCaseKey = key
				.split('-')
				.map((word, index) => {
					if (0 === index) {
						return word;
					}
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join('');
			acc[camelCaseKey] = value;
			return acc;
		}, {});
}

function parseClassesString(classesString) {
	// check if classesString is empty.
	if (!classesString) {
		return [];
	}
	return classesString.split(' ').filter((className) => className);
}

function Form({
	input = {
		styles: '',
		classes: '',
		type: 'email',
		placeholder: '',
	},
	button = {
		styles: '',
		classes: '',
		text: '',
	},
	form = {
		segmentId: false,
	},
}) {
	// Split up inputStyles into an object.
	const inputStylesObj = parseStylesString(input.styles);
	// Split up inputClasses into an array.
	const inputClassesArr = parseClassesString(input.classes);
	// Split up buttonStyles into an object.
	const buttonStylesObj = parseStylesString(button.styles);
	// Split up buttonClasses into an array.
	const buttonClassesArr = parseClassesString(button.classes);

	const [value, setValue] = useState('');

	useEffect(() => {
		console.log('Form value...', value);
	});

	return (
		<form>
			<input
				type={input.type}
				placeholder={input.placeholder}
				style={inputStylesObj}
				className={inputClassesArr.join(' ')}
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			<button
				type="submit"
				className="wp-block-button"
				style={{
					background: 'none',
					border: 'none',
					padding: 0,
					fontSize: 'inherit',
				}}
			>
				<span style={buttonStylesObj} className={buttonClassesArr.join(' ')}>
					{button.text}
				</span>
			</button>
		</form>
	);
}

domReady(() => {
	const forms = document.querySelectorAll('.wp-block-prc-block-mailchimp-form');
	forms.forEach((elm) => {
		const segmentId = elm.getAttribute('data-segment-id');

		const input = elm.querySelector('.wp-block-prc-block-form-input-field');
		const button = elm.querySelector('.wp-block-button__link');

		const inputStyles = input.getAttribute('style');
		const inputClasses = input.getAttribute('class');
		const buttonStyles = button.getAttribute('style');
		const buttonClasses = button.getAttribute('class');
		hydrate(
			<Form
				{...{
					input: {
						styles: inputStyles,
						classes: inputClasses,
						type: input.getAttribute('type'),
						placeholder: input.getAttribute('placeholder'),
					},
					button: {
						styles: buttonStyles,
						classes: buttonClasses,
						text: button.innerText,
					},
					form: {
						segmentId,
					},
				}}
			>
				{elm.innerHTML}
			</Form>,
			elm,
		);
	});
});
