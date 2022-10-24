/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ className, context }) => {
	const quote = context['prc-block/quote-sorter/quote'];
	const blockProps = useBlockProps({
		className: classnames(className, 'description'),
	});
	return <div {...blockProps}>“{quote}”</div>;
};

export default edit;
