/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { uploadIcon, changeIcon, removeIcon } from './icon';
import { Placeholder } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Controls({ attributes, setAttributes, clientId }) {
	const { label, returnLabel, panelIconId, panelIconUrl } = attributes;

	const UploadIconButton = ({ id, url, setAttributes }) => {
		const changeLanguage = typeof id !== 'undefined' && id > 0;
		const previewIcon = undefined !== url && 0 < url.length;
		return (
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ALLOWED_MEDIA_TYPES}
					mode={'browse'}
					multiple={false}
					value={id}
					onSelect={(img) => {
						setAttributes({
							panelIconUrl: img.url,
							panelIconId: img.id,
						});
					}}
					render={({ open }) => {
						return (
							<Fragment>
								{previewIcon ? (
									<figure>
										<img
											src={url + '?w=150&h=150&crop=1'}
											alt=""
											style={{
												width: '50px',
												height: 'auto',
											}}
										/>
									</figure>
								) : (
									<Placeholder
										className="block-editor-media-placeholder"
										withIllustration
										label={__('Icon')}
										instructions={__(
											'Upload an image file, pick one from the media library, or add one with a URL.'
										)}
										style={{
											width: '50px',
											height: '50px',
										}}
										onClick={open}
									/>
								)}
								<Button
									variant="secondary"
									icon={
										changeLanguage ? changeIcon : uploadIcon
									}
									text={
										changeLanguage
											? __('Change Icon')
											: __('Set Icon')
									}
									onClick={open}
									style={{ marginTop: '20px' }}
								/>
								{changeLanguage && (
									<Button
										variant="secondary"
										icon={removeIcon}
										text={__('Remove Icon')}
										onClick={() => {
											setAttributes({
												panelIconUrl: '',
												panelIconId: 0,
											});
										}}
										style={{ marginTop: '20px' }}
									/>
								)}
							</Fragment>
						);
					}}
				/>
			</MediaUploadCheck>
		);
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Labels', 'navigation-panel')}>
					<TextControl
						label={__('Navigation Label', 'navigation-panel')}
						value={label}
						onChange={(value) => setAttributes({ label: value })}
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('Return Label', 'navigation-panel')}
						value={returnLabel}
						help={__('Defaults to "Return to {{label}}"')}
						onChange={(value) =>
							setAttributes({ returnLabel: value })
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title={__('Panel Icon', 'navigation-panel')}>
					<UploadIconButton
						id={panelIconId}
						url={panelIconUrl}
						setAttributes={setAttributes}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
