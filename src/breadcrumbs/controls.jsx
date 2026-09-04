/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	JustifyContentControl,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const {
		contentJustification,
		showLeadingSeparator,
		showCurrentPageTitle,
		showHome,
		showIndex,
		homeCrumb,
		indexCrumb,
		crumbs,
	} = attributes;

	const authoredCrumbs = Array.isArray(crumbs) ? crumbs : [];

	function updateCrumb(index, patch) {
		const next = authoredCrumbs.map((crumb, crumbIndex) =>
			crumbIndex === index ? { ...crumb, ...patch } : crumb
		);
		setAttributes({ crumbs: next });
	}

	function addCrumb() {
		setAttributes({
			crumbs: [
				...authoredCrumbs,
				{
					id: `crumb-${Date.now()}`,
					text: '',
					url: '',
				},
			],
		});
	}

	function removeCrumb(index) {
		setAttributes({
			crumbs: authoredCrumbs.filter(
				(_crumb, crumbIndex) => crumbIndex !== index
			),
		});
	}

	return (
		<Fragment>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={['left', 'center', 'right']}
					value={contentJustification}
					onChange={(value) =>
						setAttributes({ contentJustification: value })
					}
					popoverProps={{
						position: 'bottom right',
						isAlternate: true,
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Display')}>
					<ToggleControl
						label={__('Show leading separator')}
						checked={showLeadingSeparator}
						onChange={() =>
							setAttributes({
								showLeadingSeparator: !showLeadingSeparator,
							})
						}
					/>
					<ToggleControl
						label={__('Show current page title')}
						checked={showCurrentPageTitle}
						onChange={() =>
							setAttributes({
								showCurrentPageTitle: !showCurrentPageTitle,
							})
						}
					/>
					<ToggleControl
						label={__('Show home crumb')}
						checked={showHome}
						onChange={() =>
							setAttributes({
								showHome: !showHome,
							})
						}
					/>
					{showHome && (
						<>
							<ToggleControl
								label={__('Show home as icon')}
								checked={!!homeCrumb?.asIcon}
								onChange={(value) =>
									setAttributes({
										homeCrumb: {
											...homeCrumb,
											asIcon: value,
										},
									})
								}
								help={__(
									'Render a house icon instead of home text'
								)}
							/>
							{!homeCrumb?.asIcon && (
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label={__('Home crumb text')}
									value={homeCrumb?.text || ''}
									onChange={(value) =>
										setAttributes({
											homeCrumb: {
												...homeCrumb,
												text: value,
											},
										})
									}
									help={__('Leave empty to use site title')}
								/>
							)}
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Home crumb URL')}
								value={homeCrumb?.url || ''}
								onChange={(value) =>
									setAttributes({
										homeCrumb: {
											...homeCrumb,
											url: value,
										},
									})
								}
								help={__('Leave empty to use home URL')}
							/>
						</>
					)}
					<ToggleControl
						label={__('Show index crumb')}
						checked={showIndex}
						onChange={() =>
							setAttributes({
								showIndex: !showIndex,
							})
						}
					/>
					{showIndex && (
						<>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Index crumb text')}
								value={indexCrumb?.text || ''}
								onChange={(value) =>
									setAttributes({
										indexCrumb: {
											...indexCrumb,
											text: value,
										},
									})
								}
								help={__(
									'Optional crumb between home and content hierarchy'
								)}
							/>
							{indexCrumb?.text && (
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label={__('Index crumb URL')}
									value={indexCrumb?.url || ''}
									onChange={(value) =>
										setAttributes({
											indexCrumb: {
												...indexCrumb,
												url: value,
											},
										})
									}
								/>
							)}
						</>
					)}
				</PanelBody>
				<PanelBody title={__('Trail links')} initialOpen={false}>
					<p>
						{__(
							'Extra links after the index crumb. Plugins can replace the trail on the frontend.'
						)}
					</p>
					{authoredCrumbs.map((crumb, index) => (
						<div key={crumb.id || `crumb-${index}`}>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Link text')}
								value={crumb.text || ''}
								onChange={(value) =>
									updateCrumb(index, { text: value })
								}
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Link URL')}
								value={crumb.url || ''}
								onChange={(value) =>
									updateCrumb(index, { url: value })
								}
							/>
							<Button
								__next40pxDefaultSize
								variant="link"
								isDestructive
								onClick={() => removeCrumb(index)}
							>
								{__('Remove link')}
							</Button>
						</div>
					))}
					<Button
						__next40pxDefaultSize
						variant="secondary"
						style={{ width: '100%', justifyContent: 'center' }}
						onClick={addCrumb}
					>
						{__('Add trail link')}
					</Button>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
