/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { WPObjectSearchField } from '@pewresearch/app-components';
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import {
    Flex,
    FlexBlock,
    FlexItem,
} from '@wordpress/components';

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {

    const { title, link, postId, blockIndexAttr, enableNumber } = attributes;
    const blockProps = useBlockProps();

    const { blockIndex, numberEnabled } = useSelect(
        select => {
            const parentBlockId = select('core/block-editor').getBlockRootClientId(
                clientId,
            );

            if (null == parentBlockId || typeof parentBlockId === 'string' && 0 === parentBlockId.length) {
                return {
                    blockIndex: null,
                    numberEnabled: false
                };
            }

            let blockIndexID;

            const parentBlock = select('core/block-editor').getBlock(parentBlockId);


            if (parentBlock.name === 'core/group') {
                //get the block index for this block
                blockIndexID = select('core/block-editor').getBlockIndex(clientId, parentBlockId)
            }

            // Set your attribute with the index number here.
            return {
                blockIndex: blockIndexID,
                numberEnabled: true
            };
        },
        [clientId],
    );

    useEffect(() => {
        setAttributes({ blockIndexAttr: blockIndex })

        if (numberEnabled == true) {
            setAttributes({ enableNumber: true })
        } else {
            setAttributes({ enableNumber: false })
        }

    }, [blockIndex])

    if (true !== isSelected && blockIndex >= 0) {
        return (

            <div {...blockProps}>
                <div class="main">
                    {numberEnabled && (
                        <span className="big-number">
                            {blockIndex + 1}
                        </span >
                    )}
                    <h2 className="my-class">
                        <a href={link}> {title}</a>
                    </h2>
                </div>
            </div>
        )
    }


    if (true !== isSelected) {
        return <div {...blockProps} style={{ padding: '5px' }}>{title}</div>
    }


    return (
        <div {...blockProps} >
            <WPObjectSearchField
                type='post'
                subType='stub'
                onChange={obj => {
                    if (obj.hasOwnProperty('id')) {
                        setAttributes({ title: obj.title, link: obj.url, postId: obj.id })
                    }
                }}
            />

            {postId && (
                <article className="item story stacked" style={{ border: "2px solid gray" }}>
                    <div className="content">
                        <div className="header small light">
                            <a href={link}>
                                <RichText
                                    tagName="p"
                                    value={title}
                                    onChange={t => setAttributes({ title: t })}
                                    placeholder="How we did this"
                                    keepPlaceholderOnFocus
                                    style={{
                                        fontFamily: 'Abril',
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        color: '#2a2a2a',
                                        lineHeight: '128%',
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </article>
            )}

        </div >
    );
};

export default edit;
