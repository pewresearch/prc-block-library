/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps
} from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
import { dispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import './edit.scss';
import Controls from '../_shared';

const ALLOWED_BLOCKS = ['prc-block/flip-card-front', 'prc-block/flip-card-back'];

const TEMPLATE = [
    ['prc-block/flip-card-front', {}],
    ['prc-block/flip-card-back', {}],
];

const edit = ({ attributes, className, setAttributes, isSelected, clientId }) => {
    const { width, height, borderColor, bgColor } = attributes;
    
    const { toggleSelection } = dispatch('core/block-editor');

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps({}, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
        template: TEMPLATE,
        __experimentalCaptureToolbars: true,
        renderAppender: false,
    });

    return (
        <Fragment>
            <Controls clientId={clientId} />
            <div {...blockProps}>
                <ResizableBox
                    size={{
                        width,
                        height,
                    }}
                    minHeight="200"
                    minWidth="200"
                    maxWidth="640"
                    enable={{
                        top: false,
                        right: isSelected,
                        bottom: isSelected,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            width: parseInt(width + delta.width, 10),
                            height: parseInt(height + delta.height, 10),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                    style={{
                        borderColor,
                        backgroundColor: bgColor,
                    }}
                >
                    <div {...innerBlocksProps} />
                </ResizableBox>
            </div>
        </Fragment>
    );
};

export default edit;
