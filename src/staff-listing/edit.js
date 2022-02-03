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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, PanelBody } from '@wordpress/components';

const SelectTerms = ({selected, setAttributes}) => {
	const terms = selected.split(',');
	const options = ['staff', 'managing-directors', 'executive-team'];
	return (
		<div>
			{options.map(option => {
				return (
					<CheckboxControl
						key={option}
						label={option}
						checked={terms.includes(option)}
						onChange={() => {
							if (terms.includes(option)) {
								setAttributes({selected: selected.replace(option, '')});
							} else {
								setAttributes({selected: selected + option});
							}
						}}
					/>
				);
			})}
		</div>
	);
}

const edit = ({ attributes, className, setAttributes }) => {
    const { staffTypes } = attributes;
	const [staffTypeTerms, setStaffTypeTerms] = useState(); // Pre populate with what we know then go fetch...
	const [staffPosts, setStaffPosts] = useState({staff: [], 'managing-directors': [], 'executive-team': []});

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
		<Fragment>
			<InspectorControls>
                <PanelBody title="Staff Listing Options">
					<SelectTerms selected={staffTypes} setAttributes={setAttributes} />
                </PanelBody>
            </InspectorControls>
			<div {...blockProps} >
				{Object.keys(staffPosts).map(term => {
					console.log('term', term);
					if ( staffPosts[term].length <= 0 ) {
						return <Fragment/>
					}
					return (
						<Fragment>
						<h2>{term}</h2>
						<div class="ui list">
							{staffPosts[term].map(staff => {
								console.log('staff....', staff);
								return(
									<div class="item">
										<p><strong>{staff.name}</strong>, {staff.job_title}</p>
									</div>
								);
							})}
						</div>
						</Fragment>
					);
				})}
			</div>
		</Fragment>
	);
};

export default edit;
