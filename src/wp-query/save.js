import { InnerBlocks } from '@wordpress/block-editor';

const save = ({ className, attributes }) => {
    return (
        <div className={className}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
