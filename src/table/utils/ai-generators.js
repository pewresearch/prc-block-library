/* eslint-disable max-lines */
/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';
import {
	title as titleIcon,
	caption as captionIcon,
	blockTable as blockTableIcon,
} from '@wordpress/icons';
import TurndownService from 'turndown';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { select, useDispatch } from '@wordpress/data';
import {
	Button,
	Modal,
	ToolbarButton,
	ToolbarDropdownMenu,
	TextareaControl,
} from '@wordpress/components';
import { store as noticeStore } from '@wordpress/notices';
import { useState, useCallback, useMemo } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import AILoadingAnimation from '../components/ai-loading';

function createVirtualTable(tableAttributes) {
	let html = '<table>';

	// Helper to render a section (head, body, foot)
	const renderSection = (sectionName) => {
		const rows = tableAttributes[sectionName];
		if (!rows || rows.length === 0) return '';
		const tag =
			// eslint-disable-next-line no-nested-ternary
			sectionName === 'head'
				? 'thead'
				: sectionName === 'body'
					? 'tbody'
					: 'tfoot';
		return `<${tag}>${rows
			.map(
				(row) =>
					`<tr>${row.cells
						.filter((cell) => !cell.isHidden)
						.map(
							(cell) =>
								`<${cell.tag}>${cell.content}</${cell.tag}>`
						)
						.join('')}</tr>`
			)
			.join('')}</${tag}>`;
	};

	html += renderSection('head');
	html += renderSection('body');
	html += renderSection('foot');
	html += '</table>';
	return html;
}

/**
 * Convert the table to markdown.
 *
 * @param tableAttributes - The table attributes to convert.
 * @return The markdown representation of the table.
 */
function convertTableToMarkdown(tableAttributes) {
	const html = createVirtualTable(tableAttributes);
	const turndownService = new TurndownService();
	const markdown = turndownService.turndown(html);
	return markdown;
}

function convertMarkdownToTable(markdown) {
	// Split the content into lines
	const lines = markdown.split('\n');

	// Variables to store text before and after the table
	const preTableText = [];
	const postTableText = [];
	let tableLines = [];
	let isInTable = false;
	let tableEnded = false;

	// Process each line to separate table and text
	for (const line of lines) {
		// Detect table start by looking for a line with | characters
		if (!isInTable && line.includes('|') && line.trim().startsWith('|')) {
			isInTable = true;
			tableLines.push(line);
			continue;
		}

		// If we're in the table and find a line without |, table has ended
		if (
			isInTable &&
			(!line.includes('|') || !line.trim().startsWith('|'))
		) {
			isInTable = false;
			tableEnded = true;
		}

		// Add lines to appropriate arrays
		if (isInTable) {
			tableLines.push(line);
		} else if (!tableEnded) {
			if (line.trim()) preTableText.push(line);
		} else if (line.trim()) postTableText.push(line);
	}

	// Filter out empty lines from the table
	tableLines = tableLines.filter((line) => line.trim());

	if (tableLines.length < 3) {
		return null; // Not enough lines for a valid table
	}

	// Parse header row
	const headerCells = tableLines[0]
		.split('|')
		.filter((cell) => cell.trim())
		.map((cell) => ({
			content: cell.trim(),
			tag: 'th',
			isHidden: false,
		}));

	// Skip separator row (line with dashes)

	// Parse body rows
	const bodyRows = tableLines.slice(2).map((line) => ({
		cells: line
			.split('|')
			.filter((cell) => cell.trim())
			.map((cell) => ({
				content: cell.trim(),
				tag: 'td',
				isHidden: false,
			})),
	}));

	// Combine pre and post text
	const textContent = {
		before: preTableText.join('\n').trim(),
		after: postTableText.join('\n').trim(),
	};

	return {
		data: {
			head: [
				{
					cells: headerCells,
				},
			],
			body: bodyRows,
			foot: [], // No footer in this markdown table
		},
		text: textContent,
	};
}

async function aiMetadata(
	modelVersion,
	usageMetadata,
	citationMetadata,
	prompt
) {
	// Get the current user id
	const currentUser = wp.data.select('core').getCurrentUser();
	const currentUserId = currentUser?.id;

	// Get the current timestamp
	const currentTimestamp = new Date().toISOString();

	return {
		userId: currentUserId,
		timestamp: currentTimestamp,
		modelVersion,
		usageMetadata,
		citationMetadata,
		prompt,
	};
}

