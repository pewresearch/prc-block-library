import { mailChimpInterests } from '@pewresearch/app-components';
import MailchimpOptDown from './component';


const edit = props => {

  const _props = {
      interests: mailChimpInterests.map(d => d.value),
  };

  return (
    <MailchimpOptDown {..._props} />
  );
};


export default edit;
