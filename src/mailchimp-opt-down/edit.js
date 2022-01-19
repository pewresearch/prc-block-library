/**
 * WordPress Dependencies
 */
import { mailChimpInterests } from '@pewresearch/app-components';

/**
 * Internal Dependencies
 */
import MailchimpOptDown from './component';

const edit = props => {
	return <MailchimpOptDown interests={mailChimpInterests.map(d => d.value)} />;
};


export default edit;
