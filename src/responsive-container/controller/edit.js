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
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['prc-block/responsive-container-view'];

const edit = ({ attributes, className, setAttributes }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
    });

    return (
        <div {...innerBlocksProps}/>
    );
};

export default edit;
