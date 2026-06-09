/**
 * External Dependencies
 */
import { Icon, cancelCircleFilled } from '@wordpress/icons';
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	useMemo,
	useRef,
	useEffect,
	useState,
	useCallback,
} from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	withColors,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { KeyboardShortcuts } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { Toolbar, InspectorPanel } from './controls';
import StyleEngine from './style-engine';

const CLOSING_ANIMATION_NAMES = [
	'fadeOut',
	'popOut',
	'slideOutDown',
	'slideOutUp',
	'slideOutLeft',
	'slideOutRight',
	'zoomOut',
	'bounceOut',
];

function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	className,
	backdropColor,
	setBackdropColor,
}) {
	const {
		dialogSize = 'medium',
		animation = 'fade',
		dialogVariant = 'default',
	} = attributes;

	const isOpen = context['dialog/isOpen'] ?? false;
	const [showClosingAnimation, setShowClosingAnimation] = useState(false);

	const {
		selectBlock,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	} = useDispatch(blockEditorStore);

	const { rootClientId, dialogClientId } = useSelect(
		(select) => {
			const root =
				select(blockEditorStore).getBlockRootClientId(clientId);
			return {
				rootClientId: root,
				dialogClientId: root,
			};
		},
		[clientId]
	);

	const dialogElementRef = useRef(null);

	// Sync DOM state with context state
	useEffect(() => {
		if (dialogElementRef.current) {
			if (isOpen && !dialogElementRef.current.open) {
				setShowClosingAnimation(false);
				dialogElementRef.current.showModal();
			} else if (!isOpen && dialogElementRef.current.open) {
				dialogElementRef.current.close();
			}
		}
	}, [isOpen]);

	const finalizeClose = useCallback(() => {
		if (dialogClientId) {
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(dialogClientId, {
				editorIsDialogOpen: false,
			});
		}
		setShowClosingAnimation(false);
		selectBlock(rootClientId);
	}, [
		dialogClientId,
		rootClientId,
		selectBlock,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	const openDialog = () => {
		if (dialogClientId) {
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(dialogClientId, {
				editorIsDialogOpen: true,
			});
		}
	};

	const closeDialog = useCallback(() => {
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		if (prefersReducedMotion) {
			finalizeClose();
			return;
		}

		setShowClosingAnimation(true);

		const dialogElement = dialogElementRef.current;
		if (!dialogElement) {
			finalizeClose();
			return;
		}

		const onAnimationEnd = (event) => {
			if (!CLOSING_ANIMATION_NAMES.includes(event.animationName)) {
				return;
			}
			dialogElement.removeEventListener('animationend', onAnimationEnd);
			finalizeClose();
		};

		dialogElement.addEventListener('animationend', onAnimationEnd);
	}, [finalizeClose]);

	const onEscHandler = (e) => {
		e.preventDefault();
		closeDialog();
	};

	const onBackdropClick = (event) => {
		if (event.target === event.currentTarget) {
			closeDialog();
		}
	};

	const blockProps = useBlockProps({
		ref: dialogElementRef,
		className: clsx(className, {
			'is-size-small': 'small' === dialogSize,
			'is-size-medium': 'medium' === dialogSize,
			'is-size-large': 'large' === dialogSize,
			[`is-animation-${animation}`]: animation,
			'is-variant-bottom-sheet': 'bottom-sheet' === dialogVariant,
			'is-closing': showClosingAnimation,
			active: isOpen && !showClosingAnimation,
		}),
		role: 'dialog',
		'aria-modal': 'true',
		'aria-labelledby': '',
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-dialog-element__inner',
		},
		{
			templateLock: false,
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<KeyboardShortcuts
			bindGlobal
			shortcuts={{
				esc: onEscHandler,
			}}
		>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Keyboard support via ESC handler, backdrop click closes */}
			<dialog {...blockProps} onClick={onBackdropClick}>
				<StyleEngine attributes={attributes} clientId={clientId} />
				<InspectorPanel
					colors={{
						backdropColor,
						setBackdropColor,
					}}
					openDialog={openDialog}
					closeDialog={closeDialog}
					clientId={clientId}
					context={context}
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<Toolbar
					openDialog={openDialog}
					closeDialog={closeDialog}
					isOpen={isOpen}
					clientId={clientId}
					attributes={attributes}
				/>
				<button
					className="wp-block-prc-block-dialog-element__close-button"
					type="button"
					aria-label="Close dialog"
					onClick={() => closeDialog()}
				>
					{
						// @TODO We need to probably add a slotfill here for the icon. We should reference the icon library work in Gutenberg to determine if we can hook in to that for this.
					}
					<Icon icon={cancelCircleFilled} />
				</button>
				<div {...innerBlocksProps} />
			</dialog>
		</KeyboardShortcuts>
	);
}

export default withColors({ backdropColor: 'backdrop-color' })(Edit);
