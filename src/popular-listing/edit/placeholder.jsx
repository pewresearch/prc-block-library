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

const GoogleAnalyticsTop10 = () => {
    // We'll construct our own rest api endpoint and query it really quickly.
}

const Placeholder = ({setAttributes, blockProps}) => {
    const [loadingStub, setLoadingStub] = useState(false);

    GoogleAnalyticsTop10();

    return (
        <ContentPlaceholder
            onChange={(pickedContent)=>{
                if ( pickedContent.length > 0 && undefined !== pickedContent[0].id ) {
                    setLoadingStub(true);
                    setPostAttributes({
                        postId: pickedContent[0].id,
                        title: pickedContent[0].title.rendered,
                        setAttributes
                    });
                }
            }}
            onSkip={()=>{
                setAttributes({postId: 0});
            }}
            label={__('Search for a popular post', 'prc-block-library')}
            blockProps={{...blockProps, style: {marginBottom: '16px'}}}
            loadingComponent={loadingStub}
        >
            <p>{__('List of Google Analytics popular items here... clicking on one will setthe attributes', 'prc-block-library')}</p>
        </ContentPlaceholder>
    );
}

export default Placeholder;