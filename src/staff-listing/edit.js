/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, Notice, PanelBody } from '@wordpress/components';

const capitalize = (s) => {
	if (typeof s !== 'string') {
		return '';
	}
	return s.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

const SelectTerms = ({selected, setAttributes}) => {
	const terms = selected.split(',');
	const [selectedTerms, setSelectedTerms] = useState(terms);
	const options = ['executive-team', 'managing-directors', 'staff'];

	useEffect(()=>{
		setAttributes({staffTypes: selectedTerms.join(',')});
	}, [selectedTerms]);

	return (
		<div>
			{options.map(option => {
				return (
					<CheckboxControl
						key={option}
						label={capitalize(option.replace('-', ' '))}
						checked={terms.includes(option)}
						onChange={() => {
							if (terms.includes(option)) {
								setSelectedTerms(selectedTerms.filter(term => term !== option));
							} else {
								setSelectedTerms([...selectedTerms, option]);
							}
						}}
					/>
				);
			})}
		</div>
	);
}

const edit = ({ attributes, setAttributes }) => {
    const { staffTypes } = attributes;
	const [staffPosts, setStaffPosts] = useState({'executive-team': [], 'managing-directors': [], staff: []});
	const [loading, setLoading] = useState(true);

    const blockProps = useBlockProps();

	const loadPosts = (termSlugs) => {
		setLoading(true);
		apiFetch({
            path: addQueryArgs('/prc-api/v2/blocks/staff-listing', {staff_types: termSlugs})
        }).then(d => {
           setStaffPosts({...staffPosts, ...d});
        });
	}

	useEffect(()=>{
		console.log('staffPosts changed', staffPosts);
		setLoading(false);
	},[staffPosts]);

	useEffect(()=>{
		loadPosts(staffTypes);
	},[staffTypes]);

    return (
		<Fragment>
			<InspectorControls>
                <PanelBody title="Staff Listing Options">
					<SelectTerms selected={staffTypes} setAttributes={setAttributes} />
                </PanelBody>
            </InspectorControls>
			<div {...blockProps} >
				{loading && (
					<Notice status="warning" isDismissible={false} >{__('Loading Staff...', 'prc-block-library')}</Notice>
				)}
				{false === loading && Object.keys(staffPosts).map(term => {
					if ( staffPosts[term].length <= 0 ) {
						return <Fragment/>
					}
					return (
						<Fragment>
						<h2>{capitalize(term.replace('-', ' '))}</h2>
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
