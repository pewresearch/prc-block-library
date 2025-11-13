/**
 * Generate options array based on range parameters.
 *
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} step - Step increment
 * @returns {Array} Array of option objects
 */
export const generateRangeOptions = (start, end, step = 1) => {
	const options = [];
	for (let i = start; i <= end; i += step) {
		options.push({
			label: i.toString(),
			value: i.toString(),
		});
	}
	return options;
};

/**
 * Generate year options from current year backwards.
 *
 * @param {number} yearsBack - Number of years to go back (default 100)
 * @returns {Array} Array of year option objects
 */
export const generateYearOptions = (yearsBack = 100) => {
	const currentYear = new Date().getFullYear();
	const options = [];
	for (let i = 0; i <= yearsBack; i++) {
		const year = currentYear - i;
		options.push({
			label: year.toString(),
			value: year.toString(),
		});
	}
	return options;
};

/**
 * Construct a select input template for the select range block.
 *
 * @param {Object} attributes - Block attributes
 * @param {string} label - Label for the select
 * @param {string} name - Name attribute for the select
 * @param {Array} options - Options array
 * @returns {Array} Block template array
 */
export const getSelectTemplate = (
	attributes = {},
	label = 'Select',
	name = 'select',
	options = []
) => {
	return [
		'prc-block/form-input-select',
		{
			type: 'custom',
			label,
			required: true,
			placeholder: `Select ${label}...`,
			options,
			interactiveNamespace: 'prc-block/form-input-select-range',
			interactiveSubsumption: true,
			metadata: {
				name,
			},
			lock: {
				move: true,
				remove: true,
			},
		},
	];
};

/**
 * Get the appropriate options based on block type.
 *
 * @param {Object} attributes - Block attributes
 * @returns {Array} Array of options
 */
export const getOptionsForType = (attributes) => {
	const { type, rangeStart, rangeEnd, rangeStep } = attributes;

	switch (type) {
		case 'years':
			return generateYearOptions(100);
		case 'numbers':
			return generateRangeOptions(
				rangeStart || 0,
				rangeEnd || 100,
				rangeStep || 1
			);
		case 'custom':
		default:
			return [];
	}
};

/**
 * Construct the double select template for min/max range.
 *
 * @param {Object} attributes - Block attributes
 * @returns {Array} Array of block templates
 */
export const getDoubleSelectTemplate = (attributes) => {
	const options = getOptionsForType(attributes);

	return [
		getSelectTemplate(attributes, 'Minimum', 'rangeMin', options),
		getSelectTemplate(attributes, 'Maximum', 'rangeMax', options),
	];
};
