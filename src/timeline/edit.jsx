/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	Fragment,
	useMemo,
	useState,
	useCallback,
	useRef,
	useEffect,
} from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

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
	const { currentActiveIndex } = attributes;
	const inputRef = useRef();
	const { selectBlock, updateBlockAttributes } =
		useDispatch(blockEditorStore);

	/**
	 * Block props for the timeline block.
	 */
	const blockProps = useBlockProps();
	/**
	 * Innerblocks props for the tabs content.
	 */
	const innerBlockProps = useInnerBlocksProps(
		{},
		{
			__experimentalCaptureToolbars: true,
			clientId,
			orientation: 'horizontal',
		}
	);

	const { maxSteps, ticks } = useSelect(
		(select) => {
			return {
				maxSteps: select(blockEditorStore).getBlocks(clientId).length,
				ticks: select(blockEditorStore).getBlocks(clientId),
			};
		},
		[clientId]
	);

	const ticksClientIds = useMemo(() => {
		return ticks.map((block) => block.clientId);
	}, [ticks]);

	const setActiveTick = useCallback((index) => {
		console.log(
			'Active Tick: ',
			index,
			currentActiveIndex,
			ticksClientIds[index],
			ticksClientIds
		);
		setAttributes({ currentActiveIndex: index });
		selectBlock(ticksClientIds[index], ticksClientIds, index);
	}, []);

	/**
	 * This set's up a listener for the slider input.
	 * When the slider's value changes it selects the block using it's clientId by
	 * matching the value it receives, the index, from the blocks array.
	 */
	useEffect(() => {
		const slider = inputRef.current;
		const handleInput = function () {
			// Get the value that has been updated.
			const { value } = this;
			const newActiveIndex = value - 1;
			setActiveTick(newActiveIndex);
		};
		slider.addEventListener('input', handleInput);
		return () => {
			slider.removeEventListener('input', handleInput);
		};
	}, [setActiveTick, selectBlock]);

	/**
	 * This effect ensures the slider's value matches the currentActiveIndex attribute.
	 */
	useEffect(() => {
		if (currentActiveIndex) {
			console.log('Update slider value to match currentActiveIndex');
			inputRef.current.value = currentActiveIndex;
		}
	}, [currentActiveIndex]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<div className="tick-slider">
					<ul className="ticks">
						{ticks.map((tick) => {
							const { metadata } = tick.attributes;
							const { name } = metadata;
							return (
								<li
									key={tick.clientId}
									className="tick"
									role="presentation"
								>
									<RichText
										tagName="span"
										onChange={(value) =>
											updateBlockAttributes(
												tick.clientId,
												{
													metadata: {
														...metadata,
														name: value,
													},
												}
											)
										}
										placeholder={'Tick'}
										value={name}
										withoutInteractiveFormatting
									/>
								</li>
							);
						})}
					</ul>
					<input
						ref={inputRef}
						type="range"
						step={1}
						min={1}
						max={maxSteps}
						value={currentActiveIndex}
					/>
				</div>
				{innerBlockProps.children}
			</div>
		</Fragment>
	);
}
