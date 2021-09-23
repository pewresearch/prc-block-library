/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';

const save = ({ attributes }) => {
    const { title, blockIndexAttr } = attributes;
    return (
        <Fragment>
            {/* {blockIndexAttr} {title && (<RichText.Content tagName="p" value={title} />)} */}
        </Fragment>
    )
};

export default save;
