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
	setSelectedLine: Dispatch<SetStateAction<VSelectedLine>>;
	setSelectedCells: Dispatch<SetStateAction<VSelectedCells>>;
	isSelected?: boolean;
};

/* eslint-disable max-lines-per-function */
export default function TableSourceNote({
	attributes,
	setAttributes,
	setSelectedLine,
	setSelectedCells,
	isSelected,
}: Props) {
	const { sourceNote = '' } = attributes;
	const onChange = (value: string | undefined) =>
		setAttributes({ sourceNote: value });

	return (
		<RichText
			aria-label={__('Table source note text', 'flexible-table-block')}
			placeholder={__('Table source note…', 'flexible-table-block')}
			tagName="p"
			value={sourceNote}
			className="prc-block-table-source-note"
			onChange={onChange}
			onFocus={() => {
				setSelectedLine(undefined);
				setSelectedCells(undefined);
			}}
		/>
	);
}
