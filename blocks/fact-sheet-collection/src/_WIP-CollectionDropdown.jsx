/**
 * External Dependencies
 */
import { wpRestApiTermsToTree } from '@prc/functions';
import { Dropdown } from '@prc/components';
import md5 from 'md5';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { useState, useEffect, Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';

export default function CollectionDropdown() {
	const { termIds = [] } = useSelect((select) => {
		const { getEditedPostAttribute } = select('core/editor');
		return {
			termIds: getEditedPostAttribute('collection'),
		};
	}, []);

	const { records, isResolving, hasResolved } = useEntityRecords(
		'taxonomy',
		'collection',
		{
			per_page: 50,
			context: 'view',
		}
	);

	const [tree, setTree] = useState([
		{
			id: 0,
			name: 'Loading Collection...',
			children: [],
		},
	]);

	useEffect(() => {
		if (!isResolving && hasResolved) {
			const newTree = wpRestApiTermsToTree(records, termIds);
			setTree(newTree);
		}
	}, [isResolving, hasResolved, records, termIds]);

	return (
		<Fragment>
			{isResolving && <Spinner />}
			{tree.map((term) => (
				<Fragment key={md5(`dropdown-${term.name}`)}>
					<div className="wp-block-prc-block-fact-sheet-collection--parent-term">
						{`${term.name}`}
					</div>
					{term.children && (
						<Dropdown
							options={term.children.map((child) => {
								const isActive = termIds.includes(child.id);
								return {
									className: '',
									value: child.id,
									content: child.name,
									style: {},
								};
							})}
						/>
					)}
				</Fragment>
			))}
		</Fragment>
	);
}
