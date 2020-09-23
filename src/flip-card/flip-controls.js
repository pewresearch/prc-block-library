import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { flipHorizontal as icon } from '@wordpress/icons';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const determine = clientId => {
    const block = wp.data.select('core/block-editor').getBlock(clientId);
    const { innerBlocks } = block;
    innerBlocks.forEach(b => {
        const blockElm = document.querySelector(
            `div[data-block="${b.clientId}"]`,
        );
        const { style } = blockElm;
        if ('none' === style.display) {
            blockElm.style.display = 'block';
        } else {
            blockElm.style.display = 'none';
        }
    });
};

const FlipLabel = ({ label = 'Front of Card', clientId }) => {
    return (
        <div
            className="sans-serif"
            style={{
                fontSize: '12px',
                cursor: 'pointer',
                display: 'inline-block',
            }}
            onClick={() => {
                const rootClientId = wp.data
                    .select('core/block-editor')
                    .getBlockRootClientId(clientId);
                determine(rootClientId);
            }}
            alt="Click to flip"
        >
            {__(label)}
        </div>
    );
};

const FlipControls = ({ label, clientId }) => {
    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={icon}
                        label={__('Flip Card Over')}
                        f
                        onClick={() => {
                            const rootClientId = wp.data
                                .select('core/block-editor')
                                .getBlockRootClientId(clientId);
                            determine(rootClientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
            <FlipLabel label={label} clientId={clientId} />
        </Fragment>
    );
};

export { FlipControls, FlipLabel };
