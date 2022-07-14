/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	useInnerBlocksProps,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */

import { ModalControls } from '../_shared';

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
	const { title, inverted, transition, className } = attributes;

	const { rootClientId, hasActiveChildren } = useSelect((select) => ({
		rootClientId: select('core/block-editor').getBlockRootClientId(clientId),
		hasActiveChildren:
			select('core/block-editor').hasSelectedInnerBlock(clientId),
	}));

	const [isOpen, toggleOpen] = useState(false);

	const isVideo = 'is-style-video' === className;

	const blockProps = useBlockProps({
		className: classNames({
			'ui modal': isOpen,
			basic: isVideo,
			active: isOpen,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'content',
		},
		{
			orientation: 'vertical',
			templateLock: false,
			__experimentalCaptureToolbars: true,
		},
	);

	const onClose = () => {
		const modalBackground = document.getElementById(
			'prc-block-modal-background',
		);
		if (null === modalBackground) {
			return;
		}
		modalBackground.classList.remove('active');
		toggleOpen(false);
	};

	const onOpen = () => {
		const modalBackground = document.getElementById(
			'prc-block-modal-background',
		);
		if (null === modalBackground) {
			return;
		}
		// When open if this is not set to inverted then set it to inverted.
		if (inverted) {
			modalBackground.classList.add('inverted');
		} else {
			modalBackground.classList.remove('inverted');
		}
		toggleOpen(true);
		modalBackground.classList.add('active');
	};

	// Handle activating the modal.
	useEffect(() => {
		if (!isSelected && !hasActiveChildren) {
			onClose();
		} else if (rootClientId === window.prcBlocks.modal.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [isSelected, hasActiveChildren, inverted, window.prcBlocks.modal.isOpen]);

	return (
		<ModalControls controllerClientId={rootClientId}>
			<InspectorControls>
				<PanelBody title="Modal Settings">
					<div>
						<ToggleControl
							label="Use white background"
							checked={inverted}
							onChange={() => setAttributes({ inverted: !inverted })}
						/>
						<SelectControl
							label="Transition"
							value={transition}
							options={[
								{ label: 'Scale', value: 'scale' },
								{ label: 'Zoom', value: 'zoom' },
								{ label: 'Fade', value: 'fade' },
								{ label: 'Fade Up', value: 'fade up' },
								{ label: 'Drop', value: 'drop' },
								{ label: 'Fly Up', value: 'fly up' },
							]}
							onChange={(value) => setAttributes({ transition: value })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{isOpen && (
					<Fragment>
						{true !== isVideo && (
							<div className="header">
								<RichText
									tagName="h2"
									value={title}
									placeholder={__('Modal Title')}
									multiline={false}
									allowedFormats={['core/italic']}
									onChange={(value) => setAttributes({ title: value })}
								/>
							</div>
						)}
						<div {...innerBlocksProps} />
					</Fragment>
				)}
			</div>
		</ModalControls>
	);
};

export default edit;
