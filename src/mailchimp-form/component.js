import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Form, Dimmer } from 'semantic-ui-react';

import './style.scss';

const MailchimpForm = ({ display, interest, className }) => {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [emailAddress, setEmail] = useState('');
    const [dimmerActive, toggleDimmer] = useState(false);
    const [dimmerMessage, setDimmerMessage] = useState('n/a');

    const reset = enableDimmer => {
        toggleError(false);
        toggleLoading(false);
        setEmail('');
        if (true !== enableDimmer) {
            toggleDimmer(false);
            setDimmerMessage('');
        }
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
                .then(res => {
                    console.log(res);
                    console.info('Succesfully subscribed');
                    setDimmerMessage(
                        'You have succesfully subscribed to this newsletter.',
                    );
                    toggleDimmer(true);
                })
                .then(() => {
                    reset(true);
                })
                .catch(e => {
                    toggleError(true);
                    if ('add-member-error' === e.code) {
                        setDimmerMessage(
                            'This email address is already subscribed to this newsletter.',
                        );
                    } else {
                        setDimmerMessage(
                            'Unfortunatley we could not subscribe you to this newsletter at this time, please try again later.',
                        );
                    }
                    toggleDimmer(true);
                });
        }, 2000);
    };

    return (
        <Dimmer.Dimmable
            as="div"
            id="js-mailchimp-form"
            dimmed={dimmerActive}
            className={className}
        >
            <Form className="mailchimp" error={error} onSubmit={submitHandler}>
                <Form.Field>
                    <Form.Input
                        placeholder="Email address"
                        type="email"
                        data-validate="mc-email"
                        required
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={emailAddress}
                    />
                    <Form.Button
                        secondary
                        loading={loading}
                        content="SIGN UP"
                    />
                </Form.Field>
            </Form>

            <Dimmer
                active={dimmerActive}
                onClickOutside={() => {
                    reset();
                }}
            >
                <p className="sans-serif">{dimmerMessage} (Click to close)</p>
            </Dimmer>
        </Dimmer.Dimmable>
    );
};

export default MailchimpForm;
