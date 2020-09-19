import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

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
