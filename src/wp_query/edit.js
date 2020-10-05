import { Fragment, useState, useEffect } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
} from '@wordpress/components';

const edit = ({
    attributes,
    className,
    setAttributes,
    isSelected,
    clientId,
}) => {
    const { postType, perPage, taxonomies } = attributes;
    const ALLOWED = ['prc-block/story-item'];
    const [loaded, toggleLoaded] = useState(false);
    const [postTypes, setPostTypes] = useState({});

    // Get number of story items in the innerblocks...

    const insertPostsIntoInnerBlocks = posts => {
        // given the client id go into the innerblocks and replace all the items in there with these items as story items.
    };

    // When any of these attributes are changed go fetch posts!
    useEffect(() => {
        // Do fetch stuff and setting of posts
    }, [postType, perPage]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Query Arguments')}>
                    <SelectControl
                        label="Post Type"
                        value={postType}
                        options={postTypes}
                        onChange={type => {
                            console.log(type);
                        }}
                    />
                    <TextControl
                        label="Number of Posts"
                        value={Number(perPage)}
                        onChange={numPosts => {
                            setAttributes({ perPage: Number(numPosts) });
                        }}
                    />
                </PanelBody>
            </InspectorControls>
            <InnerBlocks allowedBlocks={ALLOWED} />
        </Fragment>
    );
};

export default edit;
