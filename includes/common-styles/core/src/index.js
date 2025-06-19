/**
 * External Dependencies
 */
import { check, copy } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardMedia,
	CardDivider,
	BaseControl,
	Modal,
	Button,
	__experimentalGrid as Grid,
	Popover,
} from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useState, useMemo } from '@wordpress/element';
import { store as noticeStore } from '@wordpress/notices';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import './style.scss';
import example1 from '../assets/example1.gif';
import example2 from '../assets/example2.gif';

const Helper = ({ helper, clientId, setIsModalOpen }) => {
	const { createNotice } = useDispatch(noticeStore);
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const currentAttributes = useSelect(
		(select) => {
			return select(blockEditorStore).getBlockAttributes(clientId);
		},
		[clientId]
	);
	const currentClassName = useMemo(
		() => currentAttributes?.className || '',
		[currentAttributes]
	);
	const alreadyActive = useMemo(
		() => currentClassName.includes(helper.selector),
		[currentClassName, helper.selector]
	);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<div
			className="prc-block-library--core-helper-list-item"
			key={helper.label.replace(/\s+/g, '-')}
		>
			<Card>
				<CardHeader>{helper.label}</CardHeader>
				<CardBody>
					<Button
						variant="tertiary"
						onMouseEnter={() => {
							setIsPopoverOpen(true);
						}}
						onMouseLeave={() => {
							setIsPopoverOpen(false);
						}}
						onClick={() => {
							// Check if the class already exists, if so remove it, if not add it.
							if (alreadyActive) {
								const newClassName = currentClassName.replace(
									helper.selector,
									''
								);
								updateBlockAttributes(clientId, {
									className: newClassName,
								});
							} else {
								updateBlockAttributes(clientId, {
									className: `${currentClassName} ${helper.selector}`,
								});
							}
							createNotice('success', __('Classname updated'), {
								type: 'snackbar',
								icon: '✅',
							});
							setTimeout(() => {
								setIsModalOpen(false);
							}, 1000);
						}}
						icon={alreadyActive ? check : copy}
					>
						<pre>{`.${helper.selector}`}</pre>
					</Button>
					{isPopoverOpen && helper?.example && (
						<Popover>
							<img src={helper.example} />
						</Popover>
					)}
				</CardBody>
				<CardFooter>{helper.help}</CardFooter>
			</Card>
		</div>
	);
};

/**
 * Add style helper controls to all blocks.
 */
addFilter(
	'editor.BlockEdit',
	`prc-block-library--core-helper`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function StyleHelper(props) {
				const { name, attributes, setAttributes, clientId } = props;
				const [isModalOpen, setIsModalOpen] = useState(false);

				const toggleModal = () => {
					setIsModalOpen(!isModalOpen);
				};

				const styleHelpers = [
					{
						label: 'Desktop Justify Space Between to Mobile Justify Right',
						selector:
							'is-content-justification-space-between__on-mobile__right',
						help: 'Apply `justify-content: flex-end` style on mobile for any block set to content justification space-between.',
						example: example1,
					},
					{
						label: 'Desktop Justify Space Between to Mobile Justify Left',
						selector:
							'is-content-justification-space-between__on-mobile__left',
						help: 'Apply `justify-content: flex-start` style on mobile for any block set to content justification as space-between.',
						example: example1,
					},
					{
						label: 'Desktop Justify Right to Mobile Justify Space Between',
						selector:
							'is-content-justification-right__on-mobile__space-between',
						help: 'Apply `justify-content: space-between` style on mobile for any block set to right content justification.',
						example: example2,
					},
					{
						label: 'Desktop Justify Left to Mobile Justify Space Between',
						selector:
							'is-content-justification-left__on-mobile__space-between',
						help: 'Apply `justify-content: space-between` style on mobile for any block set to left content justification.',
						example: example2,
					},
					{
						label: 'Clearfix',
						selector: 'clearfix',
						help: 'Apply the classic CSS hack of a pseudo table element that clears both and remains empty after the element.',
					},
					{
						label: 'No Border',
						selector: 'no-border',
						help: "Remove the element's border.",
					},
					{
						label: 'Desktop Horizontal to Mobile Vertical',
						selector: 'is-horizontal__on-mobile__vertical',
						help: 'Convert horizontal layout to vertical on mobile devices.',
					},
					{
						label: 'Desktop Vertical to Mobile Horizontal',
						selector: 'is-vertical__on-mobile__horizontal',
						help: 'Convert vertical layout to horizontal on mobile devices.',
					},
					{
						label: 'Fade In Down',
						selector: 'prc-animations__fade-in-down',
						help: 'Apply a fade in down animation to the element when it first enters the viewport.',
					},
				];

				return (
					<>
						<InspectorAdvancedControls>
							<BaseControl
								label="Responsive CSS Helpers"
								help="Sometimes, you need a simple CSS class name to apply a hack or variation under specific conditions. Preview and apply available responsive CSS hacks."
							>
								<Button
									onClick={toggleModal}
									variant="secondary"
								>
									Open CSS Helper Library
								</Button>
							</BaseControl>
							{isModalOpen && (
								<Modal
									onRequestClose={toggleModal}
									title="Responsive CSS Helper Library"
								>
									<p>
										Sometimes, you need a simple CSS class
										name to apply a hack or variation under
										specific conditions. Preview and apply
										available responsive CSS hacks.
									</p>
									<p>
										Hover to preview the effect. Click to
										apply.
									</p>
									<Grid columns={2} gap={5}>
										{styleHelpers.map((helper) => (
											<Helper
												helper={helper}
												clientId={clientId}
												setIsModalOpen={setIsModalOpen}
											/>
										))}
									</Grid>
								</Modal>
							)}
						</InspectorAdvancedControls>
						<BlockEdit {...props} />
					</>
				);
			},
		'withStyleHelperControls'
	),
	1000
);
