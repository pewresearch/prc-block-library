import { InnerBlocks } from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import './edit.scss';

const ALLOWED = ['prc-block/flip-card-front', 'prc-block/flip-card-back'];
const TEMPLATE = [
    ['prc-block/flip-card-front', {}],
    ['prc-block/flip-card-back', {}],
];

const edit = ({ attributes, className, setAttributes, isSelected }) => {
    const { width } = attributes;
    const { toggleSelection } = dispatch('core/block-editor');
    return (
        <div className={className}>
            <ResizableBox
                size={{
                    width,
                }}
                minWidth="200"
                maxWidth="640"
                enable={{
                    top: false,
                    right: isSelected,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                onResizeStop={(event, direction, elt, delta) => {
                    setAttributes({
                        width: parseInt(width + delta.width, 10),
                    });
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
                }}
            >
                <InnerBlocks
                    allowedBlocks={ALLOWED}
                    template={TEMPLATE}
                    templateLock="all"
                />
            </ResizableBox>
        </div>
    );
};

export default edit;
