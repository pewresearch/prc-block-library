/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/** Returns a server side block callback */
const save = ({ attributes }) => {
    const { description, extra } = attributes;
    return(
        <Fragment>
            { description && (<RichText.Content className="description" tagName="div" value={description}/>)}
            { extra && (<RichText.Content className="extra" tagName="ul" value={extra}/>)}
        </Fragment>
    );
};

export default save;
