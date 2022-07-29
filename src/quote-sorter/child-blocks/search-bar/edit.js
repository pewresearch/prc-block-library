/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [];

const edit = ({ attributes, className, setAttributes }) => {
	const { placeholder } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<div {...innerBlocksProps}>
			<Input
				icon="search"
				fluid
				placeholder={placeholder}
				onChange={(e, { value }) => {
					console.log(value);
				}}
			/>
		</div>
	);
};

export default edit;
