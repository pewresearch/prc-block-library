/**
 * External Dependencies
 */
import { getTermsAsOptions } from '@prc-app/shared';
/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { BaseControl, CheckboxControl, CardDivider, Placeholder, Spinner, PanelBody } from '@wordpress/components';

const capitalize = (s) => {
	if (typeof s !== 'string') {
		return '';
	}
	return s.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

const SelectTerms = ({taxonomy = 'staff-type', attribute ='staffTypes', selected = [], setAttributes}) => {
	const [selectedTerms, setSelectedTerms] = useState(selected);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		getTermsAsOptions(taxonomy).then(terms => {
			setOptions(terms);
		});
	}, [taxonomy]);

	useEffect(()=>{
		const toSend = {};
		toSend[attribute] = [...selectedTerms];
		setAttributes(toSend);
	}, [selectedTerms]);

	return (
		<BaseControl label={capitalize(taxonomy.replace('-', ' '))}>
			{options.map(option => {
				return (
					<CheckboxControl
						key={option.value}
						label={option.label}
						checked={selectedTerms.includes(option.value)}
						onChange={() => {
							if (selectedTerms.includes(option.value)) {
								setSelectedTerms(selectedTerms.filter(term => term !== option.value));
							} else {
								setSelectedTerms([...selectedTerms, option.value]);
							}
						}}
					/>
				);
			})}
			<CardDivider/>
		</BaseControl>
	);
}

const edit = ({ attributes, setAttributes }) => {
    const { staffTypes, expertise, researchTeams } = attributes;
	const [staffPosts, setStaffPosts] = useState({'executive-team': [], 'managing-directors': [], staff: []});
	const [loading, setLoading] = useState(true);

    const blockProps = useBlockProps();

	const loadPosts = (t = [], e = [], r = []) => {
		const payload = {
			staff_types: t.join(','),
			areas_of_expertise: e.join(','),
			research_teams: r.join(',')
		}
		setLoading(true);
		apiFetch({
            path: addQueryArgs('/prc-api/v2/blocks/staff-listing', payload),
        }).then(d => {
			console.log(d);
			setStaffPosts({...staffPosts, ...d});
        });
	}

	useEffect(()=>{
		loadPosts(staffTypes, expertise, researchTeams);
	},[staffTypes, expertise, researchTeams]);

	useEffect(()=>{
		console.log('staffPosts changed', staffPosts);
		setLoading(false);
	},[staffPosts]);

    return (
		<Fragment>
			<InspectorControls>
                <PanelBody title="Staff Listing Options">
					<SelectTerms taxonomy="staff-type" attribute="staffTypes" selected={staffTypes} setAttributes={setAttributes} />
					<SelectTerms taxonomy="areas-of-expertise" attribute="expertise" selected={expertise} setAttributes={setAttributes} />
					<SelectTerms taxonomy="research-teams" attribute="researchTeams" selected={researchTeams} setAttributes={setAttributes} />
                </PanelBody>
            </InspectorControls>
			<div {...blockProps} >
				{loading && (
					<Placeholder
						icon=""
						label={__('Staff Listing')}
					>
						<span><Spinner />{` Loading Staff Database...`}</span>
					</Placeholder>
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
								return(
									<div class="item sans-serif">
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
