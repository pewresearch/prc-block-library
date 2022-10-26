/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';

const edit = ({ attributes, setAttributes, className, context }) => {
	const { align } = attributes;
	const attribution = context?.['prc-block/quote-sorter/attribution'];
	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${align}`]: align,
		}),
	});

	return (
		<Fragment>
			<BlockControls group="block">
				<AlignmentControl
					value={align}
					onChange={(newAlign) => setAttributes({ align: newAlign })}
				/>
			</BlockControls>
			<div {...blockProps}>{attribution}</div>
		</Fragment>
	);
};

export default edit;
