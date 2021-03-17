/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    InnerBlocks,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/menu-link', 'prc-block/taxonomy-tree-more'];

const edit = ({ attributes, className, setAttributes }) => {
    const { subHeading } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui list'),
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
        },
    );

    return (
        <div {...blockProps}>
            <RichText
                className="ui sub header"
                identifier="label"
                value={subHeading}
                onChange={newSubHeading =>
                    setAttributes({ subHeading: newSubHeading })
                }
                aria-label={__('Subheading text')}
                placeholder={__('Key Topics')}
                keepPlaceholderOnFocus
                withoutInteractiveFormatting
                allowedFormats={[]}
            />
            <div {...innerBlocksProps} />
        </div>
    );
};

export default edit;
