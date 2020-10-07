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
    // const [loaded, toggleLoaded] = useState(false);
    const [posts, setPosts] = useState(false);
    const { replaceInnerBlocks } = useDispatch('core/block-editor');
    const { hasInnerBlocks } = useSelect(
        select => {
            return {
                hasInnerBlocks:
                    0 < select('core/block-editor').getBlocks(clientId).length,
            };
        },
        [clientId],
    );

    // Go create story item blocks from posts fetched
    useEffect(() => {
        // Do fetch stuff and setting of posts
        console.log('Posts?', posts);
        if (false !== posts) {
            const tmp = [];
            // TODO: Here we can change what block gets inserted. We could for example say if the postType is not equal to stub then insert a list or whatever. Maybe we create a block just for staff that we can use.
            posts.forEach(item => tmp.push(initStoryBlock(item)));
            // We should also... get "stickyPosts" from attributes, thats an array that will contain post ids. We can go through existing innerblocks and if there is a post with an id that matches grab it into another array and well combine the posts and that together putting the stickyPosts on top and decreasing the posts returned by that amount so it doesnt exceed PerPage. THEN we can do replaceInnerBlocks.
            replaceInnerBlocks(clientId, tmp);
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
