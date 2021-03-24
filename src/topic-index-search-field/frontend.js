/**
 * External dependencies
 */
import { Form, Button } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import { Fragment, render, useState, useEffect } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
];

const TopicSearchField = ({ restrictToTermId = 0 }) => {
    const [data, setData] = useState(false);
    const [selected, select] = useState(false);

    useEffect(() => {
        console.log('fetch data');
        const args = {};
        const path = addQueryArgs('/wp/v2/topic', args);
        console.log('...path', path);
        apiFetch({ path })
            .then(topics => {
                console.log(topics);
                setData(topics);
            })
            .catch(e => console.error(e));
    }, []);

    return (
        <Form onSubmit={e => console.log(e)}>
            <Form.Group>
                <Form.Dropdown
                    placeholder="Start typing or click arrow"
                    search
                    selection
                    options={countryOptions}
                    loading={false === data}
                    onSearchChange={e => console.log('search...', e)}
                    onChange={e => console.log('onChange', e)}
                />
                <Form.Button
                    content="Go"
                    // disabled={false === selected}
                />
            </Form.Group>
        </Form>
    );
};

domReady(() => {
    const fields = document.querySelectorAll(
        '.js-react-topic-index-search-field',
    );
    if (fields) {
        fields.forEach(elm => {
            render(<TopicSearchField restrictToTermId={null} />, elm);
        });
    }
});
