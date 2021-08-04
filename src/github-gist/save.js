/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const Save = ( { attributes } ) => {
    const { url, caption } = attributes;

    if ( 'undefined' === typeof url ) {
        return;
    }

    return (
        <Fragment>
            { ! RichText.isEmpty( caption ) && (
                <RichText.Content tagName="figcaption" value={ caption } />
            ) }
        </Fragment>
    );
};

export default Save;
