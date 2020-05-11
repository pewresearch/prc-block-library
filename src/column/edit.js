import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import numWords from 'num-words';

const edit = ({attributes, clientId, setAttributes}) => {
    const {width} = attributes;
    
    useEffect(() => {
        // This sets the width on the actual block div.
        const w = numWords(width);
        document.querySelector('div[data-block="'+clientId+'"]').setAttribute('data-width', w);
    });

    return(
        <div className='prc blocks column'>
            <InnerBlocks templateLock={false}/>
        </div>
    );
}

export default edit;