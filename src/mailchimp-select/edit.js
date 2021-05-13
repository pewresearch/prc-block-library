/**
 * External dependencies
 */
import classnames from 'classnames';
import { Checkbox } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    ToggleControl,
    HorizontalRule,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import _ from 'lodash';
import mailChimpInterests from '../_shared/data/mailchimp-interests';

const edit = ({ attributes, setAttributes }) => {
    const { interests, className } = attributes;
    const [selected, setSelected] = useState(interests);

    const blockProps = useBlockProps({
        className: classnames(className, 'ui relaxed list'),
    });

    const updateSelection = s => {
        const tmp = selected;
        if (tmp.includes(s)) {
            const index = tmp.indexOf(s);
            if (-1 !== index) {
                tmp.splice(index, 1);
            }
        } else {
            tmp.push(s);
        }
        setAttributes({ interests: tmp });
        setSelected([...tmp]);
    };

    const CBox = ({ label, value, watchWord }) => {
        return <Checkbox label={__(label.replace(watchWord, ''))} />;
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Mailchimp Interests')}>
                    <PanelRow>
                        <div>
                            {mailChimpInterests.map(i => {
                                return false !== i.value ? (
                                    <ToggleControl
                                        label={i.label}
                                        checked={selected.includes(i.value)}
                                        onChange={() =>
                                            updateSelection(i.value)
                                        }
                                    />
                                ) : (
                                    <HorizontalRule />
                                );
                            })}
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            {0 === selected.length && (
                <div className="item disabled">
                    {__(`Select Mailchimp Segment Interests In Block Settings`)}
                </div>
            )}
            {/** What an absolutely insane bit of code, its concise and works though. */}
            {mailChimpInterests.map((i, index, data) => {
                // Get all the sub items that are selected
                console.log('SELECTED:', selected);
                const subItems = data.filter(e => {
                    return e.label.includes('Religion - ');
                });
                // Get all the sub items values
                const subItemsValues = subItems.map(c => c.value);
                // If there are subitems and this item is the first subitems value then mark true
                const isFirstSubItem =
                    0 !== subItemsValues.length &&
                    subItemsValues[0] === i.value;
                //
                const isSubItem = subItemsValues.includes(i.value);
                // Determine if this should be enabled by looking at the selected, removing sub items, and then adding if selected the first subitem back onto the list.
                const enabled = selected
                    .filter(e => {
                        return !subItemsValues.includes(e);
                    })
                    .concat(
                        isFirstSubItem && selected.includes(i.value)
                            ? [subItemsValues[0]]
                            : [],
                    )
                    .includes(i.value);

                const label = !isSubItem ? i.label : 'Religion & Public Life';

                // Return interests that are not our sub items:
                return enabled ? (
                    <div className="item">
                        {!isSubItem && <Checkbox label={__(label)} />}
                        {isSubItem && isFirstSubItem && (
                            <Fragment>
                                <CBox
                                    label={i.label}
                                    value={i.value}
                                    watchWord="Mini-course - "
                                />
                                <div className="ui relaxed list">
                                    {subItems.map(d => {
                                        return (
                                            <div className="item">
                                                <CBox
                                                    label={d.label}
                                                    value={d.value}
                                                    watchWord="Religion - "
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        )}
                    </div>
                ) : null;
            })}

            <div className="item blue-link">SELECT ALL</div>
        </div>
    );
};

export default edit;
