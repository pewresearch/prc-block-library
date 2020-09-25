import { InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes, className }) => {
    const { width, borderColor, bgColor } = attributes;
    return (
        <div
            className={className}
            style={{ maxWidth: width }}
            data-bg={bgColor}
            data-border={borderColor}
        >
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
