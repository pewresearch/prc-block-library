/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-page'];

const Edit = ({ attributes, context }) => {
    const isVertical = context['prc-block/tabs-vertical'];
    const style = context['prc-block/tabs-style'];
    const { className } = attributes;

    const blockProps = useBlockProps({
        className: classnames({
            'column twelve wide': isVertical,
        }),
        style: {
            marginTop:
                !isVertical && 'is-style-tabular' === style
                    ? '0px!important'
                    : null,
        },
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui segment tab', {
                basic: 'is-style-not-bordered' === className,
            }),
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: false,
        },
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
