/**
 * External Dependencies
 */
import classNames from 'classnames';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const { orientation } = attributes;

	const { selectBlock } = useDispatch(blockEditorStore);

	const { innerBlocks, selectedCarouselSlideClientId, _isSelected } =
		useSelect((select) => {
			const {
				getBlocks,
				getSelectedBlockClientId,
				getBlockParentsByBlockName,
				hasSelectedInnerBlock,
			} = select(blockEditorStore);
			const currentlySelectedBlockClientId = getSelectedBlockClientId();
			const blockParents = getBlockParentsByBlockName(
				currentlySelectedBlockClientId,
				'prc-block/carousel-slide'
			);
			const blockParentClientId =
				blockParents?.[0] || currentlySelectedBlockClientId;
			return {
				innerBlocks: getBlocks(clientId),
				selectedCarouselSlideClientId: blockParentClientId,
				_isSelected:
					isSelected || hasSelectedInnerBlock(clientId, true),
			};
		});

	const blockProps = useBlockProps({
		className: classNames('prc-block-carousel-controller', {
			'is-style-vertical': orientation === 'vertical',
			'is-enabled': _isSelected,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'prc-block-carousel-controller__track',
		},
		{
			orientation,
			templateLock: false,
			__experiementalCaptureToolbars: true,
			template: [
				[
					'prc-block/carousel-slide',
					{},
					[
						[
							'core/paragraph',
							{
								placeholder:
									'Place blocks inside the carousel slide.',
							},
						],
					],
				],
			],
		}
	);

	return (
		<Fragment>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			<div {...blockProps}>
				<div {...innerBlocksProps} />
				<div className="prc-block-carousel-controller__dots">
					{innerBlocks.map((block, index) => {
						return (
							<button
								key={block.clientId}
								className="prc-block-carousel-controller__dot"
								onClick={() => selectBlock(block.clientId)}
								aria-label={`Go to slide ${index + 1}`}
								data-active={
									selectedCarouselSlideClientId ===
									block.clientId
								}
							>
								<Icon library="solid" icon="circle" />
							</button>
						);
					})}
				</div>
			</div>
		</Fragment>
	);
}