/**
 * Generate a title for the table.
 *
 * @param attributes - The attributes of the table.
 * @return The title for the table.
 */
async function aiGenerateTitle(
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
	const { isServiceAvailable, getAvailableService } =
		select('ai-services/ai');
	if (isServiceAvailable('google')) {
		const service = getAvailableService('google');
		const table = {
			body: attributes.body,
			head: attributes.head,
			foot: attributes.foot,
		};
		try {
			let prompt = '';
			if (
				attributes?.metadata &&
				attributes?.metadata?.name &&
				attributes?.metadata?.name.length > 0
			) {
				prompt = `The table is named ${attributes?.metadata?.name}. Use this to help when generating the title. This is the markdown table: ${convertTableToMarkdown(table)}`;
			} else {
				prompt = ` ${convertTableToMarkdown(table)}`;
			}
			if (attributes?.caption && attributes?.caption.length > 0) {
				prompt += `\n\nUse the caption for this table as additional context in creating the title: ${attributes?.caption}`;
			}
			console.log('prompt ==', prompt);
			const candidates = await service.generateText(prompt, {
				feature: 'get-table-title',
			});

			const { helpers } = window.aiServices.ai;

			if (candidates.length === 0) {
				console.log('No candidates found for get-table-title');
				return null;
			}

			const { modelVersion, usageMetadata, citationMetadata } =
				candidates[0];

			const metadata = await aiMetadata(
				modelVersion,
				usageMetadata,
				citationMetadata,
				prompt
			);

			const _candidates = helpers.getCandidateContents(candidates);

			const title = helpers
				.getTextFromContents(_candidates)
				.replaceAll('\n\n\n\n', '\n\n');

			const titleOptions =
				title
					.match(/```(?:json)?\n([\s\S]*?)\n```/)?.[1]
					.trim()
					?.replace(/\n\s*/g, '') || '[]';

			const parsedTitles = JSON.parse(titleOptions);
			return {
				titles: parsedTitles,
				metadata,
			};
		} catch (error) {
			console.error(error);
		}
	}
}

/**
 * Generate a caption for the table.
 *
 * @param table      - The table to generate a caption for.
 * @param attributes - The attributes of the table.
 * @return The caption for the table.
 */
async function aiGenerateCaptions(
	attributes = {
		body: [],
		head: [],
		foot: [],
		metadata: {
			name: '',
		},
	}
) {
	const { isServiceAvailable, getAvailableService } =
		select('ai-services/ai');
	if (isServiceAvailable('google')) {
		const service = getAvailableService('google');
		const table = {
			body: attributes.body,
			head: attributes.head,
			foot: attributes.foot,
		};
		try {
			let prompt = '';
			if (
				attributes?.metadata &&
				attributes?.metadata?.name &&
				attributes?.metadata?.name.length > 0
			) {
				prompt = `The table is named ${attributes?.metadata?.name}. Use this to help when generating the caption. This is the markdown table: ${convertTableToMarkdown(table)}`;
			} else {
				prompt = ` ${convertTableToMarkdown(table)}`;
			}
			const candidates = await service.generateText(prompt, {
				feature: 'get-table-caption',
			});

			const { helpers } = window.aiServices.ai;

			if (candidates.length === 0) {
				return null;
			}

			const { modelVersion, usageMetadata, citationMetadata } =
				candidates[0];

			const metadata = await aiMetadata(
				modelVersion,
				usageMetadata,
				citationMetadata,
				prompt
			);
			const _candidates = helpers.getCandidateContents(candidates);

			const caption = helpers
				.getTextFromContents(_candidates)
				.replaceAll('\n\n\n\n', '\n\n');

			const captionOptions =
				caption
					.match(/```(?:json)?\n([\s\S]*?)\n```/)?.[1]
					.trim()
					?.replace(/\n\s*/g, '') || '[]';

			const parsedCaptions = JSON.parse(captionOptions);
			return {
				captions: parsedCaptions,
				metadata,
			};
		} catch (error) {
			console.error(error);
		}
	}
}

