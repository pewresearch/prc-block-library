/**
 * WordPress dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { Form, Icon } from 'semantic-ui-react';
import './style.scss';

const MailchimpForm = ({
    display,
    interest,
    blockProps = { className: '' },
}) => {
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
                path: `/prc-api/v2/mailchimp/subscribe/?email=${email}&interests=${interest}`,
                method: 'POST',
                // TODO: Add nonce verification here.
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
        <div {...blockProps}>
            <Form className="mailchimp" error={error} onSubmit={submitHandler}>
                {blockProps.className.includes('is-style-horizontal') && (
                    <Form.Group>
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
                    </Form.Group>
                )}
                {!blockProps.className.includes('is-style-horizontal') && (
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
                )}
            </Form>
        </div>
    );
};

export default MailchimpForm;
