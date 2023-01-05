/**
 * External Dependencies
 */
import styled from '@emotion/styled';
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['core/group', 'core/paragraph'];

function convertHexToRGBA(hexCode = '', opacity = 1) {
	let o = opacity;
	let hex = hexCode.replace('#', '');

	if (3 === hex.length) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	/* Backward compatibility for whole number based opacity values. */
	if (1 < o && 100 >= o) {
		o /= 100;
	}

	return `rgba(${r},${g},${b},${o})`;
}

const ModalShade = styled('div')`
	&.active {
		background-color: ${(props) =>
			props.backgroundColor ? props.backgroundColor : 'rgba(0, 0, 0, 0.5)'};
	}
`;

function ModalHeader({ attributes, setAttributes }) {
	const { title } = attributes;
	const onChangeTitle = (value) => setAttributes({ title: value });

	return (
		<div className="wp-block-prc-block-popup-modal--header">
			<RichText
				tagName="h2"
				placeholder={__('Add a title', 'prc-block-library')}
				value={title}
				onChange={onChangeTitle}
			/>
		</div>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	const { selectBlock } = useDispatch('core/block-editor');

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-popup-modal--inner',
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			templateLock: false,
		},
	);

	const { hasChildSelected, isVideoModal } = useSelect((select) => {
		const { hasSelectedInnerBlock, getBlockRootClientId, getBlockAttributes } =
			select('core/block-editor');
		const rootClietnId = getBlockRootClientId(clientId);
		const rootBlockAttributes = getBlockAttributes(rootClietnId);
		const { className = '' } = rootBlockAttributes;
		return {
			hasChildSelected: hasSelectedInnerBlock(clientId, true),
			isVideoModal: className.includes('is-style-video'),
		};
	}, []);

	const isActive = isSelected || hasChildSelected;
	const [initialOpen, setInitialOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const toggleModal = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (!isActive && isOpen && initialOpen) {
			console.log('Closing modal');
			closeModal();
			setInitialOpen(false);
		}
		if (isOpen && !initialOpen) {
			console.log('Opening modal');
			setInitialOpen(true);
			selectBlock(clientId);
		}
	}, [isActive, isOpen]);

	return (
		<Fragment>
			{/* <Controls {...{ isVideoModal }} /> */}
			<ModalShade
				className={classNames('wp-block-prc-block-popup-modal--outer', {
					active: isOpen,
				})}
				backgroundColor={convertHexToRGBA('#000', 0.5)}
			>
				<div {...blockProps}>
					<ModalHeader {...{ attributes, setAttributes }} />
					<div {...innerBlocksProps} />
				</div>
			</ModalShade>
			<div>
				<Button variant="secondary" onClick={toggleModal}>
					{__(`${isOpen ? 'Close' : 'Open'} Modal`, 'prc-block-library')}
				</Button>
			</div>
		</Fragment>
	);
}
