import { RichText } from '@wordpress/block-editor';

const edit = ({ attributes, className, setAttributes }) => {
    const { content } = attributes;

    return (
        <RichText
            tagName="h2"
            value={content}
            onChange={c => setAttributes({ content: c })} // Store updated content as a block attribute
            placeholder="" // Display this text before any content has been added by the user
            formattingControls={[]}
            className={className}
            multiline={false}
        />
    );
};

export default edit;
