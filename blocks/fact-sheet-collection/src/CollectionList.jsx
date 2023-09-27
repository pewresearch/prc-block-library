/**
 * External Dependencies
 */
import { wpRestApiTermsToTree } from '@prc/functions';
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useState, useEffect, Fragment } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';

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
				<Fragment key={Math.random().toString(10).substring(7)}>
					<div className="wp-block-prc-block-fact-sheet-collection--parent-term">
						{`${term.name}`}
					</div>
					{term.children && (
						<div className="wp-block-prc-block-fact-sheet-collection--term-list">
							{term.children.map((child) => {
								const isActive = termIds.includes(child.id);
								return (
									<div
										className={classNames(
											'wp-block-prc-block-fact-sheet-collection--term-link',
											{
												'is-active': isActive,
											}
										)}
										key={Math.random()
											.toString(10)
											.substring(7)}
									>
										{`${child.name}`}
									</div>
								);
							})}
						</div>
					)}
				</Fragment>
			))}
		</Fragment>
	);
}
