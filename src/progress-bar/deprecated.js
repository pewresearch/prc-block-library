/**
 * WordPress Dependencies
 */

const v1 = {
	attributes: {
		maxWidth: {
			type: 'number',
			default: '640',
		},
		barColor: {
			type: 'string',
			default: 'social-trends-teal',
		},
		barPadding: {
			type: 'number',
			default: 15,
		},
		backgroundColor: {
			type: 'string',
			default: 'ui-beige-very-light',
		},
		categoryLabelColor: {
			type: 'string',
			default: 'text-color',
		},
		maxValue: {
			type: 'number',
			default: 100,
		},
		currentValue: {
			type: 'number',
			default: 50,
		},
		showAxisLabel: {
			type: 'boolean',
			default: true,
		},
		axisLabel: {
			type: 'string',
			default: 'Total',
		},
		axisPadding: {
			type: 'number',
			default: 60,
		},
		axisLabelMaxWidth: {
			type: 'number',
			default: 60,
		},
		labelFormat: {
			enum: ['fractional', 'percentage'],
			default: 'fractional',
		},
		labelPositionDX: {
			type: 'integer',
			default: -5,
		},
		labelPositionDY: {
			type: 'integer',
			default: 4,
		},
	},
	save() {
		// Old version was a dynamic block (server-side rendered)
		// Dynamic blocks don't save static HTML to the database
		return null;
	},
	isEligible(attributes) {
		// This deprecation applies if the block has currentValue but not value
		return attributes.hasOwnProperty('currentValue');
	},
	migrate(attributes) {
		const {
			currentValue,
			axisLabel,
			labelFormat,
			barColor,
			backgroundColor,
			maxValue,
			// Drop all other old attributes that don't exist in new version
			maxWidth,
			barPadding,
			categoryLabelColor,
			showAxisLabel,
			axisPadding,
			axisLabelMaxWidth,
			labelPositionDX,
			labelPositionDY,
			...rest
		} = attributes;

		return {
			// Keep compatible attributes
			barColor: barColor || 'social-trends-teal',
			backgroundColor: backgroundColor || 'ui-beige-very-light',
			maxValue: maxValue || 100,
			// Migrate renamed attributes
			value: currentValue !== undefined ? currentValue : 0,
			label: axisLabel || 'Progress',
			labelFormat: labelFormat || 'percentage',
			// Add new attributes with defaults
			valueColor: 'ui-black',
			barHeight: 10,
		};
	},
};

export default [v1];
