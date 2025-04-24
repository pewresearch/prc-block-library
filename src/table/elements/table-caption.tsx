/**
 * External dependencies
 */
import type { Properties } from 'csstype';
import type { Dispatch, SetStateAction } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText } from '@wordpress/block-editor';
import { createBlock, type BlockInstance } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { caption as captionIcon } from '@wordpress/icons';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '../block-attributes';
import type { VSelectedCells, VSelectedLine } from '../utils/table-state';

type Props = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	insertBlocksAfter: (blocks: BlockInstance[]) => void;
	setSelectedLine: Dispatch<SetStateAction<VSelectedLine>>;
	setSelectedCells: Dispatch<SetStateAction<VSelectedCells>>;
	captionStylesObj: Properties;
	isSelected?: boolean;
};

/* eslint-disable max-lines-per-function */
export default function TableCaption({
	attributes,
	setAttributes,
	insertBlocksAfter,
	setSelectedLine,
	setSelectedCells,
	captionStylesObj,
	isSelected,
}: Props) {
	const { caption = '' } = attributes;
	const prevCaption = usePrevious(caption);
	const isCaptionEmpty = RichText.isEmpty(caption);
	const isPrevCaptionEmpty = RichText.isEmpty(prevCaption || '');
	const [showCaption, setShowCaption] = useState(!isCaptionEmpty);

	const onChange = (value: string | undefined) =>
		setAttributes({ caption: value });

	useEffect(() => {
		if (!isCaptionEmpty && isPrevCaptionEmpty) {
			setShowCaption(true);
		}
	}, [isCaptionEmpty, isPrevCaptionEmpty]);

	useEffect(() => {
		if (!isSelected && isCaptionEmpty) {
			setShowCaption(false);
		}
	}, [isSelected, isCaptionEmpty]);

	const ref = useCallback(
		(node: any) => {
			if (node && isCaptionEmpty) {
				node?.focus();
			}
		},
		[isCaptionEmpty]
	);

	return (
		<>
			{isSelected && (
				<BlockControls group="block">
					<ToolbarButton
						onClick={() => {
							setShowCaption(!showCaption);
							if (showCaption && caption) {
								onChange(undefined);
							}
						}}
						icon={captionIcon}
						isPressed={showCaption}
						label={
							showCaption
								? __('Remove caption', 'flexible-table-block')
								: __('Add caption', 'flexible-table-block')
						}
					/>
				</BlockControls>
			)}
			{showCaption && (!RichText.isEmpty(caption) || isSelected) && (
				<RichText
					aria-label={__(
						'Table caption text',
						'flexible-table-block'
					)}
					placeholder={__('Add caption', 'flexible-table-block')}
					tagName="figcaption"
					style={captionStylesObj}
					value={caption}
					ref={ref}
					onChange={onChange}
					onFocus={() => {
						setSelectedLine(undefined);
						setSelectedCells(undefined);
					}}
					// @ts-ignore: `__unstableOnSplitAtEnd` prop is not exist at @types
					__unstableOnSplitAtEnd={() =>
						insertBlocksAfter(createBlock('core/paragraph'))
					}
				/>
			)}
		</>
	);
}
