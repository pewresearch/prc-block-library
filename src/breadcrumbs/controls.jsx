/**
 * External Dependencies
 */

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
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const {
		contentJustification,
		showLeadingSeparator,
		showCurrentPageTitle,
		showHome,
		showIndex,
		homeCrumb,
		indexCrumb,
	} = attributes;

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
							<TextControl
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
							<TextControl
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
			</InspectorControls>
		</Fragment>
	);
}
