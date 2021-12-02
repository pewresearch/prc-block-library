/**
 * External Dependencies
 */
import { ContentPlaceholder } from '../../../_components/content-placeholder';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { setPostByStubID } from '../helpers';

const Placeholder = ({attributes, setAttributes, blockProps}) => {
    const {imageSize} = attributes;

    return (
        <ContentPlaceholder
            onChange={(pickedContent)=>{
                console.log('Step2:', pickedContent);
                if ( pickedContent.length > 0 && undefined !== pickedContent[0].id ) {
                    console.log('Step3:', pickedContent[0]);
                    setPostByStubID(pickedContent[0].id, imageSize, false, setAttributes);
                }
            }}
            onSkip={()=>{
                setAttributes({postId: 0});
            }}
            placeholder={__('Search for a post or paste a url', 'wp-story-blocks')}
            blockProps={blockProps}
        />
    );
}

export default Placeholder;