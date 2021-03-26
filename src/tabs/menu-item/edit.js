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

    const { insertBlock, updateBlockAttributes } = useDispatch(
        'core/block-editor',
    );

    const { controllerClientId, panesClientId } = useSelect(
        select => {
            const { getBlockRootClientId, getAdjacentBlockClientId } = select(
                'core/block-editor',
            );
            const menuBlockClientId = getBlockRootClientId(clientId);
            const pClientId = getAdjacentBlockClientId(menuBlockClientId);
            return {
                controllerClientId: getBlockRootClientId(menuBlockClientId),
                panesClientId: pClientId,
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
            const newPaneBlock = createBlock('prc-block/tabs-pane', {
                uuid: newUuid,
            });
            insertBlock(newPaneBlock, false, panesClientId);
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
                />
            </div>
        </Fragment>
    );
};

export default Edit;
