/**
 * External Dependencies
 */
import classNames from 'classnames';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * WordPress Dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const constructTaxonomyListBlock = (newHeading, newUrl, innerBlocks) => {
	const newBlock = {
		name: 'prc-block/taxonomy-list',
		attributes: {
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'vertical',
			},
		},
		innerBlocks: [
			{
				name: 'prc-block/taxonomy-menu-link',
				attributes: {
					label: decodeEntities(newHeading),
					url: newUrl,
					id: '',
					className: 'is-style-sub-heading',
					style: {
						typography: {
							fontSize: '21px',
						},
					},
				},
			},
		],
	};

	return newBlock;
};

const transformPaneToPage = (newHeading, newUrl, innerBlocks) => {
	const newTaxonomyListBlock = {
		name: 'prc-block/taxonomy-list',
		attributes: {
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'vertical',
			},
		},
		innerBlocks: [
			{
				name: 'prc-block/taxonomy-menu-link',
				attributes: {
					label: decodeEntities(newHeading),
					url: newUrl,
					id: '',
					className: 'is-style-sub-heading',
					style: {
						typography: {
							fontSize: '21px',
						},
					},
				},
			},
		],
	};

	innerBlocks.forEach((block) => {
		if ('prc-block/taxonomy-search' === block.name) {
			newTaxonomyListBlock.innerBlocks.push({
				name: 'prc-block/taxonomy-search',
				attributes: block.attributes,
			});
		}
		if ('prc-block/taxonomy-tree' === block.name) {
			newTaxonomyListBlock.innerBlocks.push({
				name: 'prc-block/taxonomy-menu-link',
				attributes: {
					label: !block.attributes.subHeading
						? `Key Topics`
						: decodeEntities(block.attributes.subHeading),
					id: '',
					url: '',
					style: {
						typography: {
							fontSize: '18px',
							fontStyle: 'normal',
							fontWeight: '700',
						},
					},
				},
			});
			block.innerBlocks.forEach((subBlock) => {
				const subSubBlocks = subBlock.innerBlocks;
				const newSubSubBlocks = [];
				subSubBlocks.forEach((subSubBlock) => {
					newSubSubBlocks.push({
						name: 'prc-block/taxonomy-menu-link',
						attributes: {
							label: decodeEntities(subSubBlock.attributes.label),
							url: subSubBlock.attributes.url,
							id: subSubBlock.attributes.id,
						},
					});
				});

				newTaxonomyListBlock.innerBlocks.push({
					name: 'prc-block/taxonomy-menu-link',
					attributes: {
						label: decodeEntities(subBlock.attributes.label),
						url: subBlock.attributes.url,
						id: subBlock.attributes.id,
						enableSubMenu: 0 < subSubBlocks.length,
						className: classNames({
							'is-style-sub-tree': 0 < subSubBlocks.length,
						}),
					},
					innerBlocks: newSubSubBlocks,
				});
			});
		}
	});

	console.log(`${newHeading}: `, innerBlocks);

	// innerBlocks.forEach((block) => {
	// 	const { subHeading } = block.attributes;
	// 	innerBlocksTemplate.push([
	// 		'prc-block/taxonomy-menu-link',
	// 		{
	// 			label: subHeading || 'Key Topics',
	// 			url: '',
	// 			id: '',
	// 			fontSize: 'small-label',
	// 			style: {
	// 				typography: {
	// 					textTransform: 'uppercase',
	// 					fontStyle: 'normal',
	// 					fontWeight: '700',
	// 				},
	// 			},
	// 		},
	// 		[],
	// 	]);

	// 	if (block.innerBlocks.length) {
	// 		block.innerBlocks.forEach((subBlock) => {
	// 			const { label, url, id } = subBlock.attributes;
	// 			const subSubBlocks = subBlock.innerBlocks;
	// 			const subBlockStructure = [];

	// 			subSubBlocks.forEach((subSubBlock) => {
	// 				subBlockStructure.push([
	// 					'prc-block/taxonomy-menu-link',
	// 					{
	// 						label: subSubBlock.attributes.label,
	// 						url: subSubBlock.attributes.url,
	// 						id: subSubBlock.attributes.id,
	// 					},
	// 				]);
	// 				if (0 < subSubBlock.innerBlocks.length) {
	// 					// Getting quite ridiculous here, no? Thats why we're flattening this and using CSS to provide structure.
	// 					subSubBlock.innerBlocks.forEach((subSubSubBlock) => {
	// 						subBlockStructure.push([
	// 							'prc-block/taxonomy-menu-link',
	// 							{
	// 								label: subSubSubBlock.attributes.label,
	// 								url: subSubSubBlock.attributes.url,
	// 								id: subSubSubBlock.attributes.id,
	// 							},
	// 						]);
	// 					});
	// 				}
	// 			});

	// 			innerBlocksTemplate.push([
	// 				'prc-block/taxonomy-menu-link',
	// 				{
	// 					label,
	// 					url,
	// 					id,
	// 					enableSubMenu: 0 < subSubBlocks.length,
	// 					className: classNames({
	// 						'is-style-sub-tree': 0 < subSubBlocks.length,
	// 					}),
	// 				},
	// 				subBlockStructure,
	// 			]);
	// 		});
	// 	}
	// });

	return [newTaxonomyListBlock];
};

const transformFropDeprecatedTopicIndexCondensed = (innerBlocks) => {
	const newMenu = {
		name: 'prc-block/tabs-menu',
		attributes: {},
		innerBlocks: [],
	};

	const newPanes = {
		name: 'prc-block/tabs-panes',
		attributes: {},
		innerBlocks: [],
	};

	const menuBlock = innerBlocks.filter(
		(block) => 'prc-block/topic-index-condensed-menu' === block.name
	)[0];
	const menuItems = menuBlock.innerBlocks.map((block) => {
		const { title, uuid } = block.attributes;
		return {
			title,
			uuid,
		};
	});
	const newMenuBlocks = menuItems.map((item) => {
		return {
			name: 'prc-block/tabs-menu-item',
			attributes: {
				title: decodeEntities(item.title),
				uuid: item.uuid,
			},
		};
	});
	newMenu.innerBlocks = newMenuBlocks;

	const pagesBlocks = innerBlocks.filter(
		(block) => 'prc-block/topic-index-condensed-pages' === block.name
	)[0];
	const pagesItems = pagesBlocks.innerBlocks.map((block) => {
		const { heading, uuid, url } = block.attributes;
		return {
			heading,
			uuid,
			url,
			innerBlocks: block.innerBlocks,
		};
	});
	const newPaneBlocks = pagesItems.map((item) => {
		return {
			name: 'prc-block/tabs-pane',
			attributes: {
				uuid: item.uuid,
			},
			innerBlocks: transformPaneToPage(
				item.heading,
				item.url,
				item.innerBlocks
			),
		};
	});
	newPanes.innerBlocks = newPaneBlocks;

	console.log(menuBlock, pagesBlocks);

	console.log('newMenu', newMenu);
	console.log('newPanes', newPanes);

	const newInnerBlocks = [newMenu, newPanes];
	console.log('newInnerBlocks', newInnerBlocks);

	return createBlock(
		'prc-block/tabs',
		{
			vertical: true,
			className: 'is-style-accordion',
		},
		createBlocksFromInnerBlocksTemplate(newInnerBlocks)
	);
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/topic-index-condensed-controller'],
			transform: (attributes, innerBlocks) => {
				if (!Array.isArray(innerBlocks) || 0 === innerBlocks.length) {
					return false;
				}
				return transformFropDeprecatedTopicIndexCondensed(innerBlocks);
			},
		},
	],
};

export default transforms;
