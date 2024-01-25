/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Spinner, Flex, FlexItem, FlexBlock } from '@wordpress/components';
import { Warning } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import useCollectionTerms from './use-collection-terms';

export default function CollectionList({clientId}) {
	const termIds = useSelect((select) => {
		const { getEditedPostAttribute } = select('core/editor');
		const collectionTerms = getEditedPostAttribute('collection');
		return collectionTerms;
	}, [clientId]);

	const {
		isResolving,
		records,
		parentTerm,
		altLanguagePosts,
	} = useCollectionTerms(termIds);

	return (
		<Fragment>
			{isResolving && (
				<Warning>
					<Flex>
						<FlexItem>
							<Spinner />
						</FlexItem>
						<FlexBlock>
							{__('Loading Collection...', 'prc-block-library')}
						</FlexBlock>
					</Flex>
				</Warning>
			)}
			{!isResolving && (
				<Fragment>
					<div className="wp-block-prc-block-fact-sheet-collection--parent-term">
						{`${parentTerm?.name}`}
					</div>
					{altLanguagePosts?.length > 0 && (
						<div className="wp-block-prc-block-fact-sheet-collection--alt-languages">
							{altLanguagePosts?.map((post) => (
								<div
									className="wp-block-prc-block-fact-sheet-collection--alt-language-link"
									key={Math.random().toString(10).substring(7)}
								>
									{`${post.title.rendered}`}
								</div>
							))}
						</div>
					)}
					<div className="wp-block-prc-block-fact-sheet-collection--term-list">
					{records?.map((term) => {
						const isActive = termIds.includes(term.id);
						return (
							<Fragment key={Math.random().toString(10).substring(7)}>
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
									{`${term.name}`}
								</div>
							</Fragment>
						)
					})}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}
