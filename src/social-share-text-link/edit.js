/**
 * External Dependencies
 */
import { link as linkIcon } from '@wordpress/icons';

/**
 * WordPress dependencies
 */
import { escape } from 'lodash';
import { __ } from '@wordpress/i18n';
import {
	KeyboardShortcuts,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import {
	BlockControls,
	RichText,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
} from '@wordpress/block-editor';
import { isURL, prependHTTP } from '@wordpress/url';
import { Fragment, useState, useEffect, useRef } from '@wordpress/element';
import { placeCaretAtHorizontalEdge } from '@wordpress/dom';

const edit = ({
	attributes,
	isSelected,
	setAttributes,
	mergeBlocks,
	onReplace,
}) => {
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
			<BlockControls>
				<ToolbarGroup>
					<KeyboardShortcuts
						bindGlobal
						shortcuts={{
							[rawShortcut.primary('k')]: () => setIsLinkOpen(true),
						}}
					/>
					<ToolbarButton
						name="link"
						icon={linkIcon}
						title={__('Link')}
						shortcut={displayShortcut.primary('k')}
						onClick={() => setIsLinkOpen(true)}
					/>
				</ToolbarGroup>
			</BlockControls>
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
};

export default edit;
