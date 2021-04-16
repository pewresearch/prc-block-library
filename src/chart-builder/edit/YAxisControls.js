import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
    __experimentalNumberControl as NumberControl,
    ColorPalette,
} from '@wordpress/components';

import { formatNum } from '../utils/helpers';

const YAxisControls = ({ attributes, setAttributes }) => {
    const {
        yAxisActive,
        yLabel,
        yMinDomain,
        yMaxDomain,
        yTickNum,
        yTickExact,
        showYMinDomainLabel,
    } = attributes;
    return (
        <PanelBody title={__('Y-Axis Configuration')}>
            <ToggleControl
                label="Y-axis active"
                help={yAxisActive ? 'Has y-axis.' : 'No y-axis.'}
                checked={yAxisActive}
                onChange={() => setAttributes({ yAxisActive: !yAxisActive })}
            />
            <TextControl
                label={__('Label')}
                value={yLabel}
                onChange={(val) => setAttributes({ yLabel: val })}
            />
            <PanelRow>Y Domain</PanelRow>
            <Flex>
                <FlexItem>
                    <NumberControl
                        label={__('Minimum')}
                        value={yMinDomain}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(val) =>
                            setAttributes({
                                yMinDomain: formatNum(val, 'integer'),
                            })
                        }
                    />
                </FlexItem>
                <FlexItem>
                    <NumberControl
                        label={__('Maximum')}
                        value={yMaxDomain}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(val) =>
                            setAttributes({
                                yMaxDomain: formatNum(val, 'integer'),
                            })
                        }
                    />
                </FlexItem>
            </Flex>
            <PanelRow>Axis Ticks</PanelRow>
            <NumberControl
                label={__('Number of ticks')}
                value={yTickNum}
                disableUnits={true}
                disabledUnits={true}
                min={1}
                onChange={(val) =>
                    setAttributes({ yTickNum: formatNum(val, 'integer') })
                }
                help={__(
                    'Note: This is return approximately the number of ticks requested, deferring to number that will evenly space ticks on the bar.',
                )}
            />
            <ToggleControl
                label="Show min domain label"
                help={__(
                    "Forces the minimum domain value's lable to appear on axis. May overlap with x axis.",
                )}
                checked={showYMinDomainLabel}
                onChange={() =>
                    setAttributes({ showYMinDomainLabel: !showYMinDomainLabel })
                }
            />
            <TextControl
                label={__('Specfic Ticks')}
                value={yTickExact}
                onChange={(val) => setAttributes({ yTickExact: val })}
                help={__(
                    'List of numbers seperated by commas (eg. 0, 50, 100). Setting this value will override the "Number of ticks" parameter',
                )}
            />
        </PanelBody>
    );
};

export default YAxisControls;
