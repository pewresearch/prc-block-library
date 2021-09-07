/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/story-item'];

const edit = ({ attributes, className, setAttributes }) => {

    const [loaded, toggleLoaded] = useState( false );

    const [template, setTemplate] = useState([]);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    // Get the latest post from daily briefing and give me story item attributes.

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: 'all',
        template: template,
    });

    // Init the template. 
    useEffect(()=> {
        // Do something when the component mounts
        // Go get the latest post from daily briefing
        // Set the story item attributes
        // Set the loaded state to true
        apiFetch({
            path: `/prc-api/v2/blocks/daily-briefing-signup`,
            method: 'GET',
        }).then( p => {
            console.log(p);
            setTemplate(
                [
                    ['prc-block/story-item', {
                        postId: p.ID,
                        title: p.post_title,
                        description: `<p>${p.post_content}</p>`,
                        imageSlot: 'disabled',
                    }],
                    ['prc-block/promo', {
                        heading: 'Get the Daily Briefing by email',
                        headingLevel: 3,
                        hasForm: true,
                    },[
                        ['prc-block/mailchimp-form', {className: 'is-style-horizontal', interest: '1d2638430b'}]
                    ]]
                ]
            );
        });
    }, []);

    // Set loaded to true when the template has data.
    useEffect(
        () => {
            // if template is not empty, set the loaded state to true
            if (template.length > 0) {
                toggleLoaded(true);
            }
        }, [template]
    );

    if ( ! loaded ) {
        return <Fragment/>;
    }

    return <div {...innerBlocksProps} />;
};

export default edit;
