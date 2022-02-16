/**
 * External dependencies
 */
import classnames from 'classnames';
import { BlockInserterButton, CaretHeadingLink } from '@prc-app/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree'];

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const { heading, url } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: () => (
                <BlockInserterButton
                    label={__('Add New Tree List')}
                    blockName="prc-block/taxonomy-tree"
                    clientId={clientId}
                />
            ),
        },
    );

    return (
        <div {...blockProps}>
            <CaretHeadingLink
                url={url}
                heading={heading}
                setAttributes={setAttributes}
            />
            <div {...innerBlocksProps} />
        </div>
    );
};

export default edit;
