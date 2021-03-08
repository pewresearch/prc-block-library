/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import {
    InspectorControls,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const Edit = ({
    attributes,
    setAttributes,
    className,
    clientId,
    isSelected,
    context,
}) => {
    const { title, uuid } = attributes;

    const { insertBlock, updateBlockAttributes } = useDispatch(
        'core/block-editor',
    );

    const { controllerClientId, pagesClientId, pages } = useSelect(
        select => {
            const {
                getBlock,
                getBlockRootClientId,
                getAdjacentBlockClientId,
            } = select('core/block-editor');
            const menuBlockClientId = getBlockRootClientId(clientId);
            const pClientId = getAdjacentBlockClientId(menuBlockClientId);
            return {
                controllerClientId: getBlockRootClientId(menuBlockClientId),
                pagesClientId: pClientId,
                pages: getBlock(pClientId).innerBlocks.map(i => {
                    return {
                        clientId: i.clientId,
                        uuid: i.attributes.uuid,
                        title: i.attributes.title,
                    };
                }),
            };
        },
        [clientId],
    );

    const onBlockCreation = () => {
        if (null === uuid) {
            // We will use the first client id assigned as a uuid.
            console.log('onBlockCreation', uuid);
            const newUuid = clientId;
            setAttributes({ uuid: newUuid });
            const newPageBlock = createBlock(
                'prc-block/topic-index-condensed-page',
                {
                    uuid: newUuid,
                    title: 'New Page',
                },
            );
            insertBlock(newPageBlock, false, pagesClientId);
            // updateBlockAttributes(topicIndexViewClientId, {map: });
            // Go create a page block, set the uuid to this uuid. Now they are bonded.
        }
    };

    const onTitleUpdate = t => {
        const tmp = pages;
        console.log('onTitleUpdate->pages', pages);
        if (1 <= pages.length) {
            const matchedPages = tmp.filter(i => i.uuid === uuid);
            if (1 <= matchedPages.length) {
                const targetClientId = matchedPages[0].clientId;
                // Update the block title
                updateBlockAttributes(targetClientId, { title: t });
                // If this block is removed then remove the page??...
            }
        }
    };

    const onBlockSelection = () => {
        if (null !== uuid) {
            updateBlockAttributes(controllerClientId, { active: uuid });
        }
    };

    useEffect(() => {
        onBlockCreation();
    }, []);

    useEffect(() => {
        onTitleUpdate(title);
    }, [title]);

    useEffect(() => {
        console.log('menu item is selected');
        onBlockSelection();
    }, [isSelected]);

    const blockProps = useBlockProps({
        className: classnames(className, 'item', {
            active: uuid === context['prc-block/topic-index-condensed-active'],
        }),
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Menu Item Settings')}>
                    <Fragment>
                        <p>Yep, sure looks like {__`"menu item settings"`}</p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="div" // The tag here is the element output and editable in the admin
                    value={title} // Any existing content, either from the database or an attribute default
                    allowedFormats={[]} // Allow the content to be made bold or italic, but do not allow other formatting options
                    onChange={newTitle => setAttributes({ title: newTitle })} // Store updated content as a block attribute
                    placeholder={__('Politics')} // Display this text before any content has been added by the user
                />
            </div>
        </Fragment>
    );
};

export default Edit;
