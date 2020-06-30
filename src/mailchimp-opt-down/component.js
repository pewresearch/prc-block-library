import { Component, Fragment, RawHTML } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { Form, Input, Dimmer, Button } from 'semantic-ui-react';

const query = new URLSearchParams(window.location.search);

const defaultState = {
    error: false,
    loading: false,
    choice: '999f8eb858', // Mailchimp ID for Quarterly Update newsletter
    emailAddress: typeof query.get('email') !== 'undefined' ? query.get('email') : ``,
    //interests: typeof window.prcMailchimpForm !== 'undefined' ? window.prcMailchimpForm.interests : window.prcMailchimpBlock.interests,
    dimmerActive: false,
    dimmerMessage: 'BLANK DIMMER MESSAGE',

};

const MailchimpOptDown = withState(defaultState)(({
        //display,
        //interests,
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

      const checkboxHandler = e => {
        e.preventDefault();
      };

      //console.log(JSON.stringify(interests));
      console.log(emailAddress);

      return (
        <Form className="mailchimp-opt-down">
          <Form.Input
            label="Email"
            placeholder=""
            name="email"
            value={emailAddress}
            onChange={e => { setState({emailAddress: e.target.value})}}
            />
            { window.prcMailchimpBlock.interests.map( (d,i) =>
              <Form.Checkbox
                inline
                name="interests"
                label={d.label}
                value={d.value}
                checked={ d.value === choice }
                style={{ 'display' : d.value !== choice ? `none` : `inherit` }}
              />
            )}
          <Button>Update preferences</Button>
        </Form>
      );
    },
);


/*
class MailchimpOptDown extends Component {
  constructor(props) {
    super( props );
    this.submitHandler = this.submitHandler.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
    this.choice = '999f8eb858'; // Mailchimp ID for Quarterly Update newsletter
    const query = new URLSearchParams(window.location.search);
    this.email = typeof query.get('email') !== 'undefined' ? query.get('email') : ``;
    this.interests = typeof window.prcMailchimpForm !== 'undefined' ? window.prcMailchimpForm.interests : window.prcMailchimpBlock.interests;
    this.submitted = false;
  }

  submitHandler(e) {

  }

  checkboxHandler(e) {

  }



  render() {
    return (
      <Form className="mailchimp-opt-down">
        <Form.Input label="Email" placeholder="" name="email" value={this.email} />
          { this.interests.map( (d,i) =>
            <Form.Checkbox
              inline
              name="interests"
              label={d.label}
              value={d.value}
              checked={ d.value === this.choice }
              style={{ 'display' : d.value !== this.choice ? `none` : `inherit` }}
            />
          )}
        <Button>Update preferences</Button>
      </Form>
    );
  }


}

export default MailchimpOptDown;
*/

export default MailchimpOptDown;
