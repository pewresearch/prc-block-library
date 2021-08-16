/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/mailchimp-form', 'prc-block/story-item'];
const TEMPLATE = [['prc-block/story-item', {
    postId: 0,
    title: "More than 10% of staff in Daily Mail let go after acquisition",
    description: "<p>This story, plus independent Indian journalist shares perspective on Israeli spyware and Pegasus list, NBC News adding over 200 new jobs as part of major streaming push and more, all in today’s media headlines.</p>",
    imageSlot: 'disabled',
}], ['prc-block/mailchimp-form', {className: 'is-style-horizontal', interest: '1d2638430b'}]];

const edit = ({ attributes, className, setAttributes }) => {

    const [loaded, toggleLoaded] = useState( false );

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    // Get the latest post from daily briefing and give me story item attributes.

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: 'all',
        template: TEMPLATE,
    });

    useEffect(()=> {
        // Do something when the component mounts
        // Go get the latest post from daily briefing
        // Set the story item attributes
        // Set the loaded state to true

        toggleLoaded(true);
    }, []);

    if ( ! loaded ) {
        return <Fragment/>;
    }

    return <div {...innerBlocksProps} />;
};

export default edit;
