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
import {
	PanelBody,
	SelectControl,
	ToggleControl
} from '@wordpress/components';

const edit = ({ attributes, setAttributes }) => {
	const { title, inverted, transition, className } = attributes;

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
					<div>
						<ToggleControl
							label={'Use white background'}
							checked={inverted}
							onChange={() => setAttributes({ inverted: !inverted })}
						/>
						<SelectControl
							label="Transition"
							value={ transition }
							options={ [
								{ label: 'Scale', value: 'scale' },
								{ label: 'Zoom', value: 'zoom' },
								{ label: 'Fade', value: 'fade' },
								{ label: 'Fade Up', value: 'fade up' },
								{ label: 'Drop', value: 'drop' },
								{ label: 'Fly Up', value: 'fly up' },
							] }
							onChange={ ( value ) => setAttributes( {transition: value} ) }
						/>
					</div>
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
