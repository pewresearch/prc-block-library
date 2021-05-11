/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    PanelRow,
    TextControl,
    ToggleControl,
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const YAxisControls = ({ attributes, setAttributes }) => {
    const {
        yAxisActive,
        yLabel,
        yMinDomain,
        yMaxDomain,
        yDomainPadding,
        yTickNum,
        yTickExact,
        showYMinDomainLabel,
    } = attributes;
    return (
        <PanelBody title={__('Dependent Axis Configuration')}>
            <PanelRow>
                Dependent variables are properties that change in response to a
                change in another property. As such, the dependent axis is
                usually the y-axis.
            </PanelRow>
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
            <NumberControl
                label={__('Domain Padding')}
                help={__(
                    'Determines the space between the first tick and the end of the axis',
                )}
                value={yDomainPadding}
                disableUnits={true}
                disabledUnits={true}
                onChange={(val) =>
                    setAttributes({ yDomainPadding: formatNum(val, 'integer') })
                }
            />
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
