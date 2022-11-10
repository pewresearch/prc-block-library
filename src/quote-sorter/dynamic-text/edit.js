/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { select, useSelect } from '@wordpress/data';
import { Placeholder } from '@wordpress/components';

const ALLOWED_BLOCKS = [];

const edit = ({
	attributes,
	className,
	setAttributes,
	clientId,
	context,
	isSelected,
}) => {
	const { id } = attributes;
	const typologies = JSON.parse(context['prc-block/quote-sorter-typologies']);
	const body = Object.keys(typologies).map((key) => ({
		cells: [
			{ content: key, tag: 'td' },
			{
				content: `Selected quotes from the <strong>${typologies[key].name}</strong> group`,
				tag: 'td',
			},
		],
	}));

	const TEMPLATE = [
		[
			'core/table',
			{
				className: 'dynamic-text-table',
				head: [
					{
						cells: [
							{ content: 'Key', tag: 'th' },
							{ content: 'Display Text', tag: 'th' },
						],
					},
				],
				body: [
					{
						cells: [
							{ content: 'all', tag: 'td' },
							{
								content: 'Selected quotes from <strong>all</strong> groups',
								tag: 'td',
							},
						],
					},
					...body,
				],
			},
		],
	];
	setAttributes({ id: id || clientId });

	const tableBlock = select('core/block-editor')
		.getBlocks(clientId)
		.find((block) => 'core/table' === block.name);
	useEffect(() => {
		if (tableBlock) {
			const tableData = tableBlock.attributes.body;
			const obj = tableData.reduce(
				(acc, cur) => ({
					...acc,
					[cur.cells[0].content]: cur.cells[1].content,
				}),
				{},
			);

			setAttributes({
				dynamicText: JSON.stringify(obj),
			});
		}
	}, [tableBlock]);

	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});

	const { isActive } = useSelect(() => ({
		isActive:
			isSelected || select('core/block-editor').hasSelectedInnerBlock(clientId),
	}));

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<div {...innerBlocksProps}>
			<Placeholder
				label={__('Dynamic Text Block')}
				instructions={__(`Click this area to change the dynamic text that will appear on the
					 frontend. This block’s ID is: ${id}`)}
				isColumnLayout
			>
				{isActive && <InnerBlocks template={TEMPLATE} templateLock="all" />}
			</Placeholder>
		</div>
	);
};

export default edit;
