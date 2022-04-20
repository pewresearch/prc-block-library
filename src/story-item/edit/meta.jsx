/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';

function Meta({ enabled, date, label, setAttributes, termOptions }) {
	if (!enabled) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	console.log('<Meta>', label, termOptions);

	return (
		<div className="meta" style={{ display: 'flex', alignItems: 'center' }}>
			<div>
				<SelectControl
					value={label.toLowerCase()}
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
