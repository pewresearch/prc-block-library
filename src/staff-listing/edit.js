/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, className, setAttributes }) => {
    const { staffTypes } = attributes;
	const [staffTypeTerms, setStaffTypeTerms] = useState(); // Pre populate with what we know then go fetch...
	const [staffPosts, setStaffPosts] = useState({staff: [], managingDirectors: [], executiveTeam: []});

    const blockProps = useBlockProps();

	const loadPoasts = (termSlugs) => {
		apiFetch({
            path: addQueryArgs('/prc-api/v2/blocks/staff-listing', {staff_types: termSlugs})
        }).then(d => {
           setStaffPosts({...staffPosts, ...d});
        });
	}

	useEffect(()=>{
		console.log('staffPosts changed', staffPosts);
	},[staffPosts]);

	useEffect(()=>{
		loadPoasts(staffTypes);
	},[staffTypes]);

    return (
		<div {...blockProps} >
			{staffPosts.map(term => {
				console.log('term...', term);
			})}
		</div>
	);
};

export default edit;
