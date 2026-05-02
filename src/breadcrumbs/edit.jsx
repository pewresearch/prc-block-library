/**
 * External Dependencies
 */
import classnames from 'classnames';
import { getBlockGapSupportValue } from '@prc/functions';

/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import useBreadcrumbs from './use-breadcrumbs';

export default function Edit({
	attributes,
	isSelected,
	setAttributes,
	context: { postType, postId },
}) {
	const { contentJustification } = attributes;

	const { categories, parents, post, siteTitle } = useSelect(
		(select) => {
			const { getEntityRecord, getEditedEntityRecord } =
				select(coreStore);

			const siteData = getEntityRecord('root', '__unstableBase');
			const currentPost = getEditedEntityRecord(
				'postType',
				postType,
				postId
			);

			const parentCategories = [];
			const parentEntities = [];
			let categoryId = currentPost?.categories?.[0];
			let currentParentId = currentPost?.parent;

			while (currentParentId) {
				const nextParent = getEntityRecord(
					'postType',
					postType,
					currentParentId
				);

				currentParentId = null;

				if (nextParent) {
					parentEntities.push(nextParent);
					currentParentId = nextParent?.parent || null;
				}
			}

			while (categoryId) {
				const nextCategory = getEntityRecord(
					'taxonomy',
					'category',
					categoryId
				);

				categoryId = null;

				if (nextCategory) {
					parentCategories.push(nextCategory);
					categoryId = nextCategory?.parent || null;
				}
			}

			return {
				categories: parentCategories,
				post: currentPost,
				parents: parentEntities.reverse(),
				siteTitle: decodeEntities(siteData?.name),
			};
		},
		[postId, postType]
	);

	// Construct breadcrumbs using custom hook
	const breadcrumbs = useBreadcrumbs({
		attributes,
		categories,
		parents,
		post,
		siteTitle,
		isSelected,
		setAttributes,
	});

	const blockProps = useBlockProps({
		className: classnames({
			[`is-content-justification-${contentJustification}`]:
				contentJustification,
		}),
		style: {
			'--breadcrumbs-gap': getBlockGapSupportValue(
				attributes,
				'horizontal'
			),
		},
	});

	return (
		<>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<nav {...blockProps}>
				<div className="prc-block-breadcrumbs__list">{breadcrumbs}</div>
			</nav>
		</>
	);
}
