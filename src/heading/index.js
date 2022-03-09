/**
 * External Dependencies
 */
import { isEmpty } from 'lodash';
import { MediaDropZone } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { createHigherOrderComponent } from '@wordpress/compose';
 import { Fragment } from '@wordpress/element';
 import {
	createBlock,
    registerBlockStyle,
    registerBlockVariation
} from '@wordpress/blocks';
import { BlockControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	BaseControl,
    KeyboardShortcuts,
	TextControl,
    ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import './style.scss';

// Add toolbar to core/heading block with toggle for isChapter attribute.
const HeadingBlockFilter = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;
        if ('core/heading' !== name) {
            return <BlockEdit {...props} />;
        }
		const { isChapter, icon, altTocText, content, anchor } = attributes;
        return (
            <Fragment>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={ 'book-alt' }
							label="Is Chapter?"
							isActive={isChapter}
							onClick={() => {
								const attrs = {
									anchor: true === !isChapter ? `CHAPTER-${anchor}` : anchor.replace(/CHAPTER-/, ''),
									isChapter: !isChapter
								}
								setAttributes({...attrs});
							}}
						/>
					</ToolbarGroup>
				</BlockControls>
				<InspectorAdvancedControls>
					{isChapter && (
						<Fragment>
							<TextControl
								label={__('Alternate TOC Text', 'prc-block-library')}
								value={altTocText}
								placeholder={content}
								onChange={(value) => setAttributes({altTocText: value})}
							/>

							<BaseControl label={__('Chapter Icon', 'prc-block-library')}>
								<MediaDropZone
									attachmentId={0 === icon ? false : icon}
									mediaType={['image']}
									mediaSize={'heading-block--chapter-icon'}
									onUpdate={(image) => {
										console.log("settingAttributes...", image);
										setAttributes({
											icon: image.id,
										});
									}}
								/>
							</BaseControl>
						</Fragment>
					)}
				</InspectorAdvancedControls>
                <BlockEdit {...props} />
            </Fragment>
        );
    };
}, 'withChapterControls');
addFilter('editor.BlockEdit', 'prc-block/heading', HeadingBlockFilter, 21);

/**
 * Modify default settings on core/heading block. Change the default heading level to 4 and add isChapter attribute to replace prc-block/chapter at a later date.
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function modifyDefaultSettings( settings, name ) {
    if ( 'core/heading' !== name ) {
        return settings;
    }
    settings.attributes.level.default = 4;
    settings.attributes.isChapter = {
        type: 'boolean',
        default: false,
    };
	settings.transforms.from = [...settings.transforms.from, {
		type: 'block',
		blocks: [ 'prc-block/chapter' ],
		transform: ( { value, level } ) => {
			return createBlock( 'core/heading', {
				content: value,
				level,
				isChapter: true,
			} );
		},
	}];
	return settings;
}

addFilter(
    'blocks.registerBlockType',
    'prc-block-library/heading',
    modifyDefaultSettings,
);

registerBlockStyle('core/heading', [
    {
        name: 'section-header',
        label: 'Section Header',
    },
    {
        name: 'sub-header',
        label: 'Sub Header',
    },
]);

registerBlockVariation('core/heading', {
    name: 'section-header',
    title: __('Section Header'),
    description: __('A heading styled for "section headings".'),
    attributes: {
        className: 'is-style-section-header',
        level: 3,
    },
});

registerBlockVariation('core/heading', {
    name: 'chapter',
    title: __('Chapter'),
    description: __('A chapter heading.'),
	icon: 'editor-ol',
    attributes: {
        isChapter: true,
    },
});
