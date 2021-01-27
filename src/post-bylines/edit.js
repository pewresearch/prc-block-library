import { Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

const edit = ({ className, clientId }) => {
    const [bylines, setBylines] = useState([]);
    const bylineTerms = useSelect(
        select => {
            return select('core/editor').getEditedPostAttribute('bylines');
        },
        [clientId],
    );
    const blockProps = useBlockProps({
        className: `${className} bylines meta`,
    });

    const getBylineNameAsync = termId => {
        return new Promise(resolve => {
            apiFetch({
                path: `/wp/v2/bylines/${termId}`,
            }).then(byline => {
                const { name } = byline;
                return resolve(name);
            });
        });
    };

    const getBylines = () => {
        return Promise.all(
            bylineTerms.map(termId => getBylineNameAsync(termId)),
        );
    };

    useEffect(() => {
        getBylines().then(data => setBylines([...data]));
    }, [bylineTerms]);

    return (
        <div {...blockProps}>
            {`By `}
            {bylines.map((b, index) => {
                const total = bylines.length - 1;
                if (1 < total && index === total) {
                    return <Fragment>and {b}</Fragment>;
                }
                if (1 < total && index !== total) {
                    return <Fragment>{b}, </Fragment>;
                }
                return <Fragment>{b}</Fragment>;
            })}
        </div>
    );
};

export default edit;
