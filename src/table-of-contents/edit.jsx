/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import clsx from 'clsx';
import { getBlockGapSupportValue } from '@prc/functions';

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { useBlockProps, withColors } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import StyleEngine from './style-engine';
import useTOC from './use-toc';

function InternalChapters({ internalChapters }) {
	const { selectBlock } = useDispatch('core/block-editor');
	return (
		<ul className="wp-block-prc-block-table-of-contents__list">
			{Object.values(internalChapters).map((internalChapter) => {
				const title =
					internalChapter.title?.originalHTML ||
					internalChapter.title;
				return (
					<li key={internalChapter.id}>
						<a
							onClick={() => {
								if (internalChapter.clientId) {
									selectBlock(internalChapter.clientId);
								}
							}}
						>
							{title}
						</a>
					</li>
				);
			})}
		</ul>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                                Properties passed to the function.
 * @param {Object}   props.attributes                     Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.activeBackgroundColor
 * @param            props.setActiveBackgroundColor
 * @param            props.activeTextColor
 * @param            props.setActiveTextColor
 * @param            props.hoverBackgroundColor
 * @param            props.setHoverBackgroundColor
 * @param            props.hoverTextColor
 * @param            props.setHoverTextColor
 * @param            props.customHoverBackgroundColor
 * @param            props.setCustomHoverBackgroundColor
 * @param            props.customHoverTextColor
 * @param            props.setCustomHoverTextColor
 * @param            props.customActiveBackgroundColor
 * @param            props.setCustomActiveBackgroundColor
 * @param            props.customActiveTextColor
 * @param            props.setCustomActiveTextColor
 * @param {Function} props.setAttributes                  Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	customHoverBackgroundColor,
	setCustomHoverBackgroundColor,
	customHoverTextColor,
	setCustomHoverTextColor,
	customActiveBackgroundColor,
	setCustomActiveBackgroundColor,
	customActiveTextColor,
	setCustomActiveTextColor,
}) {
	const { postId, postType } = context;
	const { chapters = [] } = useTOC({ postId, postType });
	const { showCurrentChapter, className, style } = attributes;

	// Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
	const colors = useMemo(
		() => ({
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor,
		}),
		[
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor,
		]
	);

	const blockWrapperClassNames = useMemo(() => {
		return clsx(className);
	}, [className]);

	const blockPropArgs = useMemo(() => {
		return {
			className: clsx(
				'wp-block-prc-block-table-of-contents__list',
				className
			),
		};
	}, [blockWrapperClassNames, showCurrentChapter]);

	const blockProps = useBlockProps(blockPropArgs);

	return (
		<>
			<Controls
				{...{
					attributes,
					setAttributes,
					colors,
					clientId,
				}}
			/>
			<ol {...blockProps}>
				<StyleEngine attributes={attributes} clientId={clientId} />
				{0 !== chapters.length &&
					chapters.map((chapter) => {
						const key = chapter.id || `chptr-${Math.random()}`;
						return (
							<li
								key={key}
								className={clsx(
									'wp-block-prc-block-table-of-contents__list-item',
									{
										'is-active': postId === chapter?.id,
									}
								)}
							>
								<span>{chapter.title}</span>
								{postId === chapter.id &&
									chapter?.internalChapters && (
										<InternalChapters
											{...{
												internalChapters:
													chapter?.internalChapters,
											}}
										/>
									)}
							</li>
						);
					})}
			</ol>
		</>
	);
}

export default withColors(
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
	'customHoverBackgroundColor',
	'customHoverTextColor',
	'customActiveBackgroundColor',
	'customActiveTextColor'
)(Edit);
