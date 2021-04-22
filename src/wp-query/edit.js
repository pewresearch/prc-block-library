/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED = ['prc-block/story-item'];

const initStoryBlock = (item, disableImage, labelTaxonomy) => {
    const args = {
        title: item.title,
        image: item.image,
        excerpt: item.excerpt,
        link: item.link,
        label: item.label,
        date: item.date,
        extra: '',
        // Post Meta Data:
        postID: item.id,
        // Item Options
        emphasis: false,
        // Image Position:
        isChartArt: false,
        imageSlot: 'left',
        imageSize: 'A3',
        horizontal: true,
        stacked: false,
        // Misc Toggles:
        enableHeader: true,
        enableExcerpt: true,
        enableExtra: false,
        enableProgramsTaxonomy: false,
        headerSize: 2,
        className: 'is-style-left',
    };
    if (true === disableImage) {
        args.imageSlot = 'disabled';
        args.className = 'is-style-disabled';
        args.enableExcerpt = false;
    }
    if ('programs' === labelTaxonomy) {
        args.enableProgramsTaxonomy = true;
    }
    return createBlock('prc-block/story-item', args);
};

const edit = ({ attributes, setAttributes, className, clientId }) => {
    const { postsPerPage, labelTaxonomy, disableImage } = attributes;

    const blockProps = useBlockProps({ className });

    const innerBlocksProps = useInnerBlocksProps({}, {
        allowedBlocks: ALLOWED,
        orientation: 'vertical', // We should allow toggling this based on layout.
        renderAppender: false,
        templateLock: 'all'
    });

    const [posts, setPosts] = useState(false);

    const { replaceInnerBlocks } = useDispatch('core/block-editor');

    const { innerBlocks, hasInnerBlocks } = useSelect(
        select => {
            const blocks = select('core/block-editor').getBlocks(clientId);
            return {
                innerBlocks: blocks,
                hasInnerBlocks: 0 < blocks.length,
            };
        },
        [clientId],
    );

    const replaceInnerBlocksWithPosts = (p = false) => {
        if (false !== p) {
            let tmp = [];

            p.forEach(item => {
                tmp.push(initStoryBlock(item, disableImage, labelTaxonomy));
            });

            const allowedPerPage = postsPerPage;

            tmp = tmp.filter((e, index) => {
                return index <= allowedPerPage - 1;
            });

            const toInsert = tmp;

            replaceInnerBlocks(clientId, toInsert);
        }
    }

    // Go create story item blocks from posts fetched
    useEffect(() => {
        replaceInnerBlocksWithPosts(posts);
    }, [posts]);

    return (
        <div {...blockProps}>
            <Controls
                attributes={attributes}
                setAttributes={setAttributes}
                setPosts={setPosts}
                clientId={clientId}
            />
            {true === hasInnerBlocks && <div {...innerBlocksProps} />}
        </div>
    );
};

export default edit;
