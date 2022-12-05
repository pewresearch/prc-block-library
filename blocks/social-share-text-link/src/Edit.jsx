/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { placeCaretAtHorizontalEdge } from '@wordpress/dom';
import { isURL, prependHTTP } from '@wordpress/url';
import { Popover } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
export default function Edit({
	attributes,
	isSelected,
	setAttributes,
	mergeBlocks,
	onReplace,
}) {
	const { className, label, opensInNewTab, url } = attributes;

	const link = {
		url,
		opensInNewTab,
	};

	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const listItemRef = useRef(null);
	const itemLabelPlaceholder = __('Add link…');
	const ref = useRef();

	/**
	 * Focus the Link label text and select it.
	 */
	const selectLabelText = () => {
		ref.current.focus();
		const { ownerDocument } = ref.current;
		const { defaultView } = ownerDocument;
		const selection = defaultView.getSelection();
		const range = ownerDocument.createRange();
		// Get the range of the current ref contents so we can add this range to the selection.
		range.selectNodeContents(ref.current);
		selection.removeAllRanges();
		selection.addRange(range);
	};

	// Show the LinkControl on mount if the URL is empty
	// ( When adding a new menu item)
	useEffect(() => {
		if (!url) {
			setIsLinkOpen(true);
		}
	}, []);

	/**
	 * The hook shouldn't be necessary but due to a focus loss happening
	 * when selecting a suggestion in the link popover, we force close on block unselection.
	 */
	useEffect(() => {
		if (!isSelected) {
			setIsLinkOpen(false);
		}
	}, [isSelected]);

	// If the LinkControl popover is open and the URL has changed, close the LinkControl and focus the label text.
	useEffect(() => {
		if (isLinkOpen && url) {
			// Does this look like a URL and have something TLD-ish?
			if (isURL(prependHTTP(label)) && /^.+\.[a-z]+/.test(label)) {
				// Focus and select the label text.
				selectLabelText();
			} else {
				// Focus it (but do not select).
				placeCaretAtHorizontalEdge(ref.current, true);
			}
		}
	}, [url]);

	const blockProps = useBlockProps({
		ref: listItemRef,
		className,
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, setIsLinkOpen }} />
			<div {...blockProps}>
				<RichText
					ref={ref}
					identifier="label"
					value={label}
					onChange={(labelValue) => setAttributes({ label: labelValue })}
					onMerge={mergeBlocks}
					onReplace={onReplace}
					aria-label={__('Social share link text')}
					placeholder={itemLabelPlaceholder}
					keepPlaceholderOnFocus
					withoutInteractiveFormatting
					allowedFormats={['bold']}
				/>
				{isLinkOpen && (
					<Popover
						position="bottom center"
						onClose={() => setIsLinkOpen(false)}
					>
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={link}
							suggestionsQuery={{}}
							onChange={({
								url: newURL = '',
								opensInNewTab: newOpensInNewTab,
							} = {}) =>
								setAttributes({
									url: encodeURI(newURL),
									label: (() => {
										const normalizedURL = newURL.replace(/http(s?):\/\//gi, '');
										if (label) {
											return label;
										}
										// If there's no label, add the URL.
										return escape(normalizedURL);
									})(),
									opensInNewTab: newOpensInNewTab,
								})
							}
						/>
					</Popover>
				)}
			</div>
		</Fragment>
	);
}
