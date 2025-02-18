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
	const { orientation, className } = attributes;

	const { selectBlock } = useDispatch(blockEditorStore);

	const {
		innerBlocks,
		selectedCarouselSlideClientId,
		_isSelected,
		nextClientId,
		previousClientId,
	} = useSelect((select) => {
		const {
			getBlock,
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
		const currentlySelectedBlock = getBlock(currentlySelectedBlockClientId);
		const _innerBlocks = getBlocks(clientId);
		const currentlySelectedSlideBlock =
			'prc-block/carousel-slide' === currentlySelectedBlock?.blockName
				? currentlySelectedBlockClientId
				: null;
		if (null === currentlySelectedSlideBlock) {
			return {
				innerBlocks: _innerBlocks,
				selectedCarouselSlideClientId: blockParentClientId,
				nextClientId: null,
				previousClientId: null,
				_isSelected:
					isSelected || hasSelectedInnerBlock(clientId, true),
			};
		}
		const nextIndex = _innerBlocks.indexOf(currentlySelectedSlideBlock) + 1;
		const previousIndex =
			_innerBlocks.indexOf(currentlySelectedSlideBlock) - 1;
		const _nextClientId = _innerBlocks[nextIndex]?.clientId;
		const _previousClientId = _innerBlocks[previousIndex]?.clientId;

		return {
			innerBlocks: _innerBlocks,
			selectedCarouselSlideClientId: blockParentClientId,
			nextClientId: _nextClientId,
			previousClientId: _previousClientId,
			_isSelected: isSelected || hasSelectedInnerBlock(clientId, true),
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

	const dots = (
		<div className="prc-block-carousel-controller__dots">
			{innerBlocks.map((block, index) => {
				return (
					<button
						key={block.clientId}
						className="prc-block-carousel-controller__dot"
						type="button"
						onClick={() => selectBlock(block.clientId)}
						aria-label={`Go to slide ${index + 1}`}
						data-active={
							selectedCarouselSlideClientId === block.clientId
						}
					>
						<Icon library="solid" icon="circle" />
					</button>
				);
			})}
		</div>
	);

	const arrows = (
		<div className="prc-block-carousel-controller__arrows">
			<button
				className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--prev"
				type="button"
				onClick={() => selectBlock(previousClientId)}
			>
				<Icon library="solid" icon="chevron-left" />
			</button>
			<button
				className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--next"
				type="button"
				onClick={() => selectBlock(nextClientId)}
			>
				<Icon library="solid" icon="chevron-right" />
			</button>
		</div>
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
				{className?.includes('dots-navigation') && dots}
				{className?.includes('arrows-navigation') && arrows}
			</div>
		</Fragment>
	);
}