async function aiDecipherTableFromImage(imageUrl) {
	const { isServiceAvailable, getAvailableService } =
		select('ai-services/ai');
	if (isServiceAvailable('google')) {
		const service = getAvailableService('google');
	}
	const prompt = `Conver the image to a markdown table. ${imageUrl}`;
}

function CandidatesModal({
	title = 'Table Caption Candidates',
	candidates = [],
	isOpen = false,
	onClose = () => {},
	onSelect = () => {},
	onClear = () => {},
}) {
	if (!isOpen) return null;
	const titleIcon = (
		<Icon
			icon="sparkles"
			library="solid"
			size="1"
			style={{ marginRight: '0.5em' }}
		/>
	);
	const wandIcon = <Icon icon="wand-magic-sparkles" size="1" />;
	return (
		<Modal
			title={title}
			icon={titleIcon}
			onRequestClose={onClose}
			size="medium"
		>
			<div>
				{candidates.length === 0 ? (
					<AILoadingAnimation />
				) : (
					<>
						<div>
							<h3>
								Choose from the following AI generated options:
							</h3>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
							}}
						>
							{candidates.map((candidate, index) => (
								<Button
									key={`candidate-${index}`}
									variant="secondary"
									onClick={() => onSelect(candidate)}
									icon={wandIcon}
									iconSize={1}
									style={{
										height: 'max-content',
										whiteSpace: 'normal',
										textAlign: 'left',
										gap: '1em',
									}}
								>
									{candidate}
								</Button>
							))}
						</div>
						<p style={{ fontSize: '0.8em', color: 'darkgray' }}>
							* This block will have metadata added to identify
							the option was generated with AI assistance, the
							user who requested it, and the number of tokens
							used.
						</p>
						<Button
							onClick={onClear}
							icon={<Icon icon="arrows-rotate" />}
							iconSize={1}
						>
							Reset
						</Button>
					</>
				)}
			</div>
		</Modal>
	);
}

/**
 * Generate a caption for the table.
 *
 * @param table        - The table to generate a caption for.
 * @param attributes   - The attributes of the table.
 * @param request
 * @param instructions
 * @param tool
 * @return The caption for the table.
 */
async function aiDoRequest(
	request = '',
	instructions = '',
	tool = 'get-table-data'
) {
	const { isServiceAvailable, getAvailableService } =
		select('ai-services/ai');
	if (isServiceAvailable('google')) {
		const service = getAvailableService('google');
		try {
			let prompt = '';
			if (request) {
				prompt = `Request: ${request}\Additional Instructions: ${instructions}`;
			}
			const candidates = await service.generateText(prompt, {
				feature: tool,
				model: 'gemini-2.0-flash-thinking-exp',
			});

			if (candidates.length === 0) {
				return null;
			}

			console.log('candidates ==', candidates[0]);

			const { modelVersion, usageMetadata, citationMetadata } =
				candidates[0];

			const { helpers } = window.aiServices.ai;

			const _candidates = helpers.getCandidateContents(candidates);

			const data = helpers
				.getTextFromContents(_candidates)
				.replaceAll('\n\n\n\n', '\n\n');

			const table = convertMarkdownToTable(data);

			const metadata = await aiMetadata(
				modelVersion,
				usageMetadata,
				citationMetadata,
				request
			);

			return {
				table,
				metadata,
			};
		} catch (error) {
			console.error(error);
		}
	}
}

