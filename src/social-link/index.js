/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

const SocialLinksControls = createHigherOrderComponent(
	(BlockEdit) =>
		function OverrideEdit(props) {
			const { name, attributes, setAttributes } = props;
			if ('core/social-links' !== name) {
				return <BlockEdit {...props} />;
			}
			const { title, description, url } = attributes;
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={__('Social Meta Info')}>
							<TextControl
								label={__('Title')}
								value={title}
								onChange={(value) => setAttributes({ title: value })}
							/>
							<TextControl
								label={__('Description')}
								value={description}
								onChange={(value) => setAttributes({ description: value })}
							/>
							<TextControl
								label={__('URL')}
								help={__(
									'Setting a url here will override any selections on the individual social links.',
								)}
								value={url}
								onChange={(value) => setAttributes({ url: value })}
							/>
						</PanelBody>
					</InspectorControls>
					<BlockEdit {...props} />
				</Fragment>
			);
		},
	'withSocialLinksExtraControls',
);

addFilter(
	'editor.BlockEdit',
	'prc-block/social-links',
	SocialLinksControls,
	21,
);

// registerBlockVariation('core/social-link', {
// 	name: 'whatsapp',
// 	title: __('WhatsApp'),
// 	attributes: {
// 		service: 'whatsapp',
// 	},
// 	icon: () => {

// 	}
// });

// registerBlockVariation('core/social-link', {
// 	name: 'print',
// 	title: __('Print'),
// 	attributes: {
// 		service: 'print',
// 	},
// 	icon: () => {

// 	}
// });
