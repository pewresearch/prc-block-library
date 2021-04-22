/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useState, useEffect } from '@wordpress/element';
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

const ALLOWED = ['prc-block/story-item', 'prc-block/column'];

const initStoryBlock = ({item, labelTaxonomy, className ='is-style-left', imageSlot = 'left', }) => {
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
        imageSlot,
        imageSize: 'A3',
        horizontal: true,
        stacked: false,
        // Misc Toggles:
        enableHeader: true,
        enableExcerpt: true,
        enableExtra: false,
        enableProgramsTaxonomy: false,
        headerSize: 2,
        className,
    };
    if ('programs' === labelTaxonomy) {
        args.enableProgramsTaxonomy = true;
    }
    return createBlock('prc-block/story-item', args);
};

const edit = ({ attributes, setAttributes, clientId }) => {
    const { postsPerPage, labelTaxonomy, disableImage, className } = attributes;

    const classNames = classnames({
        'ui equal width divided grid': 'is-style-columns' === className,
    });

    const blockProps = useBlockProps({className});

    const innerBlocksProps = useInnerBlocksProps({ className: classNames }, {
        allowedBlocks: ALLOWED,
        orientation: 'vertical', // We should allow toggling this based on layout.
        renderAppender: false,
        templateLock: 'all'
    });

    const [posts, setPosts] = useState(false);

    const { replaceInnerBlocks } = useDispatch('core/block-editor');

    const { hasInnerBlocks } = useSelect(
        select => {
            const blocks = select('core/block-editor').getBlocks(clientId);
            return {
                hasInnerBlocks: 0 < blocks.length,
            };
        },
        [clientId],
    );

    const replaceInnerBlocksWithPosts = (p = false) => {
        if (false !== p) {
            let tmp = [];

            p.forEach(item => {
                // If 'is-style-columns' === className then we need to init a prc-block/column width
                if ( 'is-style-columns' === className ) {
                    const innerBlocks = [];
                    innerBlocks.push(initStoryBlock({item, disableImage, labelTaxonomy, className: 'is-style-top', imageSlot: 'top'}))
                    const column = createBlock('prc-block/column', { width: Math.round((16/postsPerPage)) }, innerBlocks);
                    tmp.push(column);
                } else {
                    tmp.push(initStoryBlock({item, disableImage, labelTaxonomy}));
                }
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
