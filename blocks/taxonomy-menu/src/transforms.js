/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const transformDeprecatedMenuBlock = (innerBlocks) => {
	const menuItems = innerBlocks;

	const innerBlocksTemplate = menuItems.map((block, index) => {
		const { label, url, id } = block.attributes;
		return [
			'prc-block/taxonomy-menu-link',
			{
				label,
				url,
				id,
			},
			[],
		];
	});

	return createBlock(
		'prc-block/taxonomy-menu',
		{
			backgroundColor: 'white',
			borderColor: 'gray-light',
			textColor: 'gray-alt',
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'horizontal',
			},
		},
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
	);
};

const transformDeprecatedTopicIndexCategorized = (attributes, innerBlocks) => {
	const innerBlocksTemplate = [
		[
			'prc-block/taxonomy-menu-link',
			{
				label: attributes.heading,
				url: attributes.url,
				id: '',
				className: 'is-style-sub-heading',
			},
		],
	];

	innerBlocks.forEach((block) => {
		const { subHeading } = block.attributes;
		innerBlocksTemplate.push([
			'prc-block/taxonomy-menu-link',
			{
				label: subHeading || 'Key Topics',
				url: '',
				id: '',
				fontSize: 'small-label',
				style: {
					typography: {
						textTransform: 'uppercase',
						fontStyle: 'normal',
						fontWeight: '700',
					},
				},
			},
			[],
		]);

		if (block.innerBlocks.length) {
			block.innerBlocks.forEach((subBlock) => {
				const { label, url, id } = subBlock.attributes;
				const subSubBlocks = subBlock.innerBlocks;
				const subBlockStructure = [];

				subSubBlocks.forEach((subSubBlock) => {
					subBlockStructure.push([
						'prc-block/taxonomy-menu-link',
						{
							label: subSubBlock.attributes.label,
							url: subSubBlock.attributes.url,
							id: subSubBlock.attributes.id,
						},
					]);
					if (0 < subSubBlock.innerBlocks.length) {
						// Getting quite ridiculous here, no? Thats why we're flattening this and using CSS to provide structure.
						subSubBlock.innerBlocks.forEach((subSubSubBlock) => {
							subBlockStructure.push([
								'prc-block/taxonomy-menu-link',
								{
									label: subSubSubBlock.attributes.label,
									url: subSubSubBlock.attributes.url,
									id: subSubSubBlock.attributes.id,
								},
							]);
						});
					}
				});

				innerBlocksTemplate.push([
					'prc-block/taxonomy-menu-link',
					{
						label,
						url,
						id,
						enableSubMenu: 0 < subSubBlocks.length,
						className: classNames({
							'is-style-sub-tree': 0 < subSubBlocks.length,
						}),
					},
					subBlockStructure,
				]);
			});
		}
	});

	return createBlock(
		'prc-block/taxonomy-menu',
		{
			backgroundColor: 'white',
			borderColor: 'gray-light',
			textColor: 'text-color',
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'vertical',
			},
		},
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
	);
};

const transformFromDeprecatedTaxonomyTree = (attributes, innerBlocks) => {
	const innerBlocksTemplate = [
		[
			'prc-block/taxonomy-menu-link',
			{
				label: attributes.heading,
				url: attributes.url,
				id: '',
				className: 'is-style-sub-heading',
			},
		],
	];

	innerBlocks.forEach((block) => {
		const { subHeading } = block.attributes;
		innerBlocksTemplate.push([
			'prc-block/taxonomy-menu-link',
			{
				label: subHeading || 'Key Topics',
				url: '',
				id: '',
				fontSize: 'small-label',
				style: {
					typography: {
						textTransform: 'uppercase',
						fontStyle: 'normal',
						fontWeight: '700',
					},
				},
			},
			[],
		]);

		if (block.innerBlocks.length) {
			block.innerBlocks.forEach((subBlock) => {
				const { label, url, id } = subBlock.attributes;
				const subSubBlocks = subBlock.innerBlocks;
				const subBlockStructure = [];

				subSubBlocks.forEach((subSubBlock) => {
					subBlockStructure.push([
						'prc-block/taxonomy-menu-link',
						{
							label: subSubBlock.attributes.label,
							url: subSubBlock.attributes.url,
							id: subSubBlock.attributes.id,
						},
					]);
					if (0 < subSubBlock.innerBlocks.length) {
						// Getting quite ridiculous here, no? Thats why we're flattening this and using CSS to provide structure.
						subSubBlock.innerBlocks.forEach((subSubSubBlock) => {
							subBlockStructure.push([
								'prc-block/taxonomy-menu-link',
								{
									label: subSubSubBlock.attributes.label,
									url: subSubSubBlock.attributes.url,
									id: subSubSubBlock.attributes.id,
								},
							]);
						});
					}
				});

				innerBlocksTemplate.push([
					'prc-block/taxonomy-menu-link',
					{
						label,
						url,
						id,
						enableSubMenu: 0 < subSubBlocks.length,
						className: classNames({
							'is-style-sub-tree': 0 < subSubBlocks.length,
						}),
					},
					subBlockStructure,
				]);
			});
		}
	});

	return createBlock(
		'prc-block/taxonomy-menu',
		{
			backgroundColor: 'white',
			borderColor: 'gray-light',
			textColor: 'text-color',
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'vertical',
			},
		},
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
	);
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/menu'],
			transform: (attributes, innerBlocks) => {
				if (!Array.isArray(innerBlocks) || 0 === innerBlocks.length) {
					return false;
				}
				return transformDeprecatedMenuBlock(innerBlocks);
			},
		},
		{
			type: 'block',
			blocks: ['prc-block/topic-index-categorized'],
			transform: (attributes, innerBlocks) => {
				if (!Array.isArray(innerBlocks) || 0 === innerBlocks.length) {
					return false;
				}
				return transformDeprecatedTopicIndexCategorized(
					attributes,
					innerBlocks
				);
			},
		},
		{
			type: 'block',
			blocks: ['prc-block/taxonomy-tree'],
			transform: (attributes, innerBlocks) => {
				if (!Array.isArray(innerBlocks) || 0 === innerBlocks.length) {
					return false;
				}
				return transformFromDeprecatedTaxonomyTree(
					attributes,
					innerBlocks
				);
			},
		},
	],
};

export default transforms;
