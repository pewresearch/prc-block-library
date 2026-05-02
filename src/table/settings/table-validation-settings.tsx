/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	SelectControl,
	Notice,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '../block-attributes';
import type { ValidationSchema, ValidationError } from '../utils/validation';
import { validateTable, validateSchema } from '../utils/validation';

declare global {
	interface Window {
		prcTableValidationSchemas?: ValidationSchema[];
	}
}

const MAX_VISIBLE_ERRORS = 5;

type Props = {
	attributes: Pick<
		BlockAttributes,
		'columnMeta' | 'validationSchema' | 'head' | 'body' | 'foot'
	>;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
};

export default function TableValidationSettings({
	attributes,
	setAttributes,
}: Props) {
	const registeredSchemas: ValidationSchema[] =
		window.prcTableValidationSchemas ?? [];

	const schemaOptions = [
		{ label: __('None', 'prc-block-library'), value: '' },
		...registeredSchemas.map((s) => ({
			label: s.label,
			value: s.slug,
		})),
	];

	const activeSchema = registeredSchemas.find(
		(s) => s.slug === attributes.validationSchema
	);

	const result = useMemo(() => {
		if (activeSchema) {
			return validateSchema(attributes as BlockAttributes, activeSchema);
		}
		return validateTable(attributes as BlockAttributes);
	}, [
		attributes.columnMeta,
		attributes.validationSchema,
		attributes.head,
		attributes.body,
		attributes.foot,
	]);

	const visibleErrors: ValidationError[] = result.errors.slice(
		0,
		MAX_VISIBLE_ERRORS
	);
	const hiddenCount = result.errors.length - visibleErrors.length;

	return (
		<VStack spacing={3}>
			{registeredSchemas.length > 0 && (
				<SelectControl
					label={__('Validation schema', 'prc-block-library')}
					value={attributes.validationSchema ?? ''}
					options={schemaOptions}
					onChange={(value) =>
						setAttributes({ validationSchema: value })
					}
					help={__(
						'Apply a named schema to enforce required column types.',
						'prc-block-library'
					)}
				/>
			)}

			{result.valid ? (
				<Notice key="valid" status="success" isDismissible={false}>
					{__('All cell values are valid.', 'prc-block-library')}
				</Notice>
			) : (
				<Notice key="invalid" status="warning" isDismissible={false}>
					<VStack spacing={1}>
						{visibleErrors.map((err, i) => (
							<p key={i} style={{ margin: 0 }}>
								{err.section === 'schema'
									? err.message
									: sprintf(
											/* translators: 1: section name, 2: row index, 3: column index, 4: message */
											__(
												'%1$s row %2$d col %3$d: %4$s',
												'prc-block-library'
											),
											err.section,
											err.rowIndex + 1,
											err.vColIndex + 1,
											err.message
										)}
							</p>
						))}
						{hiddenCount > 0 && (
							<p style={{ margin: 0, fontStyle: 'italic' }}>
								{sprintf(
									/* translators: %d: number of additional errors */
									__(
										'…and %d more error(s).',
										'prc-block-library'
									),
									hiddenCount
								)}
							</p>
						)}
					</VStack>
				</Notice>
			)}
		</VStack>
	);
}
