/**
 * External Dependencies
 */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useState, useEffect, Fragment, useRef } from '@wordpress/element';

const CAPTCHA_SITE_KEY = '0fe85c0d-1c67-498a-9b51-eb9d3b473970';

function hackCaptchaCheckboxStyle() {
	let target = document.querySelector(
		'iframe[title="Main content of the hCaptcha challenge"]',
	);
	target = target.parentElement.parentElement;
	if (target) {
		const checkbox = target.querySelector('div:last-of-type');
		if (null !== checkbox) {
			checkbox.style = {
				...checkbox.style,
				display: 'none',
			};
		}
	} else {
		hackCaptchaCheckboxStyle();
	}
}

export function parseStylesString(stylesString) {
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

function Action({
	className = '',
	style = {},
	input = null,
	button = null,
	value = null,
	error = false,
	success = false,
	processing = false,
	disabled = false,
	onChange = () => {},
	setToken = () => {},
}) {
	if (null === input || null === button) {
		return null;
	}
	const buttonClassNames = classnames(button.className, {
		'is-processing': processing,
		'is-disabled': disabled,
		'has-error': error,
		'has-success': success,
	});

	const [buttonText, setButtonText] = useState(button.text);

	useEffect(() => {
		if (processing) {
			setButtonText('Processing');
		} else if (error) {
			setButtonText('Error');
		} else if (success) {
			setButtonText('Success');
		} else {
			setButtonText(button.text);
		}
	}, [processing, error, success]);

	const captchaRef = useRef(null);

	return (
		<div className={className} style={style}>
			<input
				className={input.className}
				style={input.style}
				type={input.type}
				placeholder={input.placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
			<HCaptcha
				sitekey={CAPTCHA_SITE_KEY}
				theme="light"
				ref={captchaRef}
				onVerify={(t) => {
					setToken(t);
				}}
				onOpen={() => {
					hackCaptchaCheckboxStyle();
				}}
			/>
			<button
				type="submit"
				className={button.wrapperClassName}
				disabled={processing || disabled}
				style={{
					opacity: processing || disabled ? 0.5 : 1,
					...button.wrapperStyle,
				}}
				onClick={(e) => {
					e.preventDefault();
					if (false === disabled) {
						captchaRef.current.execute();
					}
				}}
			>
				<span style={button.style} className={buttonClassNames}>
					{buttonText}
				</span>
			</button>
		</div>
	);
}

function Checkbox({ className, style, value, checked, label, name, onChange }) {
	return (
		<div
			className={className}
			style={parseStylesString(style)}
			onClick={() => onChange(value)}
			role="checkbox"
			aria-checked={checked}
			tabIndex="0"
			onKeyDown={(event) => {
				if ('Enter' === event.key) {
					onChange(value);
				}
			}}
		>
			<input type="checkbox" name={name} value={value} checked={checked} />
			<label aria-controls={`${name}`}>{label}</label>
		</div>
	);
}

function Checkboxes({ checkboxes = [], selected = [], onChange }) {
	const [boxes, setBoxes] = useState([]);

	useEffect(() => {
		// Get the first checkbox.
		checkboxes.forEach((checkbox) => {
			const className = checkbox.getAttribute('class') || '';
			const style = checkbox.getAttribute('style') || '';
			const labelElm = checkbox.querySelector('label');
			const inputElm = checkbox.querySelector('input');
			const label = labelElm.innerText;
			const name = inputElm.getAttribute('name');
			const value = inputElm.getAttribute('value');

			const obj = {
				className,
				style,
				label,
				name,
				value,
			};

			setBoxes((oldBoxes) => [...oldBoxes, obj]);
		});
	}, [checkboxes]);

	return (
		<Fragment>
			{boxes.map(({ className, style, label, name, value }) => (
				<Checkbox
					{...{
						className,
						style,
						label,
						name,
						value,
						checked: selected.includes(value),
						onChange,
					}}
				/>
			))}
		</Fragment>
	);
}

export default function Form({
	className = '',
	checkboxes = [],
	action = {
		className: '',
		style: {},
		input: null,
		button: null,
	},
}) {
	// get the values from the already "checked" checkboxes.
	const initialChecked = [];
	const allCheckboxValues = [];
	checkboxes.forEach((checkbox) => {
		console.log('CHECKBOX=', checkbox);
		const inputElm = checkbox.querySelector('input');
		if (inputElm.getAttribute('checked')) {
			initialChecked.push(checkbox.getAttribute('value'));
		}
		allCheckboxValues.push(inputElm.getAttribute('value'));
	});

	const [selected, updateSelection] = useState(initialChecked);
	const [processing, setProcessing] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [value, setValue] = useState(null);

	// Captcha:
	const [token, setToken] = useState(false);

	const onChange = (newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (token) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [token]);

	return (
		<form className={className}>
			<Checkboxes
				checkboxes={checkboxes}
				selected={selected}
				onChange={(v) => {
					if ('select-all' === v) {
						console.log('Select all...', allCheckboxValues);
						if (selected.length === allCheckboxValues.length) {
							updateSelection([]);
						} else {
							updateSelection(allCheckboxValues);
						}
					} else if (selected.includes(v)) {
						updateSelection(selected.filter((e) => e !== v));
					} else {
						updateSelection([...selected, v]);
					}
				}}
			/>
			<Action
				{...{
					...action,
					processing,
					disabled,
					error,
					success,
					value,
					onChange,
					setToken,
				}}
			/>
		</form>
	);
}
