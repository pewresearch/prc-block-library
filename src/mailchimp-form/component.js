/**
 * WordPress dependencies
 */
import { Fragment, useState, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * External dependencies
 */
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Internal dependencies
 */
import { Form, Icon } from 'semantic-ui-react';
import './style.scss';

const BUTTON_COLORS = [
	{ name: 'primary', color: '#2185d0' },
	{ name: 'secondary', color: '#000' },
	{ name: 'mustard', color: '#d3aa20' },
	{ name: 'basic', color: '#fff' },
];

const CAPTCHA_SITE_KEY = '6LeotpUeAAAAACBX3-8ty2-Q1mSJIdbqBVnvHg0O';

const getColorName = (color) => {
	const matched = BUTTON_COLORS.filter((c) => c.color === color);
	if (1 <= matched.length) {
		return `${matched[0].name}`;
	}
	return null;
};

function MailchimpForm({
	display,
	interest,
	buttonColor,
	hasDarkBackground,
	blockProps = { className: '' },
}) {
	const [buttonText, changeButtonText] = useState('SIGN UP');
	const [success, toggleSuccess] = useState(false);
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);
	const [emailAddress, setEmail] = useState('');
	const recaptchaRef = useRef(null);

	const buttonColorName = getColorName(buttonColor);

	const subscribed = () => {
		toggleError(false);
		toggleLoading(false);
		toggleSuccess(true);
		changeButtonText(<Icon name="check circle" />);
		setEmail('');
	};

	const verifyAndSubmit = async () => {
		console.log('verifying');
		const token = await recaptchaRef.current.executeAsync();
		console.log('sending token: ', token);
		submitHandler(token);
		recaptchaRef.current.reset();
	};

	const submitHandler = (token) => {
		if (!token) {
			toggleSuccess(false);
			toggleError(true);
			changeButtonText('ERROR');
			changeButtonColor('red');
			return;
		}

		if (true !== display) {
			toggleLoading(true);
			setTimeout(() => {
				subscribed();
			}, 2000);
			return; // Never allow running this from inside Gutenberg.
		}

		const email = emailAddress;

		toggleLoading(true);

		setTimeout(() => {
			apiFetch({
				path: `/prc-api/v2/mailchimp/subscribe/?email=${email}&interests=${interest}&captcha_token=${token}`,
				method: 'POST',
				// TODO: Add nonce verification here.
			})
				.then(() => {
					subscribed();
				})
				.catch((e) => {
					toggleLoading(false);
					if ('add-member-error' === e.code) {
						subscribed();
						console.info(`${emailAddress} already subscribed to ${interest}`);
					} else {
						toggleSuccess(false);
						toggleError(true);
						changeButtonText('ERROR');
					}
				});
		}, 2000);
	};
	return (
		<div {...blockProps}>
			<Form className="mailchimp" error={error} onSubmit={verifyAndSubmit}>
				{blockProps.className.includes('is-style-horizontal') && (
					<Form.Group>
						<Form.Input
							placeholder="Email address"
							data-validate="mc-email"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={emailAddress}
						/>
						<ReCAPTCHA
							sitekey={CAPTCHA_SITE_KEY}
							ref={recaptchaRef}
							size="invisible"
						/>

						<Form.Button
							color={
								'primary' !== buttonColorName && 'secondary' !== buttonColorName
									? buttonColorName
									: null
							}
							basic={'basic' === buttonColorName}
							inverted={'basic' === buttonColorName && hasDarkBackground}
							primary={'primary' === buttonColorName}
							secondary={'secondary' === buttonColorName}
							positive={success}
							negative={error}
							loading={loading}
							icon={success}
						>
							{buttonText}
						</Form.Button>
					</Form.Group>
				)}
				{!blockProps.className.includes('is-style-horizontal') && (
					<Form.Field>
						<Form.Input
							placeholder="Email address"
							data-validate="mc-email"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={emailAddress}
						/>
						<ReCAPTCHA
							sitekey={CAPTCHA_SITE_KEY}
							ref={recaptchaRef}
							size="invisible"
						/>
						<Form.Button
							color={
								'primary' !== buttonColorName && 'secondary' !== buttonColorName
									? buttonColorName
									: null
							}
							basic={'basic' === buttonColorName}
							inverted={'basic' === buttonColorName && hasDarkBackground}
							primary={'primary' === buttonColorName}
							secondary={'secondary' === buttonColorName}
							positive={success}
							negative={error}
							loading={loading}
							icon={success}
						>
							{buttonText}
						</Form.Button>
					</Form.Field>
				)}
			</Form>
		</div>
	);
}

export default MailchimpForm;
