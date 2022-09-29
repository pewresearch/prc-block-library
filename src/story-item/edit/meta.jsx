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

function Meta({ attributes, setAttributes }) {
	const { date, label, enableMeta, metaTaxonomy } = attributes;
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	if (!enableMeta) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const { records: entityTerms, isResolving } = useEntityRecords(
		'taxonomy',
		metaTaxonomy,
		{ per_page: -1, hide_empty: false, context: 'view' },
	);
	const hasRecords = entityTerms ? 0 < entityTerms.length : false;

	const cleanedLabel =
		undefined !== label ? cleanForSlug(label.toLowerCase()) : 'report';

	const value = 'short-read' === cleanedLabel ? 'fact-tank' : cleanedLabel;

	return (
		<div
			className="meta"
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{'disabled' !== metaTaxonomy && (
				<Fragment>
					<div>
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
					<div>&nbsp;|&nbsp;</div>
				</Fragment>
			)}
			<div>
				<Button
					variant="link"
					onClick={() => {
						setDatePickerVisible(!datePickerVisible);
					}}
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
									setAttributes({ date: formatDate('M j, Y', d) })
								}
							/>
						</div>
					</Popover>
				)}
			</div>
		</div>
	);
}

export default Meta;
