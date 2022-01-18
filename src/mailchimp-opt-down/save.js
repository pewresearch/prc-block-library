import MailchimpOptDown from './component';


const save = props => {
  const _props = {
      interests: window.prcMailchimpForm.interests,
  };

  return (
    <MailchimpOptDown {..._props} />
  );
};


export default save;
