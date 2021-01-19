// eslint-disable-next-line import/no-unresolved
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import {
    ToolbarButton, 
    ToolbarGroup, 
    Popover,
    TextControl,
    TreeSelect,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Segment } from 'semantic-ui-react';

import { getTermsAsTree } from 'shared';

const AltPostIdControl = ({url, setAttributes}) => {
    const [ isLinkOpen, setIsLinkOpen ] = useState( false );
    return(
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    aria-expanded={isLinkOpen}
                    aria-haspopup="true"
                    label={__('Set Link')}
                    icon="admin-links"
                    onClick={()=>setIsLinkOpen(!isLinkOpen)}
                    showTooltip
                />
                {true === isLinkOpen && (
                    <Popover
                        position="bottom center"
                        onClose={ () => setIsLinkOpen( false ) }
                    >
                        <LinkControl
                            className="wp-block-navigation-link__inline-link-input"
                            value={{ url }}
                            showInitialSuggestions={ true }
                            suggestionsQuery={ { type: 'post', subtype: 'fact-sheets' } }
                            onChange={(p) => {
                                setAttributes({altPostUrl: p.url});
                            }}
                            settings={[]}
                        />
                    </Popover>
                )}
            </ToolbarGroup>
        </BlockControls>
    );
}

const AltLangPostControl = ({url, label, isSelected, setAttributes}) => {
    return(
        <Fragment>
            <TextControl
                label="Alt Post Label"
                value={ label }
                onChange={ l => setAttributes({ altPostLabel: l }) }
            />
            <AltPostIdControl url={url} setAttributes={setAttributes}/>
        </Fragment>
    );
}

const CollectionTermControl = ({type, isSelected, setAttributes}) => {
    const [terms, setTerms] = useState(false);

    const { termId } = useSelect( ( select ) => {
        return {
            termId: select( 'core/editor' ).getEditedPostAttribute('collection'),
        }
    }, [] );
    
    const { editPost } = useDispatch('core/editor');

    useEffect(()=>{
        getTermsAsTree('collection').then(options => {
            setTerms(options);
        })
    }, []);

    return(
        <Fragment>
            {terms !== false && (
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
            )}
        </Fragment>
    );
}

const PDFControl = ({attachmentId, isSelected, setAttributes}) => {
    const ALLOWED_MEDIA_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
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
                                {null === attachmentId && <a onClick={open}><i class="icon file pdf outline"></i>Upload a PDF version of this fact sheet</a> }
                                {null !== attachmentId && <a onClick={open}><i class="icon file pdf outline"></i>Change the PDF version of this fact sheet</a> }
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
        altPostUrl,
        altPostLabel,
        collectionType,
        pdfId
    } = attributes;
    return(
        <div { ...blockProps }>
            <Segment color="beige" inverted>
                <AltLangPostControl url={altPostUrl} label={altPostLabel} isSelected={isSelected} setAttributes={setAttributes}/>
                <CollectionTermControl type={collectionType} isSelected={isSelected} setAttributes={setAttributes}/>
                <PDFControl attachmentId={pdfId} isSelected={isSelected} setAttributes={setAttributes}/>
            </Segment>
        </div>
    );
};

export default edit;
