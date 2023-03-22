/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import { select } from '@wordpress/data';

export default function getCollectionTerms() {
	const { getCurrentPostId } = wp.data.select('core/editor');
	const { getPostTerms } = wp.data.select('core');
	const collectionTerms = getPostTerms(getCurrentPostId(), 'collection');
	if (!collectionTerms.length) {
		return;
	}
	const collectionTerm = collectionTerms.pop();
	const parentTerm = wp.data
		.select('core')
		.getTerm('collection', collectionTerm.parent);
	const parentTermId = parentTerm.id;
	const parentTermData = {
		name: parentTerm.name,
		link: select('core').getTermLink(parentTermId, 'collection'),
	};
	const childTerms = wp.data
		.select('core')
		.getTermChildren(parentTermId, 'collection');
	const childTermsData = childTerms
		.map((termId) => {
			const childTerm = wp.data
				.select('core')
				.getTerm('collection', termId);
			if (!childTerm) {
				return null;
			}
			let link = wp.data
				.select('core')
				.getTermLink(childTerm.id, 'collection');
			const englishPosts = wp.data
				.select('core')
				.getEntityRecords('postType', 'fact-sheets', {
					per_page: 1,
					taxonomy: [
						{
							taxonomy: 'collection',
							field: 'term_id',
							terms: childTerm.id,
						},
						{
							taxonomy: 'languages',
							field: 'slug',
							terms: ['en'],
						},
					],
				});
			if (englishPosts && englishPosts.length) {
				const englishPost = englishPosts.pop();
				link = wp.data
					.select('core')
					.getEntityRecord(
						'postType',
						'fact-sheets',
						englishPost.id
					).link;
			}
			return {
				termId: childTerm.id,
				name: childTerm.name,
				link,
			};
		})
		.filter((termData) => termData)
		.sort((a, b) => a.name.localeCompare(b.name));

	const otherLanguagePosts = wp.data
		.select('core')
		.getEntityRecords('postType', 'fact-sheets', {
			per_page: 24,
			taxonomy: [
				{
					taxonomy: 'collection',
					field: 'term_id',
					terms: collectionTerm.id,
				},
				{
					taxonomy: 'languages',
					field: 'slug',
					terms: ['en'],
					operator: 'NOT IN',
				},
			],
		});

	return {
		terms: childTermsData.map((termData) => {
			return `<a href="${termData.link}" class="${classNames(
				'wp-block-prc-block-fact-sheet-collection--term-link',
				{
					'is-active': termData.termId === collectionTerm.id,
				}
			)}">${termData.name}</a>`;
		}),
		altLanguages: otherLanguagePosts.map((post) => {
			if (!post) {
				return null;
			}
			const permalink = wp.data
				.select('core')
				.getEntityRecord('postType', 'fact-sheets', post.id).link;
			const languageTerm = wp.data
				.select('core')
				.getPostTerms(post.id, 'languages')
				.pop();
			if (!languageTerm) {
				return null;
			}
			const languageName = languageTerm.name;
			return `<a href="${permalink}" class="wp-block-prc-block-fact-sheet-collection__term-link__alt-language-link">${languageName}</a>`;
		}),
		collectionName: parentTermData.name,
	};
}
