/**
 * External dependencies
 */
import { Form } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const CBox = ({ label, value, watchWord, userSelected = [], onChange }) => {
    return (
        <Form.Checkbox
            label={__(label.replace(watchWord, ''))}
            checked={userSelected.includes(value)}
            onChange={() => onChange(value)}
        />
    );
};

const List = ({ interests, selected, userSelected, onChange }) => {
    return (
        <Fragment>
            {interests.map((i, index, data) => {
                // Get all the sub items that are selected
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

                return enabled ? (
                    <Fragment>
                        {!isSubItem && (
                            <CBox
                                label={__(label)}
                                value={i.value}
                                onChange={onChange}
                                userSelected={userSelected}
                            />
                        )}
                        {isSubItem && isFirstSubItem && (
                            <Fragment>
                                <CBox
                                    label={i.label}
                                    value={i.value}
                                    watchWord="Mini-course - "
                                />
                                <div
                                    style={{
                                        paddingLeft: '1.7rem',
                                        paddingBottom: '1.5rem',
                                    }}
                                >
                                    {subItems.map(d => {
                                        return (
                                            <CBox
                                                label={d.label}
                                                value={d.value}
                                                watchWord="Religion - "
                                                onChange={onChange}
                                                userSelected={userSelected}
                                            />
                                        );
                                    })}
                                </div>
                            </Fragment>
                        )}
                    </Fragment>
                ) : null;
            })}
        </Fragment>
    );
};

const FormList = ({ interests, selected, allowSubmissions = false }) => {
    const [userSelection, setSelected] = useState([]);
    const [userMessage, setMessage] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [userEmail, setEmail] = useState('');

    const onSubmit = () => {
        console.log('allowSubmission?', allowSubmissions, userSelection);
        if (!allowSubmissions) {
            return;
        }
        toggleLoading(true);
        apiFetch({
            path: `/prc-api/v2/mailchimp/subscribe/?email=${userEmail}&interests=${userSelection}`,
            method: 'POST',
        })
            .then(() => {
                setMessage(
                    'You have succesfully subsrcibed to these newsletter(s)',
                );
            })
            .catch(err => {
                console.error(err);
                setMessage(
                    'Unfortunately we could not susbscribe you at this time. Please try again later.',
                );
            })
            .finally(() => {
                toggleLoading(false);
            });
    };

    const updateSelection = s => {
        const tmp = userSelection;
        if (tmp.includes(s)) {
            const index = tmp.indexOf(s);
            if (-1 !== index) {
                tmp.splice(index, 1);
            }
        } else {
            tmp.push(s);
        }
        setSelected([...tmp]);
    };

    return (
        <Form onSubmit={onSubmit} loading={loading}>
            {0 === selected.length && (
                <Form.Checkbox
                    disabled
                    label={__(
                        `Select Mailchimp Segment Interests In Block Settings`,
                    )}
                />
            )}
            <List
                interests={interests}
                selected={selected}
                userSelected={userSelection}
                onChange={updateSelection}
            />
            <Form.Checkbox
                className="blue-link"
                label={__(`SELECT ALL`)}
                onChange={() => {
                    setSelected([...selected]);
                }}
            />
            <Form.Group>
                <Form.Input
                    placeholder={__(`Enter your email`)}
                    value={userEmail}
                    onChange={(e, { value }) => setEmail(value)}
                />
                <Form.Button content="Sign Up" color="mustard" />
            </Form.Group>
        </Form>
    );
};

export default FormList;
