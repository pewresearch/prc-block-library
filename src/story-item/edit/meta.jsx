/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';

function Meta({ enabled, date, label, setAttributes, termOptions }) {
	if (!enabled) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const cleanedLabel =
		undefined !== label ? cleanForSlug(label.toLowerCase()) : 'report';

	const value = 'short-read' === cleanedLabel ? 'fact-tank' : cleanedLabel;

	return (
		<div className="meta" style={{ display: 'flex', alignItems: 'center' }}>
			<div>
				<SelectControl
					value={value}
					options={termOptions}
					onChange={(l) => {
						setAttributes({ label: l });
					}}
					style={{ marginBottom: '0px' }}
					className="story-label-select"
				/>
			</div>
			<div>&nbsp;|&nbsp;</div>
			<div>
				<TextControl
					value={date}
					onChange={(d) => {
						setAttributes({ date: d });
					}}
					style={{ marginBottom: '0px' }}
					className="story-label-select"
				/>
			</div>
		</div>
	);
}

export default Meta;
