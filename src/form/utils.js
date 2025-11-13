/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';

export function useFormInputBlockDetector(clientId) {
	const foundBlocks = useSelect((select) => {
		const { getBlock, getBlockRootClientId } = select('core/block-editor');
		const block = getBlock(clientId);
		if (!block) {
			return [];
		}
		const innerBlocks = block?.innerBlocks;
		const formFields = [];

		// Search function.
		const findFormFields = (blocks, parentClientId) => {
			blocks.forEach((block) => {
				if (block?.name.startsWith('prc-block/form-')) {
					// Check if the name is form-field, if so, ignore.
					if (!['prc-block/form-field', 'prc-block/form-page', 'prc-block/form-message', 'prc-block/form-submit', 'prc-block/form-captcha'].includes(block.name)) {
						if (parentClientId) {
							// Find the parent in the formFields array to add as a subField.
							const parentField = formFields.find(
								(field) => field.blockId === parentClientId
							);
							if (parentField) {
								parentField.subFields.push({
									blockId: block.clientId,
									label:
										block.attributes.label ||
										block.name,
									type: block.name,
									name: block.attributes?.metadata?.name || '',
									value: block.attributes?.value || '',
									subFields: [],
								});
							} else {
								// If parent not found, add as top-level field.
								formFields.push({
									blockId: block.clientId,
									label:
										block.attributes.label ||
										block.name,
									name: block.attributes?.metadata?.name || '',
									value: block.attributes?.value || '',
									type: block.name,
									subFields: [],
								});
							}
						} else {
							formFields.push({
								blockId: block.clientId,
								label:
									block.attributes.label ||
									block.name,
								type: block.name,
								name: block.attributes?.metadata?.name || '',
								value: block.attributes?.value || '',
								subFields: [],
							});
						}
					}
				}
				if (block?.innerBlocks) {
					const parentId = block.clientId;
					findFormFields(block.innerBlocks, parentId);
				}
			});
		};

		// Initialize the search.
		findFormFields(innerBlocks);

		return formFields;
	}, [clientId]);
	return foundBlocks;
}

export function useFormMessageBlockDetector(clientId) {
	const hasMessageBlock = useSelect((select) => {
		const { getBlock } = select('core/block-editor');
		const block = getBlock(clientId);
		const innerBlocks = block?.innerBlocks;
		let found = false;

		// Search function.
		const findMessageBlock = (blocks) => {
			blocks.forEach((block) => {
				if (block.name === 'prc-block/form-message') {
					found = true;
					return;
				}
				if (block.innerBlocks) {
					findMessageBlock(block.innerBlocks);
				}
			});
		};

		// Initialize the search.
		findMessageBlock(innerBlocks);

		return found;
	}, [clientId]);
	return hasMessageBlock;
}
