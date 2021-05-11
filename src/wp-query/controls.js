/* eslint-disable radix */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    PanelBody,
    Placeholder,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    Flex,
    FlexItem,
    FlexBlock,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import TaxQuery from './taxQuery';
import fetchPosts from './fetch';

const Fields = ({ attributes, setAttributes, disabled }) => {
    const {
        postsPerPage,
        storyItemDisableExcerpt,
        storyItemImageSlot,
        storyItemImageSize,
        taxQuery,
    } = attributes;

    return (
        <Fragment>
            <div>
                <h4 className="sans-serif">Story Item Settings</h4>
                <ToggleControl
                    label="Disable Images"
                    checked={'disabled' === storyItemImageSlot}
                    onChange={() =>
                        setAttributes({
                            storyItemImageSlot:
                                !'disabled' === storyItemImageSlot,
                        })
                    }
                    disabled={disabled}
                />
                <ToggleControl
                    label="Disable Excerpt"
                    checked={storyItemDisableExcerpt}
                    onChange={() =>
                        setAttributes({
                            storyItemDisableExcerpt: !storyItemDisableExcerpt,
                        })
                    }
                    disabled={disabled}
                />
            </div>

            <HorizontalRule />

            <div>
                <h4 className="sans-serif">Query Arguments</h4>
                <RangeControl
                    label={__('Number of posts')}
                    value={postsPerPage}
                    onChange={val => setAttributes({ postsPerPage: val })}
                    min={3}
                    max={10}
                    required
                    disabled={disabled}
                />
            </div>

            <HorizontalRule />

            <div>
                <h4 className="sans-serif">Taxonomy Query Arguments</h4>
                <TaxQuery taxQuery={taxQuery} setAttributes={setAttributes} />
            </div>

            <HorizontalRule />
        </Fragment>
    );
};

const Controls = ({ attributes, setAttributes, posts, setPosts, clientId }) => {
    const { postId, postsPerPage } = attributes;
    const [busy, toggleBusy] = useState(false);

    const clickHandler = () => {
        toggleBusy(true);
        fetchPosts(attributes).then(data => {
            setTimeout(() => {
                toggleBusy(false);
                const tmp = data.filter((e, index) => {
                    return index <= postsPerPage - 1;
                });
                setPosts(tmp);
            }, 3600);
        });
    };

    useEffect(() => {
        console.log('initial load', postId);
        if (undefined !== postId) {
            fetchPosts(attributes).then(data => {
                setTimeout(() => {
                    const tmp = data.filter((e, index) => {
                        return index <= postsPerPage - 1;
                    });
                    setPosts(tmp);
                }, 3600);
            });
        }
    }, [clientId]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Query Arguments')}>
                    <Fields
                        attributes={attributes}
                        setAttributes={setAttributes}
                        disabled={busy}
                    />
                    <Button
                        isBusy={busy}
                        isPrimary
                        onClick={() => clickHandler()}
                    >
                        Update
                    </Button>
                </PanelBody>
            </InspectorControls>
            {false === posts && undefined === postId && (
                <Placeholder label="Configure Query Args" isColumnLayout>
                    <div>
                        <Fields
                            attributes={attributes}
                            setAttributes={setAttributes}
                            disabled={busy}
                        />
                        <Button
                            isBusy={busy}
                            isPrimary
                            onClick={() => clickHandler()}
                        >
                            Query Posts
                        </Button>
                    </div>
                </Placeholder>
            )}
        </Fragment>
    );
};

export default Controls;
