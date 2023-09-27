/**
 * External Dependencies
 */
import styled from '@emotion/styled';
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useState,
	useEffect,
	createPortal,
} from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Button, KeyboardShortcuts } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { cleanForSlug } from '@wordpress/url';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = [
	'core/group',
	'core/paragraph',
	'core/image',
	'vimeo/create',
	'core/embed',
];

/**
 * Render modal in a portal inside the editor style wrapper to ensure styles are
 * applied correctly.
 *
 * @param root0
 * @param root0.children
 */
function ModalStylesWrapper({ children }) {
	const editorStylesWrapper = document.querySelector(
		'.editor-styles-wrapper'
	);
	console.log('editorStylesWrapper', editorStylesWrapper);
	// create a div inside at the end of this wrapper
	// check if modal-styles-wrapper exists and if it doesnt then create it
	if (!editorStylesWrapper) {
		return null;
	}

	// This stays in the DOM for the lifetime of the editor.
	let modalStylesWrapper = editorStylesWrapper.querySelector(
		'.modal-styles-wrapper'
	);

	if (!modalStylesWrapper) {
		modalStylesWrapper = document.createElement('div');
		modalStylesWrapper.classList.add('modal-styles-wrapper');
		editorStylesWrapper.appendChild(modalStylesWrapper);
	}

	// This is ephemeral and will be removed when the component unmounts.
	const modalEl = document.createElement('div');

	useEffect(() => {
		modalStylesWrapper.appendChild(modalEl);
		return () => {
			modalStylesWrapper.removeChild(modalEl);
		};
	}, [modalEl, modalStylesWrapper]);

	return createPortal(children, modalEl);
}

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
			props.backgroundColor
				? props.backgroundColor
				: 'rgba(0, 0, 0, 0.5)'};
	}
`;

const TriggerButton = styled('div')`
	position: absolute;
	margin-left: -150px;
	top: 0;
`;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	const { selectBlock } = useDispatch('core/block-editor');

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks, position, title } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-popup-modal--inner',
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			templateLock: false,
			__experimentalCaptureToolbars: true,
		}
	);
	// check that context has popup-controller/className
	// if it does, check if it includes is-style-video
	// if it does, set isVideoModal to true
	// if it doesn't, set isVideoModal to false

	const isVideoModal = context['popup-controller/className']
		? context['popup-controller/className'].includes('is-style-video')
		: false;

	const { hasChildSelected } = useSelect((select) => {
		const { hasSelectedInnerBlock } = select('core/block-editor');
		return {
			hasChildSelected: hasSelectedInnerBlock(clientId, true),
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

	useEffect(() => {
		console.log('Context', context);
	}, [context]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			{isOpen && (
				<ModalStylesWrapper>
					<KeyboardShortcuts
						bindGlobal
						shortcuts={{
							esc: closeModal,
						}}
					>
						<ModalShade
							className={classNames(
								'wp-block-prc-block-popup-modal--outer',
								{
									active: isOpen,
									[`is-position-${cleanForSlug(position)}`]:
										position,
								}
							)}
							backgroundColor={convertHexToRGBA('#000', 0.5)}
						>
							<div {...blockProps}>
								{!isVideoModal && (
									<div className="wp-block-prc-block-popup-modal--header">
										<RichText
											tagName="h2"
											placeholder={__(
												'Add a title',
												'prc-block-library'
											)}
											value={title}
											onChange={(value) =>
												setAttributes({ title: value })
											}
										/>
									</div>
								)}
								<div {...innerBlocksProps} />
							</div>
						</ModalShade>
					</KeyboardShortcuts>
				</ModalStylesWrapper>
			)}
			<TriggerButton>
				<Button variant="secondary" onClick={toggleModal}>
					{`${isOpen ? `Close` : 'Open'} Modal`}
				</Button>
			</TriggerButton>
		</Fragment>
	);
}
