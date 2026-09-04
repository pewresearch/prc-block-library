/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	Warning,
} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import NavigationPanelsToolbarControls from './toolbar-controls';
import useNavigationPanelsState from './use-navigation-panels-state';
import { Icon } from '@prc/icons';

/**
 * Navigation Options
 * @param {Object} optionsInfo - The options information.
 * @param {Object} attributes - The attributes of the block.
 * @param {Function} setAttributes - The function to set the attributes.
 * @param {string} clientId - The client ID of the block.
 * @returns {JSX.Element} The navigation options component.
 */
function NavigationOptions({
	panelSiblings,
	activeIndex,
	attributes,
	setAttributes,
	clientId,
	minWidth,
}) {
	// Extract options, active and set up classes
	const optionList = panelSiblings ?? [];
	const active = activeIndex ?? 0;
	const navigationStyle = attributes['navigationStyle'] ?? 'none';
	const styleIcon =
		'none' === navigationStyle ? (
			''
		) : (
			<Icon library="solid" icon={navigationStyle} size="1" />
		);

	// If options are set
	if (optionList.length > 0) {
		// Build a radio list
		return (
			<div
				className={
					'wp-block-prc-block-navigation-panels__options option-column'
				}
				style={{ minWidth: minWidth }}
			>
				{optionList.map((option, index) => {
					const isChecked = index === active;
					const inputId = `nav-option-${clientId}-${index}`;
					const label = option?.attributes?.label ?? index + 1;
					const returnLabel =
						option?.attributes?.returnLabel ?? `Return to ${label}`;
					const hasImage =
						undefined !== option?.attributes?.panelIconUrl &&
						0 < option?.attributes?.panelIconUrl.length;
					const panelIcon = hasImage ? (
						<img
							className={`panel-nav-icon wp-image-${option.attributes.panelIconId}`}
							src={
								option.attributes.panelIconUrl +
								'?w=150&h=150&crop=1'
							}
							alt=""
							style={{ width: '24px', height: 'auto' }}
						/>
					) : (
						''
					);
					return (
						<div
							className={
								'wp-block-prc-block-form-input-checkbox is-style-label-only'
							}
						>
							<input
								id={inputId}
								type="radio"
								name={`option-${clientId}`}
								checked={isChecked}
								value={index}
								onClick={() =>
									setAttributes({
										editorActivePanelIndex: index,
										returnLabel: returnLabel,
									})
								}
							/>
							<label htmlFor={inputId}>
								{panelIcon}
								{label} {styleIcon}
							</label>
						</div>
					);
				})}
			</div>
		);
	}
	// Otherwise, return a warning
	return (
		<div className={'navigation-options'}>
			<Warning>
				{__('No navigation panels found.', 'navigation-panel')}
			</Warning>
		</div>
	);
}

export default function Edit({ attributes, setAttributes, clientId }) {
	const { panelSiblings, activeIndex } = useNavigationPanelsState(clientId);
	const {
		optionsMinWidth,
		desktopLayout,
		mobileLayout,
		editorActivePanelIndex,
		returnLabel,
	} = attributes;
	// is-open/is-closed mirrors frontend panelOpen. Checked radio ≠ visible content on top layout.
	const topLayoutHelperClass =
		editorActivePanelIndex >= 0 ? 'is-open' : 'is-closed';
	const blockProps = useBlockProps({
		className: `desktop-${desktopLayout} mobile-${mobileLayout} ${topLayoutHelperClass}`,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: [
				[
					'prc-block/navigation-panel',
					{
						label: 'Browse By',
						lock: {
							move: true,
							remove: false,
						},
					},
				],
			]
		}
	);

	return (
		<Fragment>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			<NavigationPanelsToolbarControls clientId={clientId} />
			<section {...blockProps}>
				<NavigationOptions
					panelSiblings={panelSiblings}
					activeIndex={activeIndex}
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
					minWidth={optionsMinWidth ?? '25%'}
				/>
				<div
					className={'wp-block-prc-block-navigation-panels__content'}
				>
					<div
						className={
							'wp-block-prc-block-navigation-panels__inner-options'
						}
					>
						<div
							className={
								'wp-block-prc-block-form-input-checkbox is-style-label-only'
							}
						>
							<input
								id={`default-return-${clientId}`}
								type="radio"
								name={`return-${clientId}`}
								value={-1}
								checked={true}
								onClick={() =>
									setAttributes({
										editorActivePanelIndex: -1,
									})
								}
							/>
							<label htmlFor={`default-return-${clientId}`}>
								{returnLabel}
							</label>
						</div>
					</div>
					<div {...innerBlocksProps} />
				</div>
			</section>
		</Fragment>
	);
}
