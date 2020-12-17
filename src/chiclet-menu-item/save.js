import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Menu } from 'semantic-ui-react';
 
const edit = ({attributes}) => {
    const blockProps = useBlockProps.save({
        className: 'item'
    });
    const { text, link } = attributes;
    return (
        <div {...blockProps}>
            <RichText.Content
            tagName="a"
            className="ui basic fluid button"
            value={text}
            href={link}
            />
        </div>
    );
}

export default edit;