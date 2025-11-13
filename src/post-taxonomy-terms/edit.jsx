/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';
import {decodeEntities} from '@wordpress/html-entities';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import StyleEngine from './style-engine';
import usePostTaxonomyTerms from './use-post-taxonomy-terms';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	__unstableLayoutClassNames: layoutClassNames,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	customActiveBackgroundColor,
	setCustomActiveBackgroundColor,
	customActiveTextColor,
	setCustomActiveTextColor,
	customHoverBackgroundColor,
	setCustomHoverBackgroundColor,
	customHoverTextColor,
	setCustomHoverTextColor
} ) {
	const {postId, postType} = context;
	const {
		taxonomy,
		className,
		layout,
		perPage,
		separator,
	} = attributes;
	const orientation = layout?.orientation || 'vertical';

	const {taxonomyTerms, isLoading} = usePostTaxonomyTerms(postId, postType, taxonomy, perPage);

	const isList = useMemo(() => orientation === 'vertical', [orientation]);

	const logicalStyle = useMemo(()=>{
		if (separator) {
			return {
				'--separator': `"${separator}"`,
			}
		}
		return {};
	}, [separator]);

	// Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
	const colors = useMemo(() => ({
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
		hoverBackgroundColor,
		setHoverBackgroundColor,
		hoverTextColor,
		setHoverTextColor
	}), [
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
		hoverBackgroundColor,
		setHoverBackgroundColor,
		hoverTextColor,
		setHoverTextColor
	]);

	const blockProps = useBlockProps({
		className: classNames(className, layoutClassNames, {
			'has-separator': !!separator && !isList,
		}),
		style: {
			...logicalStyle,
		}
	});

	const itemClassName = 'wp-block-prc-block-post-taxonomy-terms__list-item';

	const memoizedTaxonomyTerms = useMemo(() => {
		return taxonomyTerms.map((term) => {
			return <li className={itemClassName}>{decodeEntities(term.name)}</li>
		});
	}, [taxonomyTerms, isLoading, itemClassName]);

	return (
		<Fragment>
			<StyleEngine attributes={attributes} clientId={clientId} />
			<Controls { ...{ attributes, setAttributes, context, colors, isList, clientId } } />
			<div { ...blockProps }>
				<ul className="wp-block-prc-block-post-taxonomy-terms__list">
					{memoizedTaxonomyTerms}
				</ul>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
	'customActiveBackgroundColor',
	'customActiveTextColor',
	'customHoverBackgroundColor',
	'customHoverTextColor'
)(Edit);
