import { InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes, className }) => {
    return (
        <div className={className}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
