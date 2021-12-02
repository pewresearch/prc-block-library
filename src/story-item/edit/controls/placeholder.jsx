/**
 * External Dependencies
 */
import { ContentPlaceholder } from '@prc/blocks/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { setPostByStubID } from '../helpers';

const Placeholder = ({attributes, setAttributes, blockProps}) => {
    const {imageSize} = attributes;

    const [loadingStub, setLoadingStub] = useState(false);

    return (
        <ContentPlaceholder
            onChange={(pickedContent)=>{
                console.log('Step2:', pickedContent);
                if ( pickedContent.length > 0 && undefined !== pickedContent[0].id ) {
                    console.log('Step3:', pickedContent[0]);
                    setLoadingStub(true);
                    setPostByStubID(pickedContent[0].id, imageSize, false, setAttributes);
                }
            }}
            onSkip={()=>{
                setAttributes({postId: 0});
            }}
            blockProps={{...blockProps, style: {marginBottom: '16px'}}}
            loadingComponent={loadingStub}
        />
    );
}

export default Placeholder;