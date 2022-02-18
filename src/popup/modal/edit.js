/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	useInnerBlocksProps,
    useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const edit = ({ attributes, setAttributes }) => {
	const { title, inverted, className } = attributes;

	const isVideo = className === 'is-style-video';

    const blockProps = useBlockProps({
		className: `ui modal active ${isVideo && true !== inverted ? 'basic' : ''}`,
	});

    const innerBlocksProps = useInnerBlocksProps({
		className: 'content',
	}, {
        orientation: 'vertical',
        templateLock: false,
    });

    return(
		<Fragment>
			<InspectorControls>
				<PanelBody title={'Modal Settings'}>
					<ToggleControl
						label={'Use white background'}
						checked={inverted}
						onChange={() => setAttributes({ inverted: !inverted })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{ true !== isVideo && (
					<div class="header">
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
			</div>
		</Fragment>
	);
};

export default edit;
