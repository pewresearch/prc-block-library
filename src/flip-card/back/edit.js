import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { FlipControls } from '../flip-controls';

const edit = ({ className, clientId }) => {
    // On load hide the back
    useEffect(() => {
        const blockElm = document.querySelector(
            `div[data-block="${clientId}"]`,
        );
        blockElm.style.display = 'none';
    }, []);
    return (
        <div className={className}>
            <FlipControls label="Back of Card" clientId={clientId} />
            <InnerBlocks templateLock={false} />
        </div>
    );
};

export default edit;
