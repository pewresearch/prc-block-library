/**
 * WordPress Dependencies
 */
import { ToolbarButton } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal Dependencies
 */
import { BlockAttributes } from '../block-attributes';
import { tableInvalidIcon, tableValidIcon } from '../icons';
import { validateTable } from '../utils/validation';

type Props = {
	attributes: BlockAttributes;
};

export default function TableValidationToolbar({ attributes }: Props) {
	const { createWarningNotice } = useDispatch(noticesStore);

	const validationResult = useMemo(
		() => validateTable(attributes),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[attributes.body, attributes.foot, attributes.columnMeta]
	);
	const isTableValid = validationResult.valid;
	const errorCount = validationResult.errors.length;

	return (
		<ToolbarButton
			icon={isTableValid ? tableValidIcon : tableInvalidIcon}
			label={
				isTableValid
					? __('Table data is valid', 'prc-block-library')
					: sprintf(
							/* translators: %d: number of validation errors */
							__(
								'%d validation error(s) — click for details',
								'prc-block-library'
							),
							errorCount
						)
			}
			onClick={() => {
				if (!isTableValid) {
					// @ts-ignore
					createWarningNotice(
						sprintf(
							/* translators: %d: number of validation errors */
							__(
								'Table has %d validation error(s). Check highlighted cells.',
								'prc-block-library'
							),
							errorCount
						),
						{ type: 'snackbar', id: 'prc-table-validation' }
					);
				}
			}}
		/>
	);
}
