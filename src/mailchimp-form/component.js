/**
 * External dependencies
 */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Form, Icon } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import './style.scss';

const BUTTON_COLORS = [
	{ name: 'primary', color: '#2185d0' },
	{ name: 'secondary', color: '#000' },
	{ name: 'mustard', color: '#d3aa20' },
	{ name: 'basic', color: '#fff' },
];

const CAPTCHA_SITE_KEY = '0fe85c0d-1c67-498a-9b51-eb9d3b473970';

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

	// Captcha
	const [displayCaptcha, toggleDisplayCaptcha] = useState(false);
	const [token, setToken] = useState(false);

	const buttonColorName = getColorName(buttonColor);

	const subscribed = () => {
		toggleError(false);
		toggleLoading(false);
		toggleSuccess(true);
		changeButtonText(
			<Fragment>
				<Icon name="check circle" /> SUBSCRIBED
			</Fragment>,
		);
		setEmail('');
	};

	const submitHandler = () => {
		if (!token) {
			toggleSuccess(false);
			toggleError(true);
			changeButtonText('ERROR');
			// changeButtonColor('red');
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

	useEffect(() => {
		console.log('TOKEN: ', token);
		if (false !== token) {
			toggleDisplayCaptcha(false);
			submitHandler();
		}
	}, [token]);

	const isHorizontalStyle = blockProps.className.includes(
		'is-style-horizontal',
	);

	return (
		<div {...blockProps}>
			<Form
				className="mailchimp"
				error={error}
				onSubmit={() => toggleDisplayCaptcha(true)}
			>
				{displayCaptcha && (
					<HCaptcha
						sitekey={CAPTCHA_SITE_KEY}
						theme={hasDarkBackground ? 'dark' : 'light'}
						size="normal"
						onVerify={setToken}
					/>
				)}
				{!displayCaptcha && isHorizontalStyle && (
					<Form.Group>
						<Form.Input
							placeholder="Email address"
							data-validate="mc-email"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={emailAddress}
							type="email"
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
				{!displayCaptcha && !isHorizontalStyle && (
					<Form.Field>
						<Form.Input
							placeholder="Email address"
							data-validate="mc-email"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={emailAddress}
							type="email"
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
