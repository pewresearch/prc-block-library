/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

const edit = ({ attributes, className, clientId, setAttributes }) => {
	const {textAlign} = attributes;
    const [bylines, setBylines] = useState([]);
    const bylineTerms = useSelect(
        select => {
            return select('core/editor').getEditedPostAttribute('bylines');
        },
        [clientId],
    );
    const blockProps = useBlockProps({
        className: classNames(className, {
			'bylines meta': true,
			[ `has-text-align-${ textAlign }` ]: textAlign
		}),
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
        if ( bylineTerms && bylineTerms.length > 0 ) {
            getBylines().then(data => {
				console.log("bylines data...", data);
				setBylines([...data]);
			});
        } else {
			setBylines(['Jane Doe', 'John Doe']);
		}
    }, [bylineTerms]);

    return (
		<Fragment>
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<div {...blockProps}>
				{`By `}
				{bylines.map((b, index) => {
					const total = bylines.length;
					if (1 < total && total === index + 1) {
						return <Fragment>and {b}</Fragment>;
					}
					if (1 < total && total !== index + 1) {
						return <Fragment>{b}, </Fragment>;
					}
					return <Fragment>{b}</Fragment>;
				})}
			</div>
		</Fragment>
    );
};

export default edit;
