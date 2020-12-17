import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
 
const save = ({attributes}) => {
    const blockProps = useBlockProps.save({
        className: 'ui text menu fluid'
    });
    return(
        <div { ...blockProps }>
            <InnerBlocks.Content/>
        </div>
    );
}

export default save;