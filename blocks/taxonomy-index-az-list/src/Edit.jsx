/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { CheckboxControl, Spinner } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal Dependencies
 */
import { Controls, LetterControl, TaxonomyControl } from './Controls';
import Placeholder from './Placeholder';

const getTermsByLetter = (letter, taxonomy) => {
	console.log('getTermsByLetter fn...', letter, taxonomy);

	return new Promise((resolve) => {
		apiFetch({
			path: `/prc-api/v2/blocks/taxonomy-index-az-list/?letter=${letter}&taxonomy=${taxonomy}`,
		}).then((terms) => {
			const newTerms = terms.map((t) => ({
				name: t.name,
				term_id: t.term_id,
				excluded: false,
			}));
			resolve(newTerms);
		});
	});
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { letter, exclude, taxonomy } = attributes;
	const [terms, setTerms] = useState(false);

	const blockProps = useBlockProps();

	const loadTerms = () => {
		getTermsByLetter(letter, taxonomy).then((t) => {
			const tmpExclude =
				undefined !== exclude ? exclude.split(',').map((i) => parseInt(i)) : [];
			const tmpT = t.map((s) => {
				const tmpS = { ...s };
				if (tmpExclude.includes(tmpS.term_id)) {
					tmpS.excluded = true;
				}
				return tmpS;
			});
			setTerms(tmpT);
		});
	};

	const onSelect = (b, termId) => {
		const tmpTerms = terms;

		tmpTerms.map((t) => {
			if (t.term_id === termId) {
				if (b) {
					t.excluded = true;
				} else {
					t.excluded = false;
				}
			}
			return t;
		});

		setTerms([...tmpTerms]);
	};

	useEffect(() => {
		console.log('Setting the exclude map...', terms);
		if (false !== terms) {
			const tmpExclude = terms
				.filter((t) => true === t.excluded)
				.map((s) => s.term_id);
			console.log('tmpExclude', tmpExclude);
			setAttributes({ exclude: tmpExclude.join() });
		}
	}, [terms]);

	// Load terms for {letter} when {letter} changes.
	useEffect(() => {
		loadTerms();
	}, [letter, taxonomy]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			<div {...blockProps}>
				{undefined === letter && (
					<Placeholder>
						<TaxonomyControl
							value={taxonomy}
							onChange={(newTaxonomy) => {
								setAttributes({ taxonomy: [...newTaxonomy] });
							}}
						/>
						<LetterControl
							value={letter}
							onChange={(newLetter) => setAttributes({ letter: newLetter })}
						/>
					</Placeholder>
				)}
				{undefined !== letter && (
					<Fragment>
						<h2>{letter}</h2>
						{false !== terms && (
							<ul>
								{terms.map((term) => {
									const checked = term.excluded;
									const label =
										true !== checked
											? decodeEntities(term.name)
											: `${decodeEntities(term.name)} (${term.term_id})`;
									return (
										<li>
											<CheckboxControl
												label={label}
												checked={checked}
												onChange={(b) => onSelect(b, term.term_id)}
											/>
										</li>
									);
								})}
							</ul>
						)}
					</Fragment>
				)}
			</div>
		</Fragment>
	);
}
