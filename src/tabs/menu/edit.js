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
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import VerticalControls from '../vertical-control';

const ALLOWED_BLOCKS = ['prc-block/tabs-menu-item'];

const BLOCKS_TEMPLATE = [['prc-block/tabs-menu-item', {}]];

const Edit = ({ className, clientId, context }) => {
    // eslint-disable-next-line react/destructuring-assignment
    const isVertical = context['prc-block/tabs-vertical'];
    // eslint-disable-next-line react/destructuring-assignment
    const style = context['prc-block/tabs-style'];

    const controllerClientId = useSelect(
        select => select('core/block-editor').getBlockRootClientId(clientId),
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className, {
            'column four wide': isVertical,
        }),
        style: {
            marginBottom:
                !isVertical && 'is-style-tabular' === style
                    ? '-1px!important'
                    : null,
        },
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
            template: BLOCKS_TEMPLATE,
            templateLock: false,
        },
    );

    return (
        <div {...blockProps}>
            <VerticalControls
                vertical={isVertical}
                controllerClientId={controllerClientId}
            />
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
