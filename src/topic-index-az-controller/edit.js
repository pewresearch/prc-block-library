/**
 * WordPress dependencies
 */
import {
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const edit = ({ className }) => {
    const blockProps = useBlockProps({
        className,
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        orientation: 'horizontal',
        template: [
            [
                'prc-block/grid',
                {},
                [
                    [
                        'prc-block/row',
                        { equal: true },
                        [
                            ['prc-block/column', {}],
                            ['prc-block/column', {}],
                            ['prc-block/column', {}],
                        ],
                    ],
                ],
            ],
        ],
        templateLock: 'all',
    });

    return <div {...innerBlocksProps} />;
};

export default edit;
