/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { Form, Icon } from 'semantic-ui-react';
import './style.scss';

const MailchimpForm = ({ display, interest, className }) => {
    const [buttonText, changeButtonText] = useState('SIGN UP');
    const [success, toggleSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [emailAddress, setEmail] = useState('');

    const subscribed = () => {
        toggleError(false);
        toggleLoading(false);
        toggleSuccess(true);
        changeButtonText(<Icon name="check circle" />);
        setEmail('');
    };

    const submitHandler = e => {
        e.preventDefault();

        if (true !== display) {
            return; // Never allow running this from inside Gutenberg.
        }

        const email = emailAddress;

        toggleLoading(true);

        setTimeout(() => {
            apiFetch({
                path: `/prc-api/v2/mailchimp/subscribe/?email=${email}&interests=${interest}`,
                method: 'POST',
            })
                .then(() => {
                    subscribed();
                })
                .catch(e => {
                    toggleLoading(false);
                    if ('add-member-error' === e.code) {
                        subscribed();
                        console.info(
                            `${emailAddress} already subscribed to ${interest}`,
                        );
                    } else {
                        toggleSuccess(false);
                        toggleError(true);
                        changeButtonText('ERROR');
                    }
                });
        }, 2000);
    };

    return (
        <div className={className}>
            <Form className="mailchimp" error={error} onSubmit={submitHandler}>
                <Form.Field>
                    <Form.Input
                        placeholder="Email address"
                        data-validate="mc-email"
                        required
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={emailAddress}
                    />
                    <Form.Button
                        secondary
                        positive={success}
                        negative={error}
                        loading={loading}
                        icon={success}
                    >
                        {buttonText}
                    </Form.Button>
                </Form.Field>
            </Form>
        </div>
    );
};

export default MailchimpForm;
