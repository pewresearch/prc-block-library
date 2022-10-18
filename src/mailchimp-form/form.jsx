/**
 * External Dependencies
 */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { isURL, buildQueryString } from '@wordpress/url';

const CAPTCHA_SITE_KEY = '0fe85c0d-1c67-498a-9b51-eb9d3b473970';

const submitHandler = ({
	onSuccess,
	onError,
	emailAddress,
	captchaToken = false,
	closeCaptcha,
	interest = false,
}) => {
	if (!captchaToken) {
		return onError("We couldn't verify you're not a robot. Please try again.");
	}

	closeCaptcha();

	const email = emailAddress;

	const url = document.URL;
	if (!isURL(url)) {
		return onError('Invalid URL');
	}

	const path = `/prc-api/v2/mailchimp/subscribe/?${buildQueryString({
		email,
		captcha_token: captchaToken,
		interests: interest,
		api_key: 'mailchimp-form',
		origin_url: url,
	})}`;

	const apiPromise = apiFetch({
		path,
		method: 'POST',
	})
		.then(() => onSuccess())
		.catch((e) => onError(e));

	return apiPromise;
};

const hackCaptchaCheckboxStyle = () => {
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
};

export default function Form({
	className,
	input = {
		style: '',
		className: '',
		type: 'email',
		placeholder: '',
	},
	button = {
		style: '',
		className: '',
		text: '',
	},
	form = {
		segmentId: false,
	},
}) {
	const [processing, setProcessing] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [value, setValue] = useState(null);
	const [buttonText, setButtonText] = useState(button.text);

	// Captcha:
	const [token, setToken] = useState(false);
	const [displayCaptcha, setCaptchaDisplay] = useState(false);
	const toggleCaptchaDisplay = () => setCaptchaDisplay(!displayCaptcha);
	const captchaRef = useRef(null);

	const buttonClassNames = classnames(button.className, {
		'is-processing': processing,
		'is-disabled': disabled,
		'has-error': error,
		'has-success': success,
	});

	useEffect(() => {
		console.log('Form value...', value);
		if (value) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [value]);

	useEffect(() => {
		if (false !== token && true !== processing) {
			setProcessing(true);
			setButtonText('Processing...');
			submitHandler({
				onSuccess: () => {
					setButtonText('Signed up!');
					setSuccess(true);
					setProcessing(false);
					setValue('');
					setToken(false);
					setError(false);
					console.log('Success!');
					return true;
				},
				onError: (e) => {
					setButtonText('Error!');
					setProcessing(false);
					setToken(false);
					console.log('Error!', e);
					return false;
				},
				emailAddress: value,
				captchaToken: token,
				closeCaptcha: () => setCaptchaDisplay(false),
				interest: form.segmentId,
			});
		}
	}, [token, processing]);

	return (
		<form className={className}>
			{!displayCaptcha && (
				<Fragment>
					<input
						type={input.type}
						placeholder={input.placeholder}
						style={input.style}
						className={input.className}
						onChange={(e) => setValue(e.target.value)}
						value={value}
					/>
					<button
						type="submit"
						className="wp-block-button"
						disabled={processing || disabled}
						style={{
							background: 'none',
							border: 'none',
							padding: 0,
							fontSize: 'inherit',
							opacity: processing || disabled ? 0.5 : 1,
						}}
						onClick={(e) => {
							e.preventDefault();
							if (false === disabled) {
								toggleCaptchaDisplay();
							}
						}}
					>
						<span style={button.style} className={buttonClassNames}>
							{buttonText}
						</span>
					</button>
				</Fragment>
			)}
			{displayCaptcha && (
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
			)}
		</form>
	);
}
