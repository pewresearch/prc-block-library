/**
 * External Dependencies
 */
import classnames from 'classnames';
import { get } from 'lodash';

/**
 * WordPress Dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = ['core/group'];

const edit = ({ attributes, className, setAttributes, clientId }) => {
	const { direction } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const hasInnerBlocks = useSelect(
		(select) => 0 < select(blockEditorStore).getBlocks(clientId).length,
		[clientId],
	);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: direction,
		templateLock: false,
		template: [
			[
				'core/group',
				{ className: 'carousel-slide' },
				[
					[
						'core/paragraph',
						{
							placeholder: 'You can use any blocks inside this carousel slide.',
						},
					],
				],
			],
		],
	});

	return <div {...innerBlocksProps} />;
};

export default edit;
