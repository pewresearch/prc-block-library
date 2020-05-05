import { withState } from '@wordpress/compose';
import { Form, Dimmer } from 'semantic-ui-react';

const defaultState = {
    error: false,
    loading: false,
    emailAddress: '',
    dimmerActive: false,
    dimmerMessage: 'BLANK DIMMER MESSAGE',
};

const MailchimpForm = withState(defaultState)(({
        display,
        interest,
        error,
        loading,
        emailAddress,
        dimmerActive,
        dimmerMessage,
        setState,
    }) => {

        const submitHandler = e => {
            e.preventDefault();

            if (true !== display) {
                return; // Never allow running this from inside Gutenberg.
            }

            // Request (POST wp-json/prc-api/v2/mailchimp/subscribe)
            const email = emailAddress;

            setState({ loading: true });

            setTimeout(() => {
                jQuery
                    .ajax({
                        url: `${
                            window.siteURL
                        }/wp-json/prc-api/v2/mailchimp/subscribe?${jQuery.param(
                            {
                                email,
                                interests: interest,
                            })}`,
                        type: 'POST',
                    })
                    .done(() => {
                        console.info('Succesfully subscribed');
                        setState({
                            dimmerMessage:
                                'You have succesfully subscribed to this newsletter.',
                        });
                    })
                    .fail(jqXHR => {
                        const failState = {
                            error: true,
                            dimmerMessage: '',
                        };
                        if ('add-member-error' === jqXHR.responseJSON.code) {
                            failState.dimmerMessage =
                                'This email address is already subscribed to this newsletter.';
                        } else {
                            failState.dimmerMessage =
                                'Unfortunatley we could not subscribe you to this newsletter at this time, please try again later.';
                        }
                        setState(failState);
                    })
                    .always(() => {
                        setState({
                            loading: false,
                            emailAddress: '',
                            dimmerActive: true,
                        });
                    });
            }, 2000);
        };

        return (
            <Dimmer.Dimmable
                as="div"
                id="js-mailchimp-form"
                dimmed={dimmerActive}
            >
                <Form
                    className="mailchimp"
                    error={error}
                    onSubmit={submitHandler}
                >
                    <Form.Field>
                        <Form.Input
                            placeholder="Email address"
                            type="email"
                            data-validate="mc-email"
                            required
                            onChange={e => {
                                setState({
                                    emailAddress: e.target.value,
                                });
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
                        setState({ dimmerActive: false });
                    }}
                >
                    <p className="sans-serif">
                        {dimmerMessage} (Click to close)
                    </p>
                </Dimmer>
            </Dimmer.Dimmable>
        );
    },
);

export default MailchimpForm;
