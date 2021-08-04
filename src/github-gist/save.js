/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
    const { url, file, meta, caption } = attributes;

    if ( 'undefined' === typeof url ) {
        return;
    }

    const src = file ? `${ url }.js?file=${ file }` : `${ url }.js`;

    const noscriptSrc = file
        ? `${ url }#file-${ file.replace( '.', '-' ) }`
        : `${ url }`;

    const blockProps = useBlockProps.save({
        className: classnames({
            'no-meta': ! meta,
        })
    });

    return (
        <div {...blockProps}>
            <script src={ src } />
            <noscript>
                <a href={ noscriptSrc }>{ __( 'View this gist on GitHub' ) }</a>
            </noscript>
            { ! RichText.isEmpty( caption ) && (
                <RichText.Content tagName="figcaption" value={ caption } />
            ) }
        </div>
    );
};

export default Save;
