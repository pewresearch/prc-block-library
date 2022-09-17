/**
 * WordPress Dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import { SelectControl, Spinner, TextControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import { useEntityRecords } from '@wordpress/core-data';

function Meta({ attributes, setAttributes }) {
	const { date, label, enableMeta, metaTaxonomy } = attributes;

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
