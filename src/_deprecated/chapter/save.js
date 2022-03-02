import { RichText } from '@wordpress/block-editor';

const save = ({ attributes, className }) => {
    const { id, value, level } = attributes;
    const tagName = `h${level}`;
    return (
        <RichText.Content
            value={value}
            tagName={tagName}
            className={className}
            id={id}
        />
    );
};

export default save;
