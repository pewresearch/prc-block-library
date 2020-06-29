import { InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { title, className } = attributes;
    return (
        <div
            className="js-react-collapsible"
            data-title={title}
            data-style={className}
        >
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
