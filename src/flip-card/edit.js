import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED = ['prc-block/flip-card-front', 'prc-block/flip-card-back'];
const TEMPLATE = [
    ['prc-block/flip-card-front', {}],
    ['prc-block/flip-card-back', {}],
];

const edit = ({ className }) => {
    return (
        <div className={className}>
            <InnerBlocks
                allowedBlocks={ALLOWED}
                template={TEMPLATE}
                templateLock="all"
            />
        </div>
    );
};

export default edit;
