/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import MailchimpOptDown from './component';

const edit = props => {
	const blockProps = useBlockProps();
	return <div {...blockProps}><MailchimpOptDown/></div>;
};


export default edit;
