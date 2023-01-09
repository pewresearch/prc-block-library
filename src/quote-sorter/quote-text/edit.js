/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	BlockControls,
	useBlockProps,
	AlignmentControl,
} from '@wordpress/block-editor';

const edit = ({ className, context, attributes, setAttributes }) => {
	const { align } = attributes;
	const quote = context['prc-block/quote-sorter/quote'];
	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${align}`]: align,
		}),
	});
	console.log(quote);
	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={align}
					onChange={(newAlign) => setAttributes({ align: newAlign })}
				/>
			</BlockControls>
			<div {...blockProps} dangerouslySetInnerHTML={{ __html: `“${quote}”` }} />
		</>
	);
};

export default edit;
