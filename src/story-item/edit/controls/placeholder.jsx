/**
 * External Dependencies
 */
import { ContentPlaceholder } from '../../../_components/content-placeholder';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { setPostByStubID } from '../helpers';

const Placeholder = ({attributes, setAttributes, blockProps}) => {
    const {imageSize} = attributes;

    const [selectedItems, setSelection] = useState([]);

    return (
        <ContentPlaceholder
            onChange={(pickedContent)=>{
                console.log('pickedContent?', pickedContent);
                setSelection([...pickedContent]);
            }}
            onSkip={()=>{
                setAttributes({postId: 0});
            }}
            placeholder={__('Joe Biden...', 'wp-story-blocks')}
            blockProps={blockProps}
            value={selectedItems}
        />
    );
}

export default Placeholder;