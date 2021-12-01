/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [];

const edit = ({ attributes, className, setAttributes }) => {
    const { subHeading } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className, 'ui list'),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
    });

    return <div {...innerBlocksProps} />;
};

export default edit;
