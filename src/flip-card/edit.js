import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
    ColorPalette,
    PanelBody,
    PanelRow,
    TextControl,
    ResizableBox,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { dispatch } from '@wordpress/data';

import './edit.scss';

const ALLOWED = ['prc-block/flip-card-front', 'prc-block/flip-card-back'];
const TEMPLATE = [
    ['prc-block/flip-card-front', {}],
    ['prc-block/flip-card-back', {}],
];
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

const edit = ({ attributes, className, setAttributes, isSelected }) => {
    const { width, height, borderColor, bgColor } = attributes;
    const { toggleSelection } = dispatch('core/block-editor');
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Flip Card Options')}>
                    <PanelRow>
                        <TextControl
                            label="Width"
                            value={width}
                            onChange={w => setAttributes({ width: w })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Height"
                            value={height}
                            onChange={h => setAttributes({ height: h })}
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
                                onChange={c =>
                                    setAttributes({ borderColor: c })
                                }
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
                                onChange={c => setAttributes({ bgColor: c })}
                                disableCustomColors
                            />
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div className={className}>
                <ResizableBox
                    size={{
                        width,
                        height,
                    }}
                    minHeight="200"
                    minWidth="200"
                    maxWidth="640"
                    enable={{
                        top: false,
                        right: isSelected,
                        bottom: isSelected,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            width: parseInt(width + delta.width, 10),
                            height: parseInt(height + delta.height, 10),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                    style={{
                        borderColor,
                        backgroundColor: bgColor,
                    }}
                >
                    <InnerBlocks
                        allowedBlocks={ALLOWED}
                        template={TEMPLATE}
                        templateLock="all"
                    />
                </ResizableBox>
            </div>
        </Fragment>
    );
};

export default edit;