function RequestModal({
	title = 'Table Request',
	description = '',
	tool = 'get-table-data',
	attributes = {},
	isOpen = false,
	onClose = () => {},
	onSelect = () => {},
	onClear = () => {},
}) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { metadata } = attributes;
	const matchingRequest = useMemo(() => {
		return (
			metadata?._copilot?.find((copilot) => copilot.feature === tool) ||
			{}
		);
	}, [metadata, tool]);
	const [request, setRequest] = useState(matchingRequest?.prompt || '');
	const [instructions, setInstructions] = useState(
		matchingRequest?.instructions || ''
	);

	const doRequest = useCallback(() => {
		setIsGenerating(true);
		aiDoRequest(request, instructions, tool)
			.then((d) => {
				if (!d) return;
				const { table, metadata } = d;
				console.log('aiDoRequest ==', table, metadata);
				if (!table) return;
				const { data, text } = table;
				const { before, after } = text;
				onSelect({
					...data,
					sourceNote: after,
					caption: before,
					metadata: {
						...attributes.metadata,
						_copilot: [
							{
								feature: tool,
								...metadata,
							},
						],
					},
				});
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsGenerating(false);
			});
	}, [request, instructions, tool, metadata]);

	const modalIcon = <Icon icon="sparkles" library="solid" size="1" />;

	if (!isOpen) return null;

	return (
		<Modal
			title={title}
			icon={modalIcon}
			onRequestClose={onClose}
			size="medium"
		>
			<div>
				{isGenerating ? (
					<AILoadingAnimation />
				) : (
					<>
						<TextareaControl
							label="Request"
							value={request}
							onChange={(value) => setRequest(value)}
							help={description}
						/>
						{/* <TextareaControl
							label="Instructions"
							value={instructions}
							onChange={(value) => setInstructions(value)}
						/> */}
						<p style={{ fontSize: '0.8em', color: 'darkgray' }}>
							* This block will have metadata added to identify
							the option was generated with AI assistance, the
							user who requested it, and the number of tokens
							used.
						</p>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1em',
							}}
						>
							<Button
								onClick={doRequest}
								isBusy={isGenerating}
								variant="primary"
								icon={modalIcon}
								iconSize={1}
							>
								Generate
							</Button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}

/**
 * Generate a caption for the table.
 * @param attributes.attributes
 * @param attributes                        - The attributes of the table.
 * @param setAttributes                     - The function to set the attributes of the table.
 * @param asToolbarButton                   - Whether to render the button as a toolbar button.
 * @param attributes.setAttributes
 * @param attributes.asToolbarButton
 * @param attributes.isGeneratingCaption
 * @param attributes.setIsGeneratingCaption
 * @return The caption for the table.
 */
export function GenerateCaptionButton({
	attributes,
	setAttributes,
	asToolbarButton = false,
	isGeneratingCaption = false,
	setIsGeneratingCaption = () => {},
}) {
	const [processing, setProcessing] = useState(false);
	const [generatedCaptions, setGeneratedCaptions] = useState([]);
	const [generatedMetadata, setGeneratedMetadata] = useState([]);
	const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);

	const doGeneration = useCallback(() => {
		setProcessing(true);
		setIsGeneratingCaption(true);
		aiGenerateCaptions(attributes)
			.then((d) => {
				if (undefined !== d && null !== d) {
					const { captions, metadata } = d;
					if (captions.length > 0) {
						setGeneratedCaptions(captions);
						setGeneratedMetadata(metadata);
						setIsCandidatesModalOpen(true);
					}
					setProcessing(false);
					setIsGeneratingCaption(false);
				} else {
					setProcessing(false);
				}
			})
			.catch((error) => {
				console.error(error);
				setProcessing(false);
			});
	}, [attributes, setAttributes, setIsGeneratingCaption]);

	const buttonIcon = <Icon icon="sparkles" library="solid" size="1" />;

	return (
		<>
			{asToolbarButton ? (
				<ToolbarButton
					onClick={doGeneration}
					icon={buttonIcon}
					iconSize={1}
					isPressed={processing || isCandidatesModalOpen}
					isBusy={processing}
					label={__(
						'Generate caption with ✨ AI',
						'prc-block-library'
					)}
				/>
			) : (
				<Button
					onClick={doGeneration}
					disabled={processing}
					isBusy={processing}
					isPressed={processing}
					variant="tertiary"
					icon={buttonIcon}
					iconSize={1}
					label={__(
						'Generate caption with ✨ AI',
						'prc-block-library'
					)}
					showTooltip={true}
				/>
			)}
			<CandidatesModal
				title="Table Caption Candidates"
				candidates={generatedCaptions}
				isOpen={isCandidatesModalOpen}
				onClose={() => setIsCandidatesModalOpen(false)}
				onSelect={(caption) => {
					setAttributes({
						caption,
						metadata: {
							_copilot: {
								feature: 'get-table-caption',
								...generatedMetadata,
							},
						},
					});
					setIsCandidatesModalOpen(false);
				}}
			/>
		</>
	);
}

