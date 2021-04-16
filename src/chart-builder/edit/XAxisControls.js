import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    PanelBody,
    PanelRow,
    Placeholder,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    Flex,
    FlexItem,
    ColorPalette,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

import { formatNum } from '../utils/helpers';

const XAxisControls = ({ attributes, setAttributes, chartType }) => {
    const {
        xAxisActive,
        xScale,
        xScaleFormat,
        xMinDomain,
        xMaxDomain,
        xTickNum,
        xTickExact,
        xLabel,
    } = attributes;
    return (
        <PanelBody title={__('X-Axis Configuration')}>
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
        </PanelBody>
    );
};

export default XAxisControls;
