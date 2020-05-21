import { InnerBlocks } from '@wordpress/block-editor';

const save = ({attributes}) => {
    const { title } = attributes;
    return( 
        <div className="js-react-collapsible" data-title={title}>
            <InnerBlocks.Content/>
        </div>
    );
}

export default save;