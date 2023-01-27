/**
 * External Dependencies
 */
import { wpRestApiTermsToTree } from '@prc/functions';
import md5 from 'md5';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';

const Collections = styled('div')`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	flex-direction: row;
	padding-top: 1em;
	padding-bottom: 1em;
	margin-bottom: 1em;
	border-top: 1px solid rgba(34, 36, 38, 0.15);
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`;

const Children = styled('div')`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	flex-direction: row;
`;

const Collection = styled('div')`
	font-weight: ${(props) => (props.isActive ? 'bold' : 'inherit')};
`;

const ParentCollection = styled('div')`
	font-weight: bold;
`;

export default function CollectionList() {
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
		},
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
			// console.log('Terms: ', records);
			const newTree = wpRestApiTermsToTree(records, termIds);
			setTree(newTree);
		}
	}, [isResolving, hasResolved, records, termIds]);

	return (
		<Collections>
			{isResolving && <Spinner />}
			{tree.map((term) => (
				<Collection key={term.id ? term.id : md5(term.name)}>
					<ParentCollection>
						{__(`${term.name}`, 'prc-block-library')}
					</ParentCollection>
					{term.children && (
						<Children>
							{term.children.map((child) => {
								const isActive = termIds.includes(child.id);
								return (
									<Collection
										key={child.id ? child.id : md5(child.name)}
										isActive={isActive}
									>
										{__(`${child.name}`, 'prc-block-library')}
									</Collection>
								);
							})}
						</Children>
					)}
				</Collection>
			))}
		</Collections>
	);
}
