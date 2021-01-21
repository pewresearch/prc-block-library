/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-unresolved
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    Button,
    ButtonGroup,
    Placeholder,
    TextControl,
    ToggleControl,
    TreeSelect,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

import { getTermsAsTree } from 'shared';

const AltPostLabelControl = ({ label, setAttributes }) => {
    return (
        <Fragment>
            <TextControl
                label="Alternate Post Label"
                value={label}
                onChange={l => setAttributes({ altPostLabel: l })}
            />
        </Fragment>
    );
};

const CollectionTermControl = ({ termId, enableFlags, setAttributes }) => {
    const [terms, setTerms] = useState(false);
    const { editPost } = useDispatch('core/editor');

    useEffect(() => {
        getTermsAsTree('collection').then(options => {
            setTerms(options);
        });
    }, []);

    return (
        <Fragment>
            {false !== terms && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <TreeSelect
                            label="Select Collection"
                            noOptionLabel="No Collection"
                            onChange={selected =>
                                editPost({ collection: parseFloat(selected) })
                            }
                            selectedId={termId}
                            tree={terms}
                        />
                    </div>
                    <div style={{ paddingLeft: '1em' }}>
                        <ToggleControl
                            label="Enable Flags"
                            checked={enableFlags}
                            onChange={() =>
                                setAttributes({ enableFlags: !enableFlags })
                            }
                        />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

const PDFControl = ({ attachmentId, setAttributes }) => {
    const ALLOWED_MEDIA_TYPES = ['application/pdf'];
    return (
        <MediaUploadCheck>
            <MediaUpload
                title="Upload PDF"
                allowedTypes={ALLOWED_MEDIA_TYPES}
                value={attachmentId}
                onSelect={pdf => setAttributes({ pdfId: pdf.id })}
                render={({ open }) => (
                    <ButtonGroup>
                        <Button isPrimary onClick={open}>
                            {0 === attachmentId ? `Upload PDF` : `Change PDF`}
                        </Button>
                        {0 !== attachmentId && (
                            <Button
                                isSecondary
                                onClick={() => setAttributes({ pdfId: 0 })}
                            >
                                Clear PDF
                            </Button>
                        )}
                    </ButtonGroup>
                )}
            />
        </MediaUploadCheck>
    );
};

const edit = ({ attributes, className, setAttributes }) => {
    const blockProps = useBlockProps({
        className,
    });

    const { altPostLabel, enableFlags, pdfId } = attributes;

    const { termId } = useSelect(select => {
        return {
            termId: select('core/editor').getEditedPostAttribute('collection'),
        };
    }, []);

    return (
        <div {...blockProps}>
            <Placeholder
                label={__('Configure Fact Sheet Collection')}
                isColumnLayout
            >
                {!isNaN(termId) && (
                    <AltPostLabelControl
                        label={altPostLabel}
                        setAttributes={setAttributes}
                    />
                )}
                <CollectionTermControl
                    termId={termId}
                    enableFlags={enableFlags}
                    setAttributes={setAttributes}
                />
                <PDFControl
                    attachmentId={pdfId}
                    setAttributes={setAttributes}
                />
            </Placeholder>
        </div>
    );
};

export default edit;
