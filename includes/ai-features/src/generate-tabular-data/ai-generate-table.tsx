/**
 * External Dependencies
 */
import {
	useAISuggest,
	AISuggestButton,
	AILoadingIndicator,
	AISuggestionPreview,
} from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import {
	Notice,
	TextareaControl,
	TextControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

declare global {
	interface Window {
		PRCTableAI: {
			enabled: boolean;
			abilityName: string;
		};
	}
}

interface AIGenerateTableProps {
	attributes: Record<string, unknown>;
	setAttributes: (attrs: Record<string, unknown>) => void;
	onClose?: () => void;
}

interface TableCell {
	content: string;
	tag: 'th' | 'td';
}

interface TableRow {
	cells: TableCell[];
}

/**
 * Parse a markdown table string into the head/body attribute structure
 * expected by the prc-block/table block.
 *
 * @param markdown The markdown table string.
 * @return Object with head and body arrays, or null if parsing fails.
 */
function parseMarkdownTable(
	markdown: string
): { head: TableRow[]; body: TableRow[] } | null {
	// Split into lines and filter out empty lines.
	const lines = markdown
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	if (lines.length < 2) {
		return null;
	}

	// Find the header separator line (contains only pipes, dashes, colons, spaces).
	const separatorIndex = lines.findIndex((line) => /^[\s|:-]+$/.test(line));

	if (separatorIndex < 1) {
		return null;
	}

	// Parse a single row line into cell content strings.
	const parseRow = (line: string): string[] => {
		// Remove leading/trailing pipes and split by pipe.
		const trimmed = line.replace(/^\|/, '').replace(/\|$/, '');
		return trimmed.split('|').map((cell) => cell.trim());
	};

	// Build head from lines before the separator.
	const headerLines = lines.slice(0, separatorIndex);
	const head: TableRow[] = headerLines.map((line) => ({
		cells: parseRow(line).map((content) => ({
			content,
			tag: 'th' as const,
		})),
	}));

	// Build body from lines after the separator.
	const bodyLines = lines.slice(separatorIndex + 1);
	const body: TableRow[] = bodyLines.map((line) => ({
		cells: parseRow(line).map((content) => ({
			content,
			tag: 'td' as const,
		})),
	}));

	if (head.length === 0 || body.length === 0) {
		return null;
	}

	return { head, body };
}

/**
 * AI Generate Table component.
 *
 * Calls the generate-tabular-data ability and allows users to apply
 * the generated markdown table data to the block's attributes.
 * Designed to be rendered inside a Modal.
 *
 * @param root0
 * @param root0.setAttributes
 * @param root0.onClose
 */
export default function AIGenerateTable({
	setAttributes,
	onClose,
}: AIGenerateTableProps) {
	const [dataDescription, setDataDescription] = useState('');
	const [fromYear, setFromYear] = useState('');
	const [toYear, setToYear] = useState('');
	const [parseError, setParseError] = useState<string | null>(null);

	const aiConfig = window.PRCTableAI;
	const abilityName = aiConfig?.abilityName || 'prc-ai/generate-tabular-data';

	const { isLoading, error, result, fetch, reset, dismissError } =
		useAISuggest<string>({
			abilityName,
			transformResult: (raw) => raw.table as string,
		});

	const handleFetch = useCallback(() => {
		setParseError(null);

		const input: Record<string, unknown> = {
			data_description: dataDescription,
		};

		if (fromYear) {
			input.from = parseInt(fromYear, 10);
		}
		if (toYear) {
			input.to = parseInt(toYear, 10);
		}

		fetch(input);
	}, [fetch, dataDescription, fromYear, toYear]);

	const applyResult = useCallback(() => {
		if (!result) {
			return;
		}

		const parsed = parseMarkdownTable(result);
		if (!parsed) {
			setParseError(
				'Could not parse the generated table. Try regenerating.'
			);
			return;
		}

		setAttributes({
			head: parsed.head,
			body: parsed.body,
		});
		reset();
		setDataDescription('');
		setFromYear('');
		setToYear('');
		onClose?.();
	}, [result, setAttributes, onClose, reset]);

	const handleDismiss = useCallback(() => {
		reset();
		onClose?.();
	}, [reset, onClose]);

	return (
		<div style={{ minWidth: '400px' }}>
			{!result && !isLoading && (
				<>
					<TextareaControl
						label={__('Data description', 'prc-block-library')}
						help={__(
							'Describe the data you want to generate as a table.',
							'prc-block-library'
						)}
						value={dataDescription}
						onChange={setDataDescription}
						rows={4}
					/>
					<HStack>
						<TextControl
							label={__('From year', 'prc-block-library')}
							type="number"
							value={fromYear}
							onChange={setFromYear}
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={__('To year', 'prc-block-library')}
							type="number"
							value={toYear}
							onChange={setToYear}
							__nextHasNoMarginBottom
						/>
					</HStack>
					<div style={{ marginTop: '12px' }}>
						<AISuggestButton
							onClick={handleFetch}
							isLoading={isLoading}
							disabled={dataDescription.trim().length === 0}
							fullWidth={false}
						/>
					</div>
				</>
			)}

			{isLoading && (
				<AILoadingIndicator
					message={__('Suggesting with AI…', 'prc-block-library')}
				/>
			)}

			{(error || parseError) && (
				<Notice
					status="warning"
					isDismissible
					onDismiss={() => {
						dismissError();
						setParseError(null);
					}}
				>
					{error || parseError}
				</Notice>
			)}

			{result && !isLoading && (
				<AISuggestionPreview
					headerLabel={__(
						'Suggested Table Preview',
						'prc-block-library'
					)}
					onApply={applyResult}
					onDismiss={handleDismiss}
					onRegenerate={handleFetch}
					regenerateLabel={__('Suggest again', 'prc-block-library')}
				>
					<pre
						style={{
							fontSize: '12px',
							lineHeight: '1.5',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							maxHeight: '300px',
							overflowY: 'auto',
							background: '#f0f0f0',
							padding: '12px',
							border: '1px solid #ddd',
							borderRadius: '2px',
							margin: 0,
						}}
					>
						{result}
					</pre>
				</AISuggestionPreview>
			)}
		</div>
	);
}
