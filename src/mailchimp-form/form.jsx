/**
 * External Dependencies
 */
import HCaptcha from '@hcaptcha/react-hcaptcha';

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
	onProcessing,
	emailAddress,
	token = false,
	interest = false,
}) => {
	if (!token) {
		return onError("We couldn't verify you're not a robot. Please try again.");
	}

	const email = emailAddress;

	onProcessing(true);

	const url = document.URL;
	if (!isURL(url)) {
		return onError('Invalid URL');
	}

	const path = `/prc-api/v2/mailchimp/subscribe/?=${buildQueryString({
		email,
		captcha_token: token,
		interests: interest,
		api_key: 'mailchimp-form',
		origin_url: url,
	})}`;

	const apiPromise = apiFetch({
		path,
		method: 'POST',
	})
		.then(() => onSuccess())
		.catch((e) => {
			onProcessing(false);
			return onError(e);
		});

	return apiPromise;
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

	const [value, setValue] = useState('');

	// Captcha:
	const [token, setToken] = useState(false);
	const [displayCaptcha, setCaptchaDisplay] = useState(false);
	const toggleCaptchaDisplay = () => setCaptchaDisplay(!displayCaptcha);
	const captchaRef = useRef(null);

	useEffect(() => {
		console.log('Form value...', value);
	}, [value]);

	useEffect(() => {
		if (false !== token && true !== processing) {
			submitHandler({
				onSuccess: () => {
					setProcessing(false);
					setValue('');
					setToken(false);
					setCaptchaDisplay(false);
					console.log('Success!');
					return true;
				},
				onError: (e) => {
					setProcessing(false);
					setToken(false);
					setCaptchaDisplay(false);
					console.log('Error!', e);
					return false;
				},
				onProcessing: (newProcessingState) => {
					setProcessing(newProcessingState);
					return processing;
				},
				emailAddress: value,
				token: 'mailchimp-form',
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
						style={{
							background: 'none',
							border: 'none',
							padding: 0,
							fontSize: 'inherit',
						}}
						onClick={(e) => {
							e.preventDefault();
							toggleCaptchaDisplay();
						}}
					>
						<span style={button.style} className={button.className}>
							{button.text}
						</span>
					</button>
				</Fragment>
			)}
			{displayCaptcha && (
				<HCaptcha
					sitekey={CAPTCHA_SITE_KEY}
					theme="light"
					onVerify={setToken}
					ref={captchaRef}
					onOpen={() => {
						console.log('Captcha opened...');
					}}
				/>
			)}
		</form>
	);
}
