/**
 * Generate options array based on range parameters.
 *
 * @param {number} start - Start value
 * @param {number} end   - End value
 * @param {number} step  - Step increment
 * @return {Array} Array of option objects
 */
export const generateRangeOptions = (start, end, step = 1) => {
	const options = [];
	if (end >= start) {
		for (let i = start; i <= end; i += step) {
			options.push({
				label: i.toString(),
				value: i.toString(),
			});
		}
	}
	return options;
};

/**
 * Construct a select input template for the select range block.
 *
 * @param {string} label - Label for the select
 * @param {string} name  - Name attribute for the select
 * @return {Array} Block template array
 */
export const getSelectTemplate = (subsumption, namespace, label = 'Select', name = 'select') => {
	return [
		'prc-block/form-input-select',
		{
			type: 'custom',
			label,
			required: false,
			placeholder: `Select ${label}...`,
			interactiveNamespace: namespace,
			interactiveSubsumption: subsumption,
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
 * Construct the double select template for min/max range.
 *
 * @return {Array} Array of block templates
 */
export const getDoubleSelectTemplate = (subsumption, namespace) => {
	return [
		getSelectTemplate( subsumption, namespace, 'Minimum', 'rangeMin' ),
		getSelectTemplate( subsumption, namespace, 'Maximum', 'rangeMax' ),
		[
			'core/paragraph',
			{
				content: 'Please select a valid range.',
				className: 'error-state-message',
			},
		],
	];
};
