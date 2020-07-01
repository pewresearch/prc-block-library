import MailchimpOptDown from './component';


const edit = props => {

  const _props = {

      interests: window.prcMailchimpForm.interests,
  };

  return (
    <MailchimpOptDown {..._props} />
  );
};


export default edit;