/**
 * Generate a caption for the table.
 * @param attributes.attributes
 * @param attributes                      - The attributes of the table.
 * @param setAttributes                   - The function to set the attributes of the table.
 * @param asToolbarButton                 - Whether to render the button as a toolbar button.
 * @param attributes.setAttributes
 * @param attributes.asToolbarButton
 * @param attributes.isGeneratingTitle
 * @param attributes.setIsGeneratingTitle
 * @return The title for the table.
 */
export function GenerateTitleButton({
	attributes,
	setAttributes,
	asToolbarButton = false,
	isGeneratingTitle = false,
	setIsGeneratingTitle = () => {},
}) {
	const [processing, setProcessing] = useState(false);
	const [generatedTitles, setGeneratedTitles] = useState([]);
	const [generatedMetadata, setGeneratedMetadata] = useState([]);
	const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);

	const doGeneration = useCallback(() => {
		console.log('doGeneration ==', attributes);
		setProcessing(true);
		setIsGeneratingTitle(true);
		aiGenerateTitle(attributes)
			.then((d) => {
				if (undefined !== d && null !== d) {
					const { titles, metadata } = d;
					if (titles.length > 0) {
						setGeneratedTitles(titles);
						setGeneratedMetadata(metadata);
						setIsCandidatesModalOpen(true);
					}
					setProcessing(false);
					setIsGeneratingTitle(false);
				} else {
					setProcessing(false);
				}
			})
			.catch((error) => {
				console.error(error);
				setProcessing(false);
			});
	}, [attributes, setAttributes, setIsGeneratingTitle]);

	const buttonIcon = <Icon icon="sparkles" library="solid" size="1" />;

	return (
		<>
			{asToolbarButton ? (
				<ToolbarButton
					onClick={doGeneration}
					icon={buttonIcon}
					iconSize={1}
					isPressed={processing || isCandidatesModalOpen}
					isBusy={processing}
					label={__('Generate title with ✨ AI', 'prc-block-library')}
				/>
			) : (
				<Button
					onClick={doGeneration}
					disabled={processing}
					isBusy={processing}
					isPressed={processing}
					variant="tertiary"
					icon={buttonIcon}
					iconSize={1}
					label={__('Generate title with ✨ AI', 'prc-block-library')}
					showTooltip={true}
				/>
			)}
			<CandidatesModal
				title="Table Title Candidates"
				candidates={generatedTitles}
				isOpen={isCandidatesModalOpen}
				onClose={() => setIsCandidatesModalOpen(false)}
				onSelect={(newTitle) => {
					setAttributes({
						tableTitle: newTitle,
						metadata: {
							_copilot: [
								{
									feature: 'get-table-title',
									...generatedMetadata,
								},
							],
						},
					});
					setIsCandidatesModalOpen(false);
				}}
			/>
		</>
	);
}

