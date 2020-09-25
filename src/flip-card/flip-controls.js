import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { flipHorizontal as icon } from '@wordpress/icons';
import {
    Button,
    PanelBody,
    PanelRow,
    ToolbarButton,
    ToolbarGroup,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const determine = clientId => {
    const block = select('core/block-editor').getBlock(clientId);
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

const FlipButton = ({ label = 'Front of Card', clientId }) => {
    return (
        <InspectorControls>
            <PanelBody title={__(label)}>
                <PanelRow>
                    <Button
                        isSecondary
                        onClick={() => {
                            const rootClientId = select(
                                'core/block-editor',
                            ).getBlockRootClientId(clientId);
                            determine(rootClientId);
                        }}
                    >
                        Flip Card Over
                    </Button>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
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
                            const rootClientId = select(
                                'core/block-editor',
                            ).getBlockRootClientId(clientId);
                            determine(rootClientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
            <FlipButton label={label} clientId={clientId} />
        </Fragment>
    );
};

export { FlipControls, FlipButton };
