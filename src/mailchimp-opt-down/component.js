import { Component, Fragment, RawHTML } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { Form, Input, Dimmer, Button } from 'semantic-ui-react';

const { interests } = window.prcMailchimpForm;

class MailchimpOptDown extends Component {
  constructor(props) {
    super( props );
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {

  }

  render() {
    //console.log(interests);
    return (
      <Form>
        <Form.Input label="Email" placeholder='joe@schmoe.com' name="email"/>
          { window.prcMailchimpForm.interests.map( (d,i) =>
            <Form.Checkbox
              inline
              name="interest"
              label={d.label}
              value={d.value}
              checked={ d.label === "Quarterly Update" }
              hidden={ d.label !== "Quarterly Update" }
            />
          )}
        <Button>Update preferences</Button>
      </Form>
    );
  }


}

export default MailchimpOptDown;
