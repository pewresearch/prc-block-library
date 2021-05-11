/**
 * External dependencies
 */
import { Form } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import { render, useState, useEffect } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

const TopicSearchField = ({ restrictToTermId = 0 }) => {
    const [data, setData] = useState([
        {
            key: 'default',
            value: null,
            text: 'Loading values...',
            disabled: true,
        },
    ]);
    const [processing, toggleProcessing] = useState(false);
    const [loading, toggleLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, select] = useState(false);

    useEffect(() => {
        const args = { per_page: 25 };
        if ('' !== searchTerm) {
            args.search = searchTerm;
        }
        if (0 !== restrictToTermId && '' !== restrictToTermId) {
            args.parent = restrictToTermId;
        }
        const path = addQueryArgs('/wp/v2/topic', args);
        apiFetch({ path })
            .then(topics => {
                const tmpData = topics.map(t => {
                    return {
                        key: t.id,
                        value: t.link,
                        text: decodeEntities(t.name),
                    };
                });
                setData(tmpData);
            })
            .catch(e => console.error(e))
            .finally(() => toggleLoading(false));
    }, [searchTerm]);

    const onSubmit = () => {
        toggleProcessing(true);
        window.location = selected;
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Dropdown
                    placeholder="Start typing or click arrow"
                    search
                    selection
                    options={data}
                    loading={loading}
                    onSearchChange={(e, { searchQuery }) =>
                        setSearchTerm(searchQuery)
                    }
                    onChange={(e, { value }) => select(value)}
                    style={{ width: '200px' }}
                />
                <Form.Button
                    content="Go"
                    type="submit"
                    disabled={false === selected}
                    loading={processing}
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
            const restrictToTermId = elm.getAttribute('data-term-id');
            console.log(elm, restrictToTermId);
            render(
                <TopicSearchField restrictToTermId={restrictToTermId} />,
                elm,
            );
        });
    }
});
