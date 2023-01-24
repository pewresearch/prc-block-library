/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */

// import Dropdown from '../../../../prc-scripts/src/@prc/components/form-input-dropdown/index';
import { Dropdown } from '@prc/components';

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

function onChange(value) {
	console.log('ON CHANGE');
	console.log(value);
}

domReady(() => {
	const dropdowns = document.querySelectorAll(
		'.wp-block-prc-block-form-input-dropdown',
	);
	dropdowns.forEach((elm) => {
		// Gather the classes and styles from the dropdown element.
		const classes = elm.getAttribute('class');

		// Variations attributes
		const search = elm.getAttribute('search');
		const multiple = elm.getAttribute('multiple');
		const multipleSearch = elm.getAttribute('multiple-search');
		const placeholder = elm.getAttribute('placeholder');
		const inline = elm.getAttribute('inline');

		// Create an element to render the dropdown into.
		const attachPoint = document.createElement('div');
		elm.parentNode.insertBefore(attachPoint, elm);

		// Options
		const options = elm.querySelectorAll(
			'.wp-block-prc-block-form-input-dropdown-item',
		);
		const optionsArray = Array.from(options);
		const parsedOptions = optionsArray.map((option, index) => ({
			style: option.style,
			className: option.attributes.class.value,
			content: option.attributes['data-title'].value,
			value: option.attributes['data-value'].value,
			index,
		}));

		const dropDownBlockArgs = {
			active: false || 'wp-block-prc-block-form-input-dropdown--active',
		};
		if (!window.prcBlocks) {
			window.prcBlocks = dropDownBlockArgs;
		} else {
			window.prcBlocks['form-input-dropdown'] = dropDownBlockArgs;
		}

		// Run this on dropdown initial click....
		function checkId(elm) {
			const id = elm.getAttribute('id');
			const { active } = window.prcBlocks.dropDownBlockArgs;
			if (false !== id && active !== id) {
				// do close function against window.prcBlocks.dropDownBlockArgs.active id
				console.log('CLOSING OTHER DROPDOWNS');
			}
		}

		// Render the Dropdown component.
		render(
			<Dropdown
				{...{
					className: classes,
					options: parsedOptions,
					onChange,
					search,
					multiple,
					multipleSearch,
					placeholder,
					inline,
					checkId,
				}}
			/>,
			attachPoint,
		);
		// Remove the original element.
		elm.parentNode.removeChild(elm);
	});
});
