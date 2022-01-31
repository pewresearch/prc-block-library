/**
 * External Dependencies
 */
import { Form, Input, Dimmer, Button, Message } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { addQueryArgs, getQueryArg, isEmail } from '@wordpress/url';

const MailchimpOptDown = ({}) => {
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ choice, setChoice ] = useState(false);
	const [ dimmerActive, setDimmerActive ] = useState(false);
	const [ dimmerMessage, setDimmerMessage ] = useState('');
	const [ emailAddress, setEmailAddress ] = useState(getQueryArg(window.location, 'email'));

	const quarteryNewsletterId = 'a33430a835';

	const submitHandler = e => {
		e.preventDefault();

		setLoading(true);
		setDimmerActive(false);

		if (!isEmail(emailAddress)) {
			setDimmerMessage('Please enter a valid email address');
			setError(true);
			setLoading(false);
			setDimmerActive(true);
			return;
		}

		apiFetch({
            path: addQueryArgs(
				'prc-api/v2/mailchimp/quarterly-opt-out/',
				{
					email: emailAddress,
				}
			),
            method: 'POST',
        }).then( p => {
            console.info('Succesfully updated', p);
			setLoading(false);
			setError(false);
			setDimmerActive(true);
			setDimmerMessage('You have succesfully updated your preferences.');
        }).catch( e=> {
			console.log(e);
			setLoading(false);
			setError(true);
			setDimmerActive(true);
			if (e.responseJSON.data.status == '404') {
				setDimmerMessage('We could not find that email address in our records.');
			}
		});
	};

	//

	return (
		<Fragment>
			<Message
			style={{fontFamily: 'franklin-gothic-urw'}}
			color={ error ? 'red' : 'green'}
			hidden={!dimmerActive }>
				{dimmerMessage}
			</Message>
			<Form className="mailchimp-opt-down">
				<Form.Field>
					<Form.Input
					label="Email"
					placeholder="Your email address"
					name="email"
					data-validate="mc-email"
					required
					value={emailAddress}
					onChange={ e => { setEmailAddress(e.target.value) } }
					size="big"
					/>
				</Form.Field>
				<Form.Field>
					<Form.Checkbox
					inline
					name="interests"
					label="Send me quarterly updates and unsubscribe from all other newsletters."
					value={quarteryNewsletterId}
					onChange={ e => { console.log("Click", e); setChoice(true); } }
					/>
				</Form.Field>
				<Button disabled={ !choice || document.querySelector('body.wp-admin') } onClick={submitHandler} loading={loading}>Update preferences</Button>
			</Form>
		</Fragment>
	  );
}

export default MailchimpOptDown;
