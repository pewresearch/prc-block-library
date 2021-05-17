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

const XAxisControls = ({ attributes, setAttributes }) => {
    const {
        chartType,
        xAxisActive,
        xScale,
        xScaleFormat,
        xMinDomain,
        xMaxDomain,
        xDomainPadding,
        xTickNum,
        xTickExact,
        xLabel,
        xAxisStroke,
        xGridStroke,
    } = attributes;
    return (
        <PanelBody title={__('Independent Axis Configuration')}>
            <PanelRow>
                The independent axis is almost always the x-axis, except in
                cases of horizontal bar charts or stack bar charts, where the
                independent values are plotted on the y-axis.
            </PanelRow>
            <ToggleControl
                label="X-axis active"
                help={xAxisActive ? 'Has x-axis.' : 'No x-axis.'}
                checked={xAxisActive}
                onChange={() => setAttributes({ xAxisActive: !xAxisActive })}
            />
            <TextControl
                label={__('Label')}
                value={xLabel}
                onChange={(val) => setAttributes({ xLabel: val })}
            />
            <SelectControl
                label={__('X-axis scale')}
                value={xScale}
                options={[
                    {
                        value: 'linear',
                        label: 'Linear',
                    },
                    {
                        value: 'time',
                        label: 'Time',
                    },
                ]}
                onChange={(type) => {
                    setAttributes({
                        xScale: type,
                    });
                }}
            />
            {xScale === 'time' && (
                <SelectControl
                    label={__('X-axis scale format')}
                    value={xScaleFormat}
                    options={[
                        {
                            value: 'yyyy',
                            label: 'yyyy',
                        },
                        {
                            value: 'mm/yyyy',
                            label: 'mm/yyyy',
                        },
                        {
                            value: 'mm/dd/yyyy',
                            label: 'mm/dd/yyyy',
                        },
                    ]}
                    onChange={(type) => {
                        setAttributes({ xScaleFormat: type });
                    }}
                />
            )}
            <PanelRow>Domain</PanelRow>
            <Flex>
                <FlexItem>
                    <NumberControl
                        label={__('Minimum')}
                        value={xMinDomain}
                        disabled={
                            chartType === 'stacked-bar' ||
                            chartType === 'bar' ||
                            chartType === 'pie'
                        }
                        disableUnits
                        disabledUnits
                        onChange={(val) => {
                            setAttributes({
                                xMinDomain: formatNum(val, 'integer'),
                            });
                        }}
                    />
                </FlexItem>
                <FlexItem>
                    <NumberControl
                        label={__('Maximum')}
                        value={xMaxDomain}
                        disabled={
                            chartType === 'stacked-bar' ||
                            chartType === 'bar' ||
                            chartType === 'pie'
                        }
                        disableUnits
                        disabledUnits
                        onChange={(val) => {
                            setAttributes({
                                xMaxDomain: formatNum(val, 'integer'),
                            });
                        }}
                    />
                </FlexItem>
            </Flex>
            <NumberControl
                label={__('Domain Padding')}
                help={__(
                    'Determines the space between the first tick and the end of the axis',
                )}
                value={xDomainPadding}
                disableUnits={true}
                disabledUnits={true}
                onChange={(val) =>
                    setAttributes({ xDomainPadding: formatNum(val, 'integer') })
                }
            />
            <PanelRow>Axis Ticks</PanelRow>
            <NumberControl
                label={__('Number of ticks')}
                value={xTickNum}
                disableUnits={true}
                disabledUnits={true}
                onChange={(val) =>
                    setAttributes({ xTickNum: formatNum(val, 'integer') })
                }
                help={__(
                    'Note: This is return approximately the number of ticks requested, deferring to number that will evenly space ticks on the bar.',
                )}
            />
            <TextControl
                label={__('Specfic Ticks')}
                value={xTickExact}
                onChange={(val) => setAttributes({ xTickExact: val })}
                help={__(
                    'List of numbers seperated by commas (eg. 0, 50, 100). Setting this value will override the "Number of Ticks" parameter',
                )}
            />
            <PanelRow>
                <strong>Axis Styles</strong>
            </PanelRow>
            <PanelRow>{__('Axis Stroke')}</PanelRow>
            <ColorPicker
                color={xAxisStroke}
                onChangeComplete={(color) =>
                    setAttributes({
                        xAxisStroke: color.hex,
                    })
                }
            />
            <PanelRow> {__('Grid Stroke')}</PanelRow>
            <ColorPicker
                color={xGridStroke}
                onChangeComplete={(color) =>
                    setAttributes({
                        xGridStroke: color.hex,
                    })
                }
            />
        </PanelBody>
    );
};

export default XAxisControls;
