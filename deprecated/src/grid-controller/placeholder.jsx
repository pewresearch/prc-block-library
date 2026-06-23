/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import {
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	Button,
	Flex,
	FlexItem,
	Placeholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function GridPlaceholder({ clientId, setAttributes }) {
	const name = 'prc-block/grid-controller';
	const [customCount, setCustomCount] = useState('');

	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[clientId]
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps({ className: 'is-placeholder' });

	const onSelectVariation = (nextVariation = defaultVariation) => {
		if (nextVariation.attributes) {
			setAttributes(nextVariation.attributes);
		}
		if (nextVariation.innerBlocks) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
				true
			);
		}
	};

	const createColumnsFromCount = (count) => {
		const num = parseInt(count, 10);
		if (Number.isNaN(num) || num < 1 || num > 12) {
			return;
		}
		const columns = Array.from({ length: num }, (_, i) =>
			createBlock('prc-block/grid-column', {
				gridLayout: {
					index: i + 1,
					desktopSpan: 4,
					tabletSpan: 4,
					mobileSpan: 4,
				},
			})
		);
		setAttributes({ dividerColor: 'gray' });
		replaceInnerBlocks(clientId, columns, true);
	};

	return (
		<div {...blockProps}>
			<Placeholder
				icon={get(blockType, ['icon', 'src'])}
				label={get(blockType, ['title'])}
				instructions={__(
					'Select a variation or enter a custom column count.',
					'prc-block-library'
				)}
			>
				{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
				<ul
					role="list"
					className="block-editor-block-variation-picker__variations"
				>
					{variations.map((variation) => (
						<li key={variation.name}>
							<Button
								className="block-editor-block-variation-picker__variation"
								label={variation.description || variation.title}
								onClick={() => onSelectVariation(variation)}
								icon={variation.icon}
								showTooltip
							/>
							<span className="block-editor-block-variation-picker__variation-label">
								{variation.title}
							</span>
						</li>
					))}
				</ul>
				<Flex
					justify="center"
					align="flex-end"
					gap={2}
					style={{ marginTop: '16px', width: '100%' }}
				>
					<FlexItem>
						<NumberControl
							label={__(
								'Custom column count',
								'prc-block-library'
							)}
							value={customCount}
							min={1}
							max={12}
							onChange={setCustomCount}
							size="__unstable-large"
							placeholder="1–12"
						/>
					</FlexItem>
					<FlexItem>
						<Button
							variant="primary"
							onClick={() => createColumnsFromCount(customCount)}
							disabled={
								!customCount ||
								parseInt(customCount, 10) < 1 ||
								parseInt(customCount, 10) > 12
							}
							size="compact"
						>
							{__('Create', 'prc-block-library')}
						</Button>
					</FlexItem>
				</Flex>
			</Placeholder>
		</div>
	);
}
