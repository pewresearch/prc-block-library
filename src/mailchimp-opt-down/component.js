import { Component, Fragment, RawHTML } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { Form, Input, Dimmer, Button, Message } from 'semantic-ui-react';

const defaultState = {
    error: false,
    loading: false,
    list_id: 'a33430a835', // Mailchimp ID for Quarterly Update newsletter
    choice: true,
    dimmerActive: false,
    dimmerMessage: '',
};

const MailchimpOptDown = withState(defaultState)(({
        list_id,
        interests,
        error,
        loading,
        choice,
        emailAddress,
        dimmerActive,
        dimmerMessage,
        setState,
    }) => {

        const validate_email = e => {
          return /^.+@.+\..+$/.test(e);
        };

        const submitHandler = e => {
          e.preventDefault();
          setState({
            loading:true,
            dimmerActive: false
          });
          const email = emailAddress;
          if (!validate_email(email)) {
            console.log('email error');
            setState({
              dimmerMessage: 'Please enter a valid email address.' ,
              error: true,
              loading:false,
              dimmerActive: true
            });

            return;
          }
          let updated_interests = {};

          jQuery.each(jQuery("input[name='interests']"), function(){
              jQuery.extend(updated_interests, {[jQuery(this).val()] : jQuery(this).is(":checked") ? true : false });
          });

          setTimeout(() => {
              jQuery
                  .ajax({
                      url: `${
                          window.siteURL
                      }/wp-json/prc-api/v2/mailchimp/update?${jQuery.param(
                          {
                              email,
                              interests: updated_interests,
                          })}`,
                      type: 'POST',
                  })
                  .fail( e => {
                    console.log(e);
                    if (e.responseJSON.data.status == '404') {
                      setState({
                          dimmerMessage:
                              'We could not find that email address in our records.',
                          error: true,
                          loading:false,
                          dimmerActive: true
                      });
                    }
                  })
                  .done(() => {
                      console.info('Succesfully subscribed');
                      setState({
                          dimmerMessage:
                              'You have succesfully updated your preferences.',
                          error: false,
                          loading:false,
                          dimmerActive: true
                      });
                  })
          });

        };


        console.log(JSON.stringify(interests));
        console.log(emailAddress);

        return (
          <>
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
                onChange={ e => { setState({emailAddress: e.target.value}) } }
                size="big"
                />
                </Form.Field>
                { interests.map( (d,i) =>
                  <Form.Field>
                    <Form.Checkbox
                      inline
                      name="interests"
                      label={<label style={{fontFamily: 'franklin-gothic-urw'}}> {d.value === list_id ? `Send me quarterly updates and unsubscribe from all other newsletters.` : d.label }</label>}
                      value={d.value}
                      readonly={d.value !== list_id ? true : false }
                      defaultChecked={d.value === list_id ? true : false }
                      style={{ 'display' : d.value !== list_id ? `none` : `inherit` }}
                      onChange={ e => { setState({choice: !choice }) } }
                    />
                  </Form.Field>
                )}
              <Button disabled={ !choice || document.querySelector('body.wp-admin') } onClick={submitHandler} loading={loading}>Update preferences</Button>
            </Form>
          </>
        );
    },
);

export default MailchimpOptDown;