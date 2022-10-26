/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import Form from './form';

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

domReady(() => {
	const forms = document.querySelectorAll('.wp-block-prc-block-mailchimp-form');
	forms.forEach((elm) => {
		// Gather the classes and styles from the form element.
		const classes = elm.getAttribute('class');
		const segmentId = elm.getAttribute('data-segment-id');

		// Input
		const input = elm.querySelector('.wp-block-prc-block-form-input-text');
		const inputStyles = input.getAttribute('style') || '';
		const inputClasses = input.getAttribute('class') || '';
		// Button
		const buttonOuter = elm.querySelector('.wp-block-button');
		const button = elm.querySelector('.wp-block-button__link');
		const buttonWrapperClasses = buttonOuter.getAttribute('class') || '';
		const buttonWrapperStyles = buttonOuter.getAttribute('style') || '';
		const buttonStyles = button.getAttribute('style') || '';
		const buttonClasses = button.getAttribute('class') || '';

		// Create an element to render the form into.
		const attachPoint = document.createElement('div');
		elm.parentNode.insertBefore(attachPoint, elm);

		// Render the Form component.
		render(
			<Form
				{...{
					className: classes,
					input: {
						style: parseStylesString(inputStyles),
						className: inputClasses,
						type: input.getAttribute('type'),
						placeholder: input.getAttribute('placeholder'),
					},
					button: {
						wrapperClassName: buttonWrapperClasses,
						wrapperStyle: parseStylesString(buttonWrapperStyles),
						style: parseStylesString(buttonStyles),
						className: buttonClasses,
						text: button.innerText,
					},
					form: {
						segmentId,
					},
				}}
			/>,
			attachPoint,
		);

		// Remove the original element.
		elm.parentNode.removeChild(elm);
	});
});
