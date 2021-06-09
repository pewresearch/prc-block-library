/**
 * External dependencies
 */
import classnames from 'classnames';
import { StoryItem } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { isInteger } from 'lodash';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const Posts = ({ posts, attributes }) => {
    if (false === posts) {
        return <Fragment />;
    }

    const {
        labelTaxonomy,
        storyItemDisableExcerpt,
        storyItemImageSize,
        storyItemImageSlot,
        className,
    } = attributes;

    const isPubListing = 'is-style-pub-listing' === className;
    const isColumns = 'is-style-columns' === className;

    return (
        <Fragment>
            {posts.map(p => {
                let imageSlot = 'disabled' === storyItemImageSlot;
                if (isColumns && 'left' === imageSlot) {
                    imageSlot = 'top';
                }
                const args = {
                    title: p.title,
                    image: p.image,
                    excerpt: p.excerpt,
                    link: p.link,
                    label: p.label,
                    date: p.date,
                    extra: '',
                    // Post Meta Data:
                    postID: p.id,
                    // Item Options
                    emphasis: false,
                    // Image Position:
                    isChartArt: false,
                    imageSlot,
                    imageSize: storyItemImageSize,
                    horizontal: isPubListing,
                    stacked: isColumns,
                    // Misc Toggles:
                    enableHeader: true,
                    enableMeta: true,
                    enableExcerpt: !storyItemDisableExcerpt,
                    enableExtra: false,
                    inLoop: isPubListing,
                    enableProgramsTaxonomy: 'programs' === labelTaxonomy,
                    headerSize: 2,
                    className:
                        'left' === storyItemImageSlot
                            ? 'is-style-left'
                            : 'is-style-disabled',
                };
                if (isColumns) {
                    return (
                        <div className="column">
                            <StoryItem {...args} />
                        </div>
                    );
                }
                return <StoryItem {...args} />;
            })}
        </Fragment>
    );
};

const edit = ({ attributes, setAttributes, clientId }) => {
    const { className } = attributes;

    const [posts, setPosts] = useState(false);

    const classNames = classnames({
        'ui equal width divided grid': 'is-style-columns' === className,
        'ui link divided items': 'is-style-pub-listing' === className,
    });

    const blockProps = useBlockProps({ className: classNames });

    const { postId } = useSelect(
        select => {
            return {
                postId: select('core/editor').getCurrentPostId(),
            };
        },
        [clientId],
    );

    useEffect(() => {
        if (false !== posts && isInteger(postId)) {
            setAttributes({ postId });
        }
    }, [postId, posts]);

    return (
        <div {...blockProps}>
            <Controls
                attributes={attributes}
                setAttributes={setAttributes}
                posts={posts}
                setPosts={setPosts}
                clientId={clientId}
            />
            <Posts posts={posts} attributes={attributes} />
        </div>
    );
};

export default edit;
