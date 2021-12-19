/**
 * External Dependencies
 */
import { ContentPlaceholder } from '@prc/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, Fragment, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { setPostAttributes } from '../../story-item/helpers.js';
import GoogleAnalyticsMostPopular from './google-analytics.jsx';

const Placeholder = ({setAttributes, blockProps}) => {
    const [loadingStub, setLoadingStub] = useState(false);

    const onPick = (id, title) => {
        setPostAttributes({
            postId: id,
            title: title,
            setAttributes
        });
    }

    return (
        <ContentPlaceholder
            onChange={(pickedContent)=>{
                if ( pickedContent.length > 0 && undefined !== pickedContent[0].id ) {
                    setLoadingStub(true);
                    onPick(pickedContent[0].id, pickedContent[0].title);
                }
            }}
            onSkip={()=>{
                setAttributes({postId: 0});
            }}
            label={__('Search for a popular post', 'prc-block-library')}
            blockProps={{...blockProps, style: {marginBottom: '16px'}}}
            loadingComponent={loadingStub}
        >
            {/* @TODO we'll revisit this in 2022 when we update to GA4 <GoogleAnalyticsMostPopular onPick={onPick}/> */}
        </ContentPlaceholder>
    );
}

export default Placeholder;