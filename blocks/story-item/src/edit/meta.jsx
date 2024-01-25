/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import {
	SelectControl,
	Spinner,
	DatePicker,
	Button,
	Popover,
} from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import { useEntityRecords } from '@wordpress/core-data';
import { date as formatDate } from '@wordpress/date';

/**
 * Internal Dependencies
 */

export default function Meta({ attributes, setAttributes }) {
	const { date, label, enableMeta, metaTaxonomy } = attributes;
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	// if date is undefined, set it to today by default
	if (undefined === date) {
		setAttributes({ date: formatDate('M j, Y', new Date()) });
	}

	const { records: entityTerms, isResolving } = useEntityRecords(
		'taxonomy',
		metaTaxonomy,
		{ per_page: 50, hide_empty: false, context: 'view' }
	);
	const hasRecords = entityTerms ? 0 < entityTerms.length : false;

	const value =
		undefined !== label ? cleanForSlug(label.toLowerCase()) : 'report';

	if (!enableMeta) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	return (
		<div
			className="meta"
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{'disabled' !== metaTaxonomy && (
				<div className='label'>
					{isResolving && <Spinner />}
					{!isResolving && hasRecords && (
						<SelectControl
							value={value}
							options={entityTerms.map((term) => ({
								label: term.name,
								value: term.slug,
							}))}
							onChange={(l) => {
								setAttributes({ label: l });
							}}
							style={{ marginBottom: '0px' }}
						/>
					)}
				</div>
			)}
			<div className="date">
				<Button
					variant="link"
					onClick={() => {
						setDatePickerVisible(!datePickerVisible);
					}}
					style={{ padding: '0px' }}
				>
					{formatDate('M j, Y', date)}
				</Button>
				{datePickerVisible && (
					<Popover
						position="bottom center"
						onClose={() => setDatePickerVisible(false)}
					>
						<div
							style={{
								padding: '1em',
							}}
						>
							<DatePicker
								currentDate={date}
								onChange={(d) =>
									setAttributes({
										date: formatDate('M j, Y', d),
									})
								}
							/>
						</div>
					</Popover>
				)}
			</div>
		</div>
	);
}
