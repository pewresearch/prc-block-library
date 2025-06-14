/**
 * External Dependencies
 */
import { processToolRequest, CandidatesButton } from '@prc/copilot';

/**
 * Internal Dependencies
 */
import { convertTableToMarkdown, convertMarkdownToTable } from './index';

/**
 * Generate a table from a request.
 *
 * @param promptForData          - The prompt for the data to generate a table from.
 * @param additionalInstructions - The additional instructions to generate a table from.
 * @param tool                   - The tool to generate a table from.
 * @param model                  - The model to generate a table from.
 * @return The table for the request.
 */
export async function aiGenerateTableData(
	promptForData = '',
	additionalInstructions = ''
) {
	let prompt = '';
	if (promptForData) {
		prompt = `Prompt for data: ${promptForData}`;
		if (additionalInstructions) {
			prompt += `\n\nAdditional Instructions: ${additionalInstructions}`;
		}
	}
	const result = await processToolRequest(
		prompt,
		'get-table-data',
		'gemini-2.0-flash-thinking-exp'
	);

	if (!result) {
		return {
			data: [],
			metadata: {},
		};
	}

	const { candidates, metadata } = result;

	console.log('_PREAUDIT_', candidates);

	const { helpers } = window.aiServices.ai;

	const data = helpers
		.getTextFromContents(candidates)
		.replaceAll('\n\n\n\n', '\n\n');

	const table = convertMarkdownToTable(data);

	// if table null and data not empty, if its a string throw an error
	if (!table && data) {
		throw new Error(data);
	}

	console.log('aiGenerateTableData', data, table);

	return {
		data: table,
		metadata,
	};
}

/**
 * Generate a title for the table.
 *
 * @param attributes - The attributes of the table.
 * @return The title for the table.
 */
export async function aiGenerateTableTitles(
	attributes = {
		body: [],
		head: [],
		foot: [],
		metadata: {
			name: '',
		},
		caption: '',
	}
) {
	const table = {
		body: attributes.body,
		head: attributes.head,
		foot: attributes.foot,
	};
	const tableString = convertTableToMarkdown(table);

	let prompt = '';
	if (
		attributes?.metadata &&
		attributes?.metadata?.name &&
		attributes?.metadata?.name.length > 0
	) {
		prompt = `The table is named ${attributes?.metadata?.name}. Use this to help when generating the title. This is the markdown table: ${tableString}`;
	} else {
		prompt = ` ${tableString}`;
	}
	if (attributes?.caption && attributes?.caption.length > 0) {
		prompt += `\n\nUse the caption for this table as additional context in creating the title: ${attributes?.caption}`;
	}

	const { helpers } = window.aiServices.ai;

	const { candidates, metadata } = await processToolRequest(
		prompt,
		'get-table-title'
	);

	const title = helpers
		.getTextFromContents(candidates)
		.replaceAll('\n\n\n\n', '\n\n');

	const titleOptions =
		title
			.match(/```(?:json)?\n([\s\S]*?)\n```/)?.[1]
			.trim()
			?.replace(/\n\s*/g, '') || '[]';

	let parsedTitles = JSON.parse(titleOptions);
	if (parsedTitles.length === 0) {
		parsedTitles = [];
	}

	return {
		data: parsedTitles,
		metadata,
	};
}

/**
 * Generate a caption for the table.
 *
 * @param attributes - The attributes of the table.
 * @return The caption for the table.
 */
export async function aiGenerateTableCaptions(
	attributes = {
		body: [],
		head: [],
		foot: [],
		metadata: {
			name: '',
		},
	}
) {
	const table = {
		body: attributes.body,
		head: attributes.head,
		foot: attributes.foot,
	};
	let prompt = '';
	if (
		attributes?.metadata &&
		attributes?.metadata?.name &&
		attributes?.metadata?.name.length > 0
	) {
		prompt = `This table is named ${attributes?.metadata?.name}. Use this to help generate the caption. This is the data in markdown table format: ${convertTableToMarkdown(table)}`;
	} else {
		prompt = ` ${convertTableToMarkdown(table)}`;
	}
	const { candidates, metadata } = await processToolRequest(
		prompt,
		'get-table-caption'
	);
	console.log('aiGenerateTableCaptions processToolRequest...', candidates);

	const { helpers } = window.aiServices.ai;
	const caption = helpers
		.getTextFromContents(candidates)
		.replaceAll('\n\n\n\n', '\n\n');

	const captionOptions =
		caption
			.match(/```(?:json)?\n([\s\S]*?)\n```/)?.[1]
			.trim()
			?.replace(/\n\s*/g, '') || '[]';

	const parsedCaptions = JSON.parse(captionOptions);
	return {
		data: parsedCaptions,
		metadata,
	};
}

/**
 * Generate a table title button.
 *
 * @param attributes.attributes
 * @param attributes               - The attributes of the table.
 * @param setAttributes            - The function to set the attributes of the table.
 * @param attributes.setAttributes
 * @return The table title button.
 */
export function GenerateTableTitleButton({ attributes, setAttributes }) {
	return (
		<CandidatesButton
			{...{
				label: 'Generate Table Title With ✨ AI',
				doRequest: async () => {
					try {
						const { data, metadata } =
							await aiGenerateTableTitles(attributes);
						return {
							data,
							metadata,
						};
					} catch (error) {
						console.error(error);
					}
				},
				onSelect: (selectedCandidate, metadata) => {
					const meta =
						typeof attributes?.metadata === 'object' &&
						attributes?.metadata !== null
							? attributes.metadata
							: {};
					const copilot = Array.isArray(meta._copilot)
						? meta._copilot
						: [];
					setAttributes({
						tableTitle: selectedCandidate,
						metadata: {
							...meta,
							_copilot: [
								...copilot,
								{
									feature: 'get-table-title',
									...metadata,
								},
							],
						},
					});
				},
			}}
		/>
	);
}

/**
 * Generate a table caption button.
 *
 * @param attributes.attributes
 * @param attributes               - The attributes of the table.
 * @param setAttributes            - The function to set the attributes of the table.
 * @param attributes.setAttributes
 * @return The table caption button.
 */
export function GenerateTableCaptionButton({ attributes, setAttributes }) {
	return (
		<CandidatesButton
			{...{
				label: 'Generate Table Caption With ✨ AI',
				doRequest: async () => {
					try {
						const { data, metadata } =
							await aiGenerateTableCaptions(attributes);
						return {
							data,
							metadata,
						};
					} catch (error) {
						console.error(error);
					}
				},
				onSelect: (selectedCandidate, metadata) => {
					const meta =
						typeof attributes?.metadata === 'object' &&
						attributes?.metadata !== null
							? attributes.metadata
							: {};
					const copilot = Array.isArray(meta._copilot)
						? meta._copilot
						: [];
					setAttributes({
						caption: selectedCandidate,
						metadata: {
							...meta,
							_copilot: [
								...copilot,
								{
									feature: 'get-table-caption',
									...metadata,
								},
							],
						},
					});
				},
			}}
		/>
	);
}
