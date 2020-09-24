import { InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes, className }) => {
    const { width } = attributes;
    return (
        <div className={className} style={{ maxWidth: width }}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
