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
	setHoverTextColor
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

	const memoizedItemClassNames = useMemo(() => {
		const extraClassArgs = isList ? {
			'has-active-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
			[`has-active-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
			'has-active-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
			[`has-active-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
			'has-focus-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
			[`has-focus-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
			'has-focus-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
			[`has-focus-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
			'has-hover-background': !!colors.hoverBackgroundColor.color || colors.hoverBackgroundColor.class,
			[`has-hover-${colors?.hoverBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
			'has-hover-color': !!colors.hoverTextColor.color || colors.hoverTextColor.class,
			[`has-hover-${colors?.hoverTextColor?.slug}-color`]: !!colors?.hoverTextColor?.slug,
		} : {};
		return classNames('wp-block-prc-block-post-taxonomy-terms__list-item', extraClassArgs);
	}, [colors, isList]);

	const memoizedTaxonomyTerms = useMemo(() => {
		return taxonomyTerms.map((term) => {
			return <li className={memoizedItemClassNames}>{decodeEntities(term.name)}</li>
		});
	}, [taxonomyTerms, isLoading, memoizedItemClassNames]);

	return (
		<Fragment>
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
)(Edit);
