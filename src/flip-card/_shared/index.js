/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { flipHorizontal as icon } from '@wordpress/icons';
import {
    Button,
    ColorPalette,
    PanelBody,
    PanelRow,
    TextControl,
    ToolbarButton,
    ToolbarGroup,
} from '@wordpress/components';
import { useDispatch, useSelect, select } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const bgDefaults = [
    { name: 'Oatmeal', color: '#E2E2E2' },
    { name: 'White', color: '#FFF' },
];
const borderDefaults = [
    { name: 'Oatmeal', color: '#E2E2E2' },
    { name: 'Oatmeal (dark)', color: '#D5D5CD' },
    { name: 'Gray', color: '#D8D8D8' },
    { name: 'Black', color: '#000' },
];

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

const Controls = ({ clientId }) => {
    const {
        width,
        height,
        borderColor,
        bgColor,
        controllerClientId,
    } = useSelect(
        select => {
            const {
                getBlockName,
                getBlockRootClientId,
                getBlockAttributes,
            } = select('core/block-editor');

            let controllerClientId = clientId;
            if ( 'prc-block/flip-card' !== getBlockName(clientId) ) {
                controllerClientId = getBlockRootClientId(clientId);
            }
            
            const controllerAttributes = getBlockAttributes(controllerClientId);
            
            return {...controllerAttributes, controllerClientId};
        },
        [clientId],
    );

    const { updateBlockAttributes } = useDispatch('core/block-editor');

    return(
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={icon}
                        label={__('Flip Card Over')}
                        f
                        onClick={() => {
                            determine(controllerClientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Flip Card Options')}>
                    <PanelRow>
                        <Button
                            isSecondary
                            onClick={() => {
                                determine(controllerClientId);
                            }}
                        >
                            Flip Card Over
                        </Button>
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Width"
                            value={width}
                            onChange={w => updateBlockAttributes(controllerClientId, { width: w })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Height"
                            value={height}
                            onChange={h => updateBlockAttributes(controllerClientId, { height: h })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <div>
                            <label
                                style={{
                                    marginBottom: '0.5em',
                                    display: 'inline-block',
                                }}
                            >
                                Border Color
                            </label>
                            <ColorPalette
                                colors={borderDefaults}
                                value={borderColor}
                                onChange={c => updateBlockAttributes(controllerClientId, { borderColor: c })}
                                disableCustomColors
                            />
                        </div>
                    </PanelRow>
                    <PanelRow>
                        <div>
                            <label
                                style={{
                                    marginBottom: '0.5em',
                                    display: 'inline-block',
                                }}
                            >
                                Background Color
                            </label>
                            <ColorPalette
                                colors={bgDefaults}
                                value={bgColor}
                                onChange={c => updateBlockAttributes(controllerClientId, { bgColor: c })}
                                disableCustomColors
                            />
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
}

export default Controls;
