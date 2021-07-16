/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/** Returns a server side block callback */
const save = ({ attributes }) => {
    const blockProps = useBlockProps.save();
    const { description, extra } = attributes;
    return(
        <div {...blockProps}>
            { description && (<RichText.Content className="description" tagName="div" value={description}/>)}
            { extra && (<RichText.Content className="extra" tagName="ul" value={extra}/>)}
        </div>
    );
};

export default save;
