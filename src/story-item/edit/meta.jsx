/**
 * WordPress Dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import { useEntityRecords } from '@wordpress/core-data';

function Meta({ enabled, attributes, setAttributes }) {
	if (!enabled) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const { date, label, metaTaxonomy } = attributes;

	const { records: entityTerms, isResolving } = useEntityRecords(
		'taxonomy',
		metaTaxonomy,
		{ per_page: -1, hide_empty: false, context: 'view' },
	);

	useEffect(() => {
		console.log('isResolving', isResolving, entityTerms);
		if (entityTerms && entityTerms.length) {
			console.log('Terms!', entityTerms);
		}
	}, [entityTerms, isResolving]);

	const cleanedLabel =
		undefined !== label ? cleanForSlug(label.toLowerCase()) : 'report';

	const value = 'short-read' === cleanedLabel ? 'fact-tank' : cleanedLabel;

	return (
		<div
			className="meta"
			style={{
				display: 'flex',
				alignItems: 'center',
				fontFamily: 'var(--wp--preset--font-family--sans-serif)',
			}}
		>
			<div>
				<SelectControl
					disabled={isResolving}
					value={value}
					options={
						entityTerms
							? entityTerms.map((term) => ({
									label: term.name,
									value: term.slug,
							  }))
							: []
					}
					onChange={(l) => {
						setAttributes({ label: l });
					}}
					style={{ marginBottom: '0px' }}
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
				/>
			</div>
		</div>
	);
}

export default Meta;
