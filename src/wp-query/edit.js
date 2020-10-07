import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import Controls from './controls';

const ALLOWED = ['prc-block/story-item'];

const initStoryBlock = item => {
    const block = createBlock('prc-block/story-item', {
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
        horizontal: true,
        stacked: false,
        // Misc Toggles:
        enableHeader: true,
        enableExcerpt: true,
        enableExtra: false,
        enableProgramsTaxonomy: false,
        headerSize: 'normal',
    });

    return block;
};

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const { pinned, perPage } = attributes;
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
        // Do fetch stuff and setting of posts
        console.log('Posts?', posts);
        if (false !== posts) {
            let tmp = [];
            // TODO: Here we can change what block gets inserted. We could for example say if the postType is not equal to stub then insert a list or whatever. Maybe we create a block just for staff that we can use.
            posts.forEach(item => tmp.push(initStoryBlock(item)));
            console.log('replaceInnerBlocks', tmp, innerBlocks);

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
            console.log(tmp, toKeep, toInsert);

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
