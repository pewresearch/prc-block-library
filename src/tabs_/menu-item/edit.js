/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';

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
                    title: '',
                },
            );
            insertBlock(newPageBlock, false, pagesClientId);
            // updateBlockAttributes(topicIndexViewClientId, {map: });
            // Go create a page block, set the uuid to this uuid. Now they are bonded.
        }
    };

    const onTitleUpdate = t => {
        setAttributes({ slug: cleanForSlug(t) });
        const tmp = pages;
        if (1 <= pages.length) {
            const matchedPages = tmp.filter(i => i.uuid === uuid);
            if (1 <= matchedPages.length) {
                const targetClientId = matchedPages[0].clientId;
                // Update the heading on the page block.
                updateBlockAttributes(targetClientId, { heading: t });
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
        onBlockSelection();
    }, [isSelected]);

    const blockProps = useBlockProps({
        className: classnames(className, 'item', {
            active: uuid === context['prc-block/topic-index-condensed-active'],
        }),
    });

    return (
        <Fragment>
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
