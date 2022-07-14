/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

const ALLOWED_BLOCKS = ['core/group'];

const edit = ({ attributes, className, setAttributes }) => {
	const { direction } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: direction,
		templateLock: false,
	});

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={sprintf(
							'arrow-%s-alt2',
							'vertical' === direction ? 'down' : 'right',
						)}
						label="Carousel Direction"
						onClick={() =>
							setAttributes({
								direction: 'vertical' === direction ? 'horizontal' : 'vertical',
							})
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
