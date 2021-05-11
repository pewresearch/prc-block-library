/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    PanelRow,
    TextControl,
    ToggleControl,
    SelectControl,
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
    ColorPicker,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const LegendControls = ({ attributes, setAttributes }) => {
    const {
        legendActive,
        legendOrientation,
        legendTitle,
        legendOffsetX,
        legendOffsetY,
        legendMarkerStyle,
        legendBorderStroke,
        legendFill,
    } = attributes;
    return (
        <PanelBody title={__('Legend')} initialOpen={false}>
            <ToggleControl
                label="Legend Active"
                checked={legendActive}
                onChange={() => setAttributes({ legendActive: !legendActive })}
            />
            <PanelRow>Legend Positioning</PanelRow>
            <PanelRow>
                Determines the position of legend relative to the chart
                container
            </PanelRow>

            <Flex>
                <FlexItem>
                    <NumberControl
                        label={__('DX')}
                        value={legendOffsetX}
                        onChange={(value) =>
                            setAttributes({
                                legendOffsetX: formatNum(value, 'integer'),
                            })
                        }
                    />
                </FlexItem>
                <FlexItem>
                    <NumberControl
                        label={__('DY')}
                        value={legendOffsetY}
                        onChange={(value) =>
                            setAttributes({
                                legendOffsetY: formatNum(value, 'integer'),
                            })
                        }
                    />
                </FlexItem>
            </Flex>
            <TextControl
                label={__('Legend Title')}
                value={legendTitle}
                onChange={(value) => setAttributes({ legendTitle: value })}
            />
            <SelectControl
                label={__('Orientation')}
                value={legendOrientation}
                options={[
                    {
                        value: 'horizontal',
                        label: 'Horizontal',
                    },
                    {
                        value: 'vertical',
                        label: 'Vertical',
                    },
                ]}
                onChange={(type) => {
                    setAttributes({
                        legendOrientation: type,
                    });
                }}
            />
            <SelectControl
                label={__('Marker Style')}
                value={legendMarkerStyle}
                options={[
                    {
                        value: 'square',
                        label: 'Square',
                    },
                    {
                        value: 'circle',
                        label: 'Circle',
                    },
                    {
                        value: 'diamond',
                        label: 'Diamond',
                    },
                    {
                        value: 'plus',
                        label: 'Plus',
                    },
                    {
                        value: 'minus',
                        label: 'Minus',
                    },
                    {
                        value: 'star',
                        label: 'Star',
                    },
                    {
                        value: 'triangleDown',
                        label: 'Triangle Down',
                    },
                    {
                        value: 'triangleUp',
                        label: 'Triangle Up',
                    },
                ]}
                onChange={(type) => {
                    setAttributes({
                        legendMarkerStyle: type,
                    });
                }}
            />
            <PanelRow>{__('Border Stroke')}</PanelRow>
            <ColorPicker
                color={legendBorderStroke}
                onChangeComplete={(color) =>
                    setAttributes({
                        legendBorderStroke: color.hex,
                    })
                }
            />
            <PanelRow> {__('Fill')}</PanelRow>
            <ColorPicker
                color={legendFill}
                onChangeComplete={(color) =>
                    setAttributes({
                        legendFill: color.hex,
                    })
                }
            />
        </PanelBody>
    );
};

export default LegendControls;
