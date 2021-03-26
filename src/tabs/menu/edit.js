/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

// eslint-disable-next-line import/no-unresolved
import { BlockInserterButton } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/tabs-menu-item'];

const Edit = ({ className, clientId, context }) => {
    // eslint-disable-next-line react/destructuring-assignment
    const isVertical = context['prc-block/tabs-vertical'];
    // eslint-disable-next-line react/destructuring-assignment
    const style = context['prc-block/tabs-style'];

    const blockProps = useBlockProps({
        className: classnames(className, { 'column four wide': isVertical }),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui fluid menu', {
                vertical: isVertical,
                pointing: 'is-style-pointing' === style,
                secondary: 'is-style-secondary' === style,
                tabular: 'is-style-tabular' === style,
                text: 'is-style-text' === style,
            }),
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: isVertical ? 'vertical' : 'horizontal',
            templateLock: false,
            renderAppender: () => (
                <BlockInserterButton
                    label="Add New Menu Item"
                    blockName="prc-block/tabs-menu-item"
                    clientId={clientId}
                />
            ),
        },
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
