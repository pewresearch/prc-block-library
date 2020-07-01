import { Component, Fragment, RawHTML } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { Form, Input, Dimmer, Button } from 'semantic-ui-react';

const defaultState = {
    error: false,
    loading: false,
    list_id: '999f8eb858',
    choice: true, // Mailchimp ID for Quarterly Update newsletter
    dimmerActive: false,
    dimmerMessage: 'BLANK DIMMER MESSAGE',
};

const MailchimpOptDown = withState(defaultState)(({
        //display,
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

        const submitHandler = e => {
          e.preventDefault();
        };


        console.log(JSON.stringify(interests));
        console.log(emailAddress);

        return (
          <Form className="mailchimp-opt-down">
            <Form.Input
              label="Email"
              placeholder=""
              name="email"
              value={emailAddress}
              onChange={ e => { setState({emailAddress: e.target.value})}}
              />
              <p>choice: {choice ? `true` : `false`}</p>
              { interests.map( (d,i) =>
                <Form.Checkbox
                  inline
                  name="interests"
                  label={d.value === list_id ? `Send me quarterly updates and unsubscribe from all other newsletters.` : d.label }
                  value={d.value}
                  readonly={d.value !== list_id ? true : false }
                  defaultChecked={d.value === list_id ? true : false }
                  style={{ 'display' : d.value !== list_id ? `none` : `inherit` }}
                  onChange={ e => {
                        e.preventDefault();
                        setState({choice: !choice });
                      }
                    }
                />
              )}
            <Button>Update preferences</Button>
          </Form>
        );

    },

);

export default MailchimpOptDown;
