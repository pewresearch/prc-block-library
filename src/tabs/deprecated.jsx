/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const v1 = {
	attributes: {
		tabsId: {
			type: 'string',
			default: '',
		},
		orientation: {
			type: 'string',
			default: 'horizontal',
			enum: ['horizontal', 'vertical'],
		},
		activeTabIndex: {
			type: 'number',
			default: 0,
		},
		tabInactiveColor: {
			type: 'string',
		},
		customTabInactiveColor: {
			type: 'string',
		},
		tabHoverColor: {
			type: 'string',
		},
		customTabHoverColor: {
			type: 'string',
		},
		tabActiveColor: {
			type: 'string',
		},
		customTabActiveColor: {
			type: 'string',
		},
		tabTextColor: {
			type: 'string',
		},
		customTabTextColor: {
			type: 'string',
		},
		tabActiveTextColor: {
			type: 'string',
		},
		customTabActiveTextColor: {
			type: 'string',
		},
		tabHoverTextColor: {
			type: 'string',
		},
		customTabHoverTextColor: {
			type: 'string',
		},
		// Note: v1 did not have mobileDropdown or mobileDropdownWidth attributes
	},
	save( { attributes } ) {
		// eslint-disable-next-line react-compiler/react-compiler
		const blockProps = useBlockProps.save();

		// eslint-disable-next-line react-compiler/react-compiler
		const innerBlocksProps = useInnerBlocksProps.save( {} );

		const title = attributes?.metadata?.name || 'Tab Contents';

		return (
			<div { ...blockProps }>
				<h3 className="tabs__title">{ title }</h3>
				<ul className="tabs__list" role="tablist"></ul>
				<select className="tabs__select" role="listbox" aria-label={ title }>
					<option value="">{ title }</option>
				</select>
				{ innerBlocksProps.children }
			</div>
		);
	},
	migrate( attributes ) {
		// Migrate old attributes to new structure
		// Add default values for new attributes that didn't exist in v1
		return {
			...attributes,
			mobileDropdown: false,
			mobileDropdownWidth: 768,
		};
	},
};

const deprecated = [v1];

export default deprecated;
