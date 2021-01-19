// eslint-disable-next-line import/no-unresolved
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import {
    TextControl,
    ToggleControl,
    TreeSelect,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Segment } from 'semantic-ui-react';

import { getTermsAsTree } from 'shared';

const AltPostLabelControl = ({label, isSelected, setAttributes}) => {
    return(
        <Fragment>
            <TextControl
                label="Alt Post Label"
                value={ label }
                onChange={ l => setAttributes({ altPostLabel: l }) }
            />
        </Fragment>
    );
}

const CollectionTermControl = ({termId, enableFlags, isSelected, setAttributes}) => {
    const [terms, setTerms] = useState(false);
    const { editPost } = useDispatch('core/editor');

    useEffect(()=>{
        getTermsAsTree('collection').then(options => {
            setTerms(options);
        })
    }, []);

    return(
        <Fragment>
            {terms !== false && (
                <Fragment>
                    <TreeSelect
                        label="Select Collection"
                        noOptionLabel="No Collection"
                        onChange={ selected => {
                            console.log("Collection Selected", selected);
                            editPost({ collection: parseFloat(selected) });
                        } }
                        selectedId={ termId }
                        tree={terms}
                    />
                    <ToggleControl
                        label="Enable Flags"
                        checked={ enableFlags }
                        onChange={ () => setAttributes({enableFlags: !enableFlags}) }
                    />
                </Fragment>
            )}
        </Fragment>
    );
}

const PDFControl = ({attachmentId, isSelected, setAttributes}) => {
    const ALLOWED_MEDIA_TYPES = ['application/pdf'];
    return(
        <Fragment>
            <MediaUploadCheck>
                <MediaUpload
                    title={`Upload PDF`}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    value={attachmentId}
                    onSelect={pdf => setAttributes({pdfId: pdf.id})}
                    render={({ open }) => {
                        return (
                            <Fragment>
                                {null === attachmentId && <a onClick={open} style={{cursor: 'pointer'}}><i class="icon file pdf outline"></i>Upload a PDF version of this fact sheet</a> }
                                {null !== attachmentId && <a onClick={open} style={{cursor: 'pointer'}}><i class="icon file pdf outline"></i>Change the PDF version of this fact sheet</a> }
                            </Fragment>
                        );
                    }}
                />
            </MediaUploadCheck>
        </Fragment>
    );
}

/** Returns a server side block callback */
const edit = ({ attributes, className, setAttributes, isSelected, clientId}) => {
    const blockProps = useBlockProps( {
        className
    } );

    const { 
        altPostLabel,
        enableFlags,
        pdfId
    } = attributes;

    const { termId } = useSelect( ( select ) => {
        return {
            termId: select( 'core/editor' ).getEditedPostAttribute('collection'),
        }
    }, [] );

    return(
        <div { ...blockProps }>
            <Segment color="beige" inverted>
                <CollectionTermControl termId={termId} enableFlags={enableFlags} isSelected={isSelected} setAttributes={setAttributes}/>
                { ! isNaN(termId) && <AltPostLabelControl label={altPostLabel} isSelected={isSelected} setAttributes={setAttributes}/> } 
                <PDFControl attachmentId={pdfId} isSelected={isSelected} setAttributes={setAttributes}/>
            </Segment>
        </div>
    );
};

export default edit;
