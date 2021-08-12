/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
    InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['prc-block/responsive-container-view'];
const TEMPLATE = [
    [ 'prc-block/responsive-container-view', {
        min: 980,
        max: 0,
    } ],
    [ 'prc-block/responsive-container-view', {
        min: 480,
        max: 979,
    } ],
    [ 'prc-block/responsive-container-view', {
        min: 0,
        max: 479,
    } ],
];

const edit = ({ className, isSelected }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
        template: TEMPLATE,
        renderAppender: isSelected ? InnerBlocks.ButtonBlockAppender : false,
    });

    return (
        <div {...innerBlocksProps}/>
    );
};

export default edit;
