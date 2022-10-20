/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, className, context }) => {
	const attribution = context?.['prc-block/quote-sorter/attribution'];
	const blockProps = useBlockProps({
		className: classnames(className, 'attribution'),
	});
	return <div {...blockProps}>{attribution}</div>;
};

export default edit;
