/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

const SocialLinksControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;
        if ('core/social-links' !== name) {
            return <BlockEdit {...props} />;
        }
		const { title, description } = attributes;
        return (
            <Fragment>
				<InspectorControls>
					<PanelBody title={__('Title and Description')}>
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
					</PanelBody>
				</InspectorControls>
				<BlockEdit {...props} />
			</Fragment>
        );
    };
}, 'withSocialLinksExtraControls');
addFilter('editor.BlockEdit', 'prc-block/social-links', SocialLinksControls, 21);
