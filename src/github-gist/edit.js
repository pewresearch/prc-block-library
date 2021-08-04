/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PlainText, RichText, useBlockProps } from '@wordpress/block-editor';
import { withNotices, Icon } from '@wordpress/components';
import { Fragment, useState, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import Gist from './gist';

const Edit = (props) => {
    const { attributes, setAttributes, className, clientId, isSelected, noticeOperations, noticeUI } = props;
    const { url, file, meta, caption } = attributes;

    const { setNotice, removeNotice } = noticeOperations;
    const [ preview, setPreview ] = useState( attributes.preview ? attributes.preview : false );
    const [ gistCallbackId, setGistCallbackId ] = useState('');

    useEffect( () => {
        if ( !! gistCallbackId === false ) {
            setGistCallbackId( Edit.__nextGist() );
        }
    }, [ gistCallbackId ] );

    useEffect( () => {
        if ( attributes.url ) {
            setPreview( true );
        }
    }, [] );

    const updateURL = ( newURL ) => {
        setAttributes( { url: newURL, file: '' } );

        if ( 'undefined' === typeof newURL || ! newURL.trim() ) {
            setPreview( false );
            return;
        }

        if ( ! attributes.url ) {
            setPreview( true );
        }

        // Check for #file in the entered URL. If it's there, let's use it properly.
        const file = newURL.split( '#file-' ).pop();

        if ( newURL.match( /#file-*/ ) !== null ) {
            const newURLWithNoFile = newURL.replace( file, '' ).replace( '#file-', '' );

            setAttributes( { url: newURLWithNoFile } );
            setAttributes( { file: file.replace( /-([^-]*)$/, '.' + '$1' ) } );
        }

        clearErrors();
    };

    const handleErrors = () => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice( 'Sorry, this URL is not a GitHub Gist.' );
        setPreview( false );
    };

    const clearErrors = () => {
        const { noticeOperations } = props;
        noticeOperations.removeAllNotices();
    };

    return (
        <Fragment>
            { url && url.length > 0 && isSelected && <Controls { ...props } /> }
            { url && url.length > 0 && isSelected && <Inspector { ...props } /> }
            { preview ? (
                url && (
                    <div className={ classnames( className, meta ? null : 'no-meta' ) }>
                        <Gist url={ url } file={ file } callbackId={ gistCallbackId } onError={ () => {
                            handleErrors();
                        } } />
                        { ( ! RichText.isEmpty( caption ) || isSelected ) && (
                            <RichText
                                tagName="figcaption"
                                placeholder={ __( 'Write caption…' ) }
                                value={ caption }
                                onChange={ ( value ) => setAttributes( { caption: value } ) }
                                keepPlaceholderOnFocus
                                inlineToolbar
                            />
                        ) }
                    </div>
                )
            ) : (
                <Fragment>
                    { noticeUI }
                    <div className={ className }>
                        <label htmlFor={ `gist-url-input-${ clientId }` }>
                            { __( 'Gist URL' ) }
                        </label>
                        <PlainText
                            id={ `gist-url-input-${ clientId }` }
                            className="input-control"
                            value={ url }
                            placeholder={ __( 'Add GitHub Gist URL…' ) }
                            onChange={ updateURL }
                        />
                    </div>
                </Fragment>
            ) }

        </Fragment>
    );
};

Edit.__gistCallbackId = 0;

// Each time we request a new Gist, we have to provide a new
// global function name to serve as the JSONP callback.
Edit.__nextGist = () => {
    return 'embed_gist_callback_' + Edit.__gistCallbackId++;
};

export default compose( withNotices )( Edit );
