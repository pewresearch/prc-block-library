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
    const currentlyActive = context['prc-block/tabs-active'];

    const {
        insertBlock,
        updateBlockAttributes,
        moveBlockToPosition,
    } = useDispatch('core/block-editor');

    const movePane = (
        targetClientId,
        targetIndex,
        currentPaneIndex,
        toClientId,
    ) => {
        if (targetIndex === currentPaneIndex || -1 === currentPaneIndex) {
            return;
        }

        console.log(
            'movePane',
            targetClientId,
            targetIndex,
            currentPaneIndex,
            toClientId,
        );

        moveBlockToPosition(
            targetClientId,
            toClientId,
            toClientId,
            targetIndex,
        );
    };

    const {
        controllerClientId,
        panesClientId,
        currentPositionIndex,
    } = useSelect(
        select => {
            if (undefined === clientId) {
                return;
            }
            const {
                getBlock,
                getBlockRootClientId,
                getAdjacentBlockClientId,
                getBlockIndex,
            } = select('core/block-editor');

            const menuBlockClientId = getBlockRootClientId(clientId);
            const controllerBlockClientId = getBlockRootClientId(
                menuBlockClientId,
            );
            const panesBlockClientId = getAdjacentBlockClientId(
                menuBlockClientId,
            );
            const panesBlock = getBlock(panesBlockClientId);

            let paneClientId = false;
            if (
                panesBlock.hasOwnProperty('innerBlocks') &&
                1 <= panesBlock.innerBlocks.length &&
                null !== uuid
            ) {
                console.log('panesBlock as seen from MenuItem', panesBlock);
                const matchedPane = panesBlock.innerBlocks.filter(
                    e => e.attributes.uuid === uuid,
                );
                paneClientId = matchedPane[0].clientId;
            }

            const currentIndex = getBlockIndex(clientId, menuBlockClientId);
            const paneIndex = getBlockIndex(paneClientId, panesBlockClientId);

            movePane(paneClientId, currentIndex, paneIndex, panesBlockClientId);

            // eslint-disable-next-line consistent-return
            return {
                controllerClientId: controllerBlockClientId,
                panesClientId: panesBlockClientId,
                currentPositionIndex: currentIndex,
                panePositionIndex: paneIndex,
            };
        },
        [clientId],
    );

    const onBlockInit = () => {
        // If no uuid is set run init sequence, create a matching tab pane block.
        if (null === uuid) {
            // We will use the first client id assigned as a uuid.
            console.log('onBlockInit', uuid, currentPositionIndex);
            const newUuid = clientId;
            setAttributes({ uuid: newUuid });
            const newPaneBlock = createBlock('prc-block/tabs-pane', {
                uuid: newUuid,
            });
            insertBlock(newPaneBlock, currentPositionIndex, panesClientId);
        }
    };

    const onBlockSelection = () => {
        if (null !== uuid && undefined !== controllerClientId) {
            updateBlockAttributes(controllerClientId, { active: uuid });
        }
    };

    useEffect(() => {
        onBlockInit();
    }, [panesClientId, currentPositionIndex]);

    useEffect(() => {
        onBlockSelection();
    }, [isSelected]);

    const blockProps = useBlockProps({
        className: classnames(className, 'item', {
            active: uuid === currentlyActive,
        }),
    });

    return (
        <Fragment>
            <div {...blockProps}>
                {isSelected && (
                    <RichText
                        tagName="div" // The tag here is the element output and editable in the admin
                        value={title} // Any existing content, either from the database or an attribute default
                        allowedFormats={[]} // Allow the content to be made bold or italic, but do not allow other formatting options
                        onChange={newTitle =>
                            setAttributes({
                                title: newTitle,
                                slug: cleanForSlug(newTitle),
                            })
                        } // Store updated content as a block attribute
                        placeholder={__('Tab Pane 1')} // Display this text before any content has been added by the user
                        style={{
                            textTransform: 'none',
                        }}
                    />
                )}
                {!isSelected && <div>{title}</div>}
            </div>
        </Fragment>
    );
};

export default Edit;
