import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
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
        headerSize: 'normal',
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

const initStaffBlock = item => {
    // We only need to set the link, the block itself will go and fetch all the information we need.
    const args = {
        link: item.link,
    };
    return createBlock('prc-block/staff', args);
};

const edit = ({ attributes, setAttributes, className, clientId }) => {
    const {
        pinned,
        postType,
        perPage,
        labelTaxonomy,
        disableImage,
    } = attributes;

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

    // Go create story item blocks from posts fetched
    useEffect(() => {
        if (false !== posts) {
            let tmp = [];
            posts.forEach(item => {
                if ('stub' === postType) {
                    tmp.push(initStoryBlock(item, disableImage, labelTaxonomy));
                }
                if ('staff' === postType) {
                    tmp.push(initStaffBlock(item));
                }
            });

            const toKeep = [];
            JSON.parse(pinned).forEach(postId => {
                const toPush = innerBlocks.filter(e => {
                    const toCheck = tmp.filter(
                        f => f.attributes.postID === postId,
                    );
                    return (
                        e.attributes.postID === postId && 0 >= toCheck.length
                    );
                });
                toPush.forEach(b => toKeep.push(b));
            });

            const allowedPerPage = perPage - toKeep.length;

            tmp = tmp.filter((e, index) => {
                return index <= allowedPerPage - 1;
            });

            const toInsert = toKeep.concat(tmp);

            replaceInnerBlocks(clientId, toInsert);
        }
    }, [posts]);

    return (
        <div className={className}>
            <Controls
                attributes={attributes}
                setAttributes={setAttributes}
                setPosts={setPosts}
                clientId={clientId}
            />
            {true === hasInnerBlocks && <InnerBlocks allowedBlocks={ALLOWED} />}
        </div>
    );
};

export default edit;
