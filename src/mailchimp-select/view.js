/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Form, { parseStylesString } from './form';

domReady(() => {
	const forms = document.querySelectorAll(
		'.wp-block-prc-block-mailchimp-select',
	);
	forms.forEach((elm) => {
		// Gather the classes and styles from the form element.
		const classes = elm.getAttribute('class');
		// Checkboxes
		const checkboxes = elm.querySelectorAll(
			'.wp-block-prc-block-form-input-checkbox',
		);
		// Group "Action"
		const groupBlock = elm.querySelector('.wp-block-group');
		const groupBlockClasses = groupBlock.getAttribute('class') || '';
		// Input
		const input = groupBlock.querySelector(
			'.wp-block-prc-block-form-input-text',
		);
		const inputStyles = input.getAttribute('style') || '';
		const inputClasses = input.getAttribute('class') || '';
		// Button
		const buttonOuter = groupBlock.querySelector('.wp-block-button');
		const button = groupBlock.querySelector('.wp-block-button__link');
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
					checkboxes,
					action: {
						className: groupBlock.getAttribute('class') || '',
						style: parseStylesString(groupBlockClasses),
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
					},
				}}
			/>,
			attachPoint,
		);

		// Remove the original element.
		elm.parentNode.removeChild(elm);
	});
});
