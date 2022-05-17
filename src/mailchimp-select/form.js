/**
 * External dependencies
 */
import { Form, Message, Icon } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import './style.scss';

const CAPTCHA_SITE_KEY = '6LeotpUeAAAAACBX3-8ty2-Q1mSJIdbqBVnvHg0O';

function CBox({ label, value, watchWord, userSelected = [], onChange }) {
	const checked =
		(Array.isArray(value) &&
			0 !== value.filter((e) => userSelected.includes(e)).length) ||
		userSelected.includes(value);
	return (
		<Form.Checkbox
			label={__(label.replace(watchWord, ''))}
			checked={checked}
			onChange={() => onChange(value)}
		/>
	);
}

function List({ interests, selected, userSelected, onChange }) {
	return (
		<Fragment>
			{interests
				.filter((e) => selected.includes(e.value))
				.map((i, index, data) => {
					// Get all the sub items that are selected
					const subItems = data.filter((e) => e.label.includes('Religion - '));
					// Get all the sub items values
					const subItemsValues = subItems.map((c) => c.value);
					// If there are subitems and this item is the first subitems value then mark true
					const isFirstSubItem =
						0 !== subItemsValues.length && subItemsValues[0] === i.value;
					//
					const isSubItem = subItemsValues.includes(i.value);

					const label = !isSubItem ? i.label : 'Religion & Public Life';

					return (
						<Fragment>
							{!isSubItem && (
								<CBox
									label={__(label)}
									value={i.value}
									watchWord="Mini-course - "
									onChange={onChange}
									userSelected={userSelected}
								/>
							)}
							{isSubItem && isFirstSubItem && (
								<Fragment>
									<CBox
										label={__(label)}
										value={[...subItemsValues]}
										onChange={onChange}
										userSelected={userSelected}
									/>
									<div
										style={{
											paddingLeft: '1.7rem',
											paddingBottom: '1.5rem',
										}}
									>
										{subItems.map((d) => (
											<CBox
												label={d.label}
												value={d.value}
												watchWord="Religion - "
												onChange={onChange}
												userSelected={userSelected}
											/>
										))}
									</div>
								</Fragment>
							)}
						</Fragment>
					);
				})}
		</Fragment>
	);
}

function FormList({ interests, selected, allowSubmissions = false }) {
	const [userSelection, setSelected] = useState([]);
	const [buttonText, changeButtonText] = useState('SIGN UP');
	const [buttonColor, changeButtonColor] = useState('mustard');
	const [loading, toggleLoading] = useState(false);
	const [userEmail, setEmail] = useState('');
	const [isError, toggleError] = useState(false);
	const [isSuccess, toggleSuccess] = useState(false);
	const [message, setMessage] = useState({ header: false, body: false });
	const recaptchaRef = useRef(null);
	const invalidEmailError = {
		content: 'Please enter a valid email address',
		pointing: 'below',
	};

	const verifyAndSubmit = async () => {
		const token = await recaptchaRef.current.executeAsync();
		onSubmit(token);
		recaptchaRef.current.reset();
	};

	const onSubmit = (token) => {
		if (!token) {
			allowSubmissions = false;
			toggleSuccess(false);
			toggleError(true);
			changeButtonText('ERROR');
			changeButtonColor('red');
			setMessage({
				header: 'Error',
				body: 'Your reCAPTCHA verification has expired or failed. Please try again later.',
			});
		}
		console.log('allowSubmission?', allowSubmissions, userSelection);
		if (!allowSubmissions) {
			return;
		}
		toggleLoading(true);
		apiFetch({
			path: `/prc-api/v2/mailchimp/subscribe/?email=${userEmail}&interests=${userSelection}&captcha_token=${token}`,
			method: 'POST',
		})
			.then((res) => {
				console.log(res);
				changeButtonText(<Icon name="check circle" />);
				changeButtonColor('green');
				setMessage({
					header: 'Success',
					body: 'You have succesfully subsrcibed to these newsletter(s)',
				});
				toggleSuccess(true);
				toggleError(false);
			})
			.catch((err) => {
				console.error(err);
				toggleSuccess(false);
				toggleError(true);
				changeButtonText('ERROR');
				changeButtonColor('red');
				setMessage({
					header: 'Error',
					body: 'Unfortunately we could not susbscribe you at this time. Please try again later.',
				});
			})
			.finally(() => {
				toggleLoading(false);
			});
	};

	const updateSelection = (s) => {
		let tmp = userSelection;
		if (
			(Array.isArray(s) && 0 !== s.filter((e) => tmp.includes(e)).length) ||
			tmp.includes(s)
		) {
			if (Array.isArray(s)) {
				s.forEach((a) => {
					const index = tmp.indexOf(a);
					if (-1 !== index) {
						tmp.splice(index, 1);
					}
				});
			} else {
				const index = tmp.indexOf(s);
				if (-1 !== index) {
					tmp.splice(index, 1);
				}
			}
		} else if (Array.isArray(s)) {
			tmp = tmp.concat(s);
		} else {
			tmp.push(s);
		}
		setSelected([...tmp]);
	};

	return (
		<Form onSubmit={verifyAndSubmit} success={isSuccess} error={isError}>
			{0 === selected.length && (
				<Form.Checkbox
					disabled
					label={__(`Select Mailchimp Segment Interests In Block Settings`)}
				/>
			)}
			<List
				interests={interests}
				selected={selected}
				userSelected={userSelection}
				onChange={updateSelection}
			/>
			<Form.Checkbox
				className="blue-link"
				label={__(`SELECT ALL`)}
				onChange={() => updateSelection(selected)}
				disabled={loading}
			/>
			{(isSuccess || isError) && (
				<Message
					success={isSuccess}
					error={isError}
					header={message.header}
					content={message.body}
				/>
			)}
			<Form.Group>
				<Form.Input
					value={userEmail}
					placeholder={__(`Enter your email`)}
					onChange={(e, { value }) => setEmail(value)}
					error={isError}
					disabled={loading}
				/>
			</Form.Group>
			<Form.Group>
				<div
					style={{
						marginBottom: '1rem',
						marginTop: '1rem',
						paddingLeft: '0.5em',
						paddingRight: '0.5em',
					}}
				>
					<ReCAPTCHA
						sitekey={CAPTCHA_SITE_KEY}
						ref={recaptchaRef}
						size="invisible"
					/>
				</div>
			</Form.Group>
			<Form.Group>
				<Form.Button loading={loading} color={buttonColor}>
					{buttonText}
				</Form.Button>
			</Form.Group>
		</Form>
	);
}

export default FormList;
