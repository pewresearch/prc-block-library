/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
    useInnerBlocksProps,
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
    const { width, height, borderColor, bgColor, fluid } = attributes;
    
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

    const { isFluid } = useSelect(select => {
        const parentBlockId = select('core/block-editor').getBlockRootClientId(clientId);
        const parentBlock = select('core/block-editor').getBlock(parentBlockId);
        return {
            isFluid: null !== parentBlock && parentBlock.name === 'prc-block/column',
        };
    });

    useEffect(()=>{
        if ( isSelected) {
            setAttributes({
                fluid: isFluid,
            });
            console.log('isFluid?', isFluid);
        }
    }, [isFluid, isSelected]);

    // If is fluid then skip the resizable box.
    if ( isFluid ) {
        return (
            <Fragment>
                <Controls clientId={clientId} />
                <div {...blockProps}>
                    <div {...innerBlocksProps} />
                </div>
            </Fragment>
        );
    }

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