export function GenerateAiToolbarControls({
	attributes,
	setAttributes,
	setIsGeneratingTitle = () => {},
	setIsGeneratingCaption = () => {},
}) {
	const [activeTool, setActiveTool] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [generatedTitles, setGeneratedTitles] = useState([]);
	const [generatedCaptions, setGeneratedCaptions] = useState([]);
	const [generatedMetadata, setGeneratedMetadata] = useState([]);
	const [isCandidatesModalOpen, setIsCandidatesModalOpen] = useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const { createSuccessNotice, createErrorNotice } = useDispatch(noticeStore);

	const doTitleGeneration = useCallback(() => {
		console.log('doTitleGeneration ==', attributes);
		setProcessing(true);
		setActiveTool('get-table-title');
		setIsGeneratingTitle(true);
		setIsCandidatesModalOpen(true);
		aiGenerateTitle(attributes)
			.then((d) => {
				console.log('aiGenerateTitle ==', d);
				if (undefined !== d && null !== d) {
					const { titles, metadata } = d;
					if (titles.length > 0) {
						console.log('titles ==', titles);
						setGeneratedTitles(titles);
						console.log('metadata ==', metadata);
						setGeneratedMetadata(metadata);
					}
					setProcessing(false);
					setIsGeneratingTitle(false);
				} else {
					setProcessing(false);
				}
			})
			.catch((error) => {
				console.error(error);
				if (error.message.includes('The model is overloaded')) {
					createErrorNotice(
						'The model is overloaded. Please try again later.'
					);
				}
				setProcessing(false);
			});
	}, [attributes, setAttributes, setIsGeneratingTitle]);

	const doCaptionGeneration = useCallback(() => {
		console.log('doCaptionGeneration ==', attributes);
		setProcessing(true);
		setActiveTool('get-table-caption');
		setIsGeneratingCaption(true);
		setIsCandidatesModalOpen(true);
		aiGenerateCaptions(attributes)
			.then((d) => {
				console.log('aiGenerateCaptions ==', d);
				if (undefined !== d && null !== d) {
					const { captions, metadata } = d;
					if (captions.length > 0) {
						setGeneratedCaptions(captions);
						setGeneratedMetadata(metadata);
					}
					setProcessing(false);
					setIsGeneratingCaption(false);
				} else {
					setProcessing(false);
				}
			})
			.catch((error) => {
				if (error.message.includes('The model is overloaded')) {
					createErrorNotice(
						'The model is overloaded. Please try again later.'
					);
				}
				setProcessing(false);
			});
	}, [attributes, setAttributes, setIsGeneratingCaption]);

	const TableAIGenerateControls = [
		{
			title: __('Generate title', 'prc-block-library'),
			onClick: () => doTitleGeneration(),
			icon: titleIcon,
		},
		{
			title: __('Generate caption', 'prc-block-library'),
			onClick: () => doCaptionGeneration(),
			icon: captionIcon,
		},
		{
			title: __('Generate table', 'prc-block-library'),
			onClick: () => setIsRequestModalOpen(true),
			icon: blockTableIcon,
		},
	];

	const modalTitle = useMemo(() => {
		return activeTool === 'get-table-title'
			? __('Table Title Candidates', 'prc-block-library')
			: __('Table Caption Candidates', 'prc-block-library');
	}, [activeTool]);

	const onSelect = useCallback(
		(newData) => {
			const newAttributes = {
				metadata: {
					...attributes.metadata,
					_copilot: [
						{
							feature: activeTool,
							...generatedMetadata,
						},
					],
				},
			};
			if (activeTool === 'get-table-title') {
				newAttributes.tableTitle = newData;
			} else {
				newAttributes.caption = newData;
			}
			setAttributes(newAttributes);
			setIsCandidatesModalOpen(false);
			createSuccessNotice(
				`✨ PRC Copilot generated: "${activeTool}" ✨`,
				{
					type: 'snackbar',
				}
			);
		},
		[attributes, setAttributes, activeTool]
	);

	const onClear = useCallback(() => {
		setActiveTool(null);
		setGeneratedTitles([]);
		setGeneratedCaptions([]);
		setGeneratedMetadata([]);
		setIsCandidatesModalOpen(false);
	}, [
		setActiveTool,
		setGeneratedTitles,
		setGeneratedCaptions,
		setGeneratedMetadata,
		setIsCandidatesModalOpen,
	]);

	const onSetTableData = useCallback(
		(newData) => {
			setAttributes({
				...newData,
			});
			setIsRequestModalOpen(false);
		},
		[setAttributes]
	);

	const candidates = useMemo(() => {
		return activeTool === 'get-table-title'
			? generatedTitles
			: generatedCaptions;
	}, [activeTool, generatedTitles, generatedCaptions]);

	const icon = () => <Icon icon="sparkles" size="1" />;

	return (
		<>
			<ToolbarDropdownMenu
				id="table-ai-generate-dropdown"
				label={__('AI generate', 'prc-block-library')}
				icon={icon}
				controls={TableAIGenerateControls}
				isPressed={processing}
			/>
			<CandidatesModal
				title={modalTitle}
				candidates={candidates}
				isOpen={isCandidatesModalOpen}
				onClose={() => setIsCandidatesModalOpen(false)}
				onClear={onClear}
				onSelect={onSelect}
			/>
			<RequestModal
				title="Table Request"
				description="Request a table from the AI"
				tool="get-table-data"
				isOpen={isRequestModalOpen}
				onClose={() => setIsRequestModalOpen(false)}
				onSelect={onSetTableData}
			/>
		</>
	);
}
