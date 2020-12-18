/**
 * External dependencies
 */
import classnames from 'classnames';
import { escape, get, head, find } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import {
	useSelect,
	useDispatch,
	withDispatch,
	withSelect,
} from '@wordpress/data';
import {
	KeyboardShortcuts,
	PanelBody,
	Popover,
	TextControl,
	TextareaControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';
import {
	BlockControls,
	InnerBlocks,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	InspectorControls,
	RichText,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
} from '@wordpress/block-editor';
import { isURL, prependHTTP } from '@wordpress/url';
import {
	Fragment,
	useState,
	useEffect,
	useRef,
	createInterpolateElement,
} from '@wordpress/element';
import { placeCaretAtHorizontalEdge } from '@wordpress/dom';
import { link as linkIcon } from '@wordpress/icons';

const isStyle = (needle, haystack) => {
	const arr = haystack.split(" ");
	return arr.includes(needle);
}

/**
 * A React hook to determine if it's dragging within the target element.
 *
 * @typedef {import('@wordpress/element').RefObject} RefObject
 *
 * @param {RefObject<HTMLElement>} elementRef The target elementRef object.
 *
 * @return {boolean} Is dragging within the target element.
 */
const useIsDraggingWithin = ( elementRef ) => {
	const [ isDraggingWithin, setIsDraggingWithin ] = useState( false );

	useEffect( () => {
		const { ownerDocument } = elementRef.current;

		function handleDragStart( event ) {
			// Check the first time when the dragging starts.
			handleDragEnter( event );
		}

		// Set to false whenever the user cancel the drag event by either releasing the mouse or press Escape.
		function handleDragEnd() {
			setIsDraggingWithin( false );
		}

		function handleDragEnter( event ) {
			// Check if the current target is inside the item element.
			if ( elementRef.current.contains( event.target ) ) {
				setIsDraggingWithin( true );
			} else {
				setIsDraggingWithin( false );
			}
		}

		// Bind these events to the document to catch all drag events.
		// Ideally, we can also use `event.relatedTarget`, but sadly that
		// doesn't work in Safari.
		ownerDocument.addEventListener( 'dragstart', handleDragStart );
		ownerDocument.addEventListener( 'dragend', handleDragEnd );
		ownerDocument.addEventListener( 'dragenter', handleDragEnter );

		return () => {
			ownerDocument.removeEventListener( 'dragstart', handleDragStart );
			ownerDocument.removeEventListener( 'dragend', handleDragEnd );
			ownerDocument.removeEventListener( 'dragenter', handleDragEnter );
		};
	}, [] );

	return isDraggingWithin;
};

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @return {{ type?: string, subtype?: string }} Search query params.
 */
function getSuggestionsQuery( type ) {
	switch ( type ) {
		case 'post':
		case 'page':
			return { type: 'post', subtype: type };
		case 'topic':
			return { type: 'term', subtype: 'topic' };
		case 'formats':
			return { type: 'term', subtype: 'formats' };
		case 'programs':
			return { type: 'term', subtype: 'programs' };
		default:
			return {};
	}
}

function NavigationLinkEdit( {
	attributes,
	isSelected,
	isImmediateParentOfSelectedBlock,
	setAttributes,
	insertLinkBlock,
	userCanCreatePages = false,
	userCanCreatePosts = false,
	insertBlocksAfter,
	mergeBlocks,
	onReplace,
} ) {
	const {
		label,
		type,
		opensInNewTab,
		url,
		description,
		rel,
		title,
	} = attributes;
	const link = {
		url,
		opensInNewTab,
	};
	const { saveEntityRecord } = useDispatch( 'core' );
	const [ isLinkOpen, setIsLinkOpen ] = useState( false );
	const listItemRef = useRef( null );
	const isDraggingWithin = useIsDraggingWithin( listItemRef );
	const itemLabelPlaceholder = __( 'Add link…' );
	const ref = useRef();

	const isDraggingBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).isDraggingBlocks(),
		[]
	);

	// Show the LinkControl on mount if the URL is empty
	// ( When adding a new menu item)
	// This can't be done in the useState call because it conflicts
	// with the autofocus behavior of the BlockListBlock component.
	useEffect( () => {
		if ( ! url ) {
			setIsLinkOpen( true );
		}
	}, [] );

	/**
	 * The hook shouldn't be necessary but due to a focus loss happening
	 * when selecting a suggestion in the link popover, we force close on block unselection.
	 */
	useEffect( () => {
		if ( ! isSelected ) {
			setIsLinkOpen( false );
		}
	}, [ isSelected ] );

	// If the LinkControl popover is open and the URL has changed, close the LinkControl and focus the label text.
	useEffect( () => {
		if ( isLinkOpen && url ) {
			// Does this look like a URL and have something TLD-ish?
			if (
				isURL( prependHTTP( label ) ) &&
				/^.+\.[a-z]+/.test( label )
			) {
				// Focus and select the label text.
				selectLabelText();
			} else {
				// Focus it (but do not select).
				placeCaretAtHorizontalEdge( ref.current, true );
			}
		}
	}, [ url ] );

	/**
	 * Focus the Link label text and select it.
	 */
	function selectLabelText() {
		ref.current.focus();
		const { ownerDocument } = ref.current;
		const { defaultView } = ownerDocument;
		const selection = defaultView.getSelection();
		const range = ownerDocument.createRange();
		// Get the range of the current ref contents so we can add this range to the selection.
		range.selectNodeContents( ref.current );
		selection.removeAllRanges();
		selection.addRange( range );
	}

	let userCanCreate = false;
	if ( ! type || type === 'page' ) {
		userCanCreate = userCanCreatePages;
	} else if ( type === 'post' ) {
		userCanCreate = userCanCreatePosts;
	}

	async function handleCreate( pageTitle ) {
		const postType = type || 'page';

		const page = await saveEntityRecord( 'postType', postType, {
			title: pageTitle,
			status: 'publish',
		} );

		return {
			id: page.id,
			postType,
			title: page.title.rendered,
			url: page.link,
		};
	}

	const blockProps = useBlockProps( {
		ref: listItemRef,
		className: classnames( 'item', {
			'is-editing':
				( isSelected ) &&
				// Don't show the element as editing while dragging.
				! isDraggingBlocks,
			// Don't select the element while dragging.
			'is-selected': isSelected && ! isDraggingBlocks,
			'is-dragging-within': isDraggingWithin,
			'has-link': !! url,
		} ),
	} );

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<KeyboardShortcuts
						bindGlobal
						shortcuts={ {
							[ rawShortcut.primary( 'k' ) ]: () =>
								setIsLinkOpen( true ),
						} }
					/>
					<ToolbarButton
						name="link"
						icon={ linkIcon }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ () => setIsLinkOpen( true ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			
			<InspectorControls>
				<PanelBody title={ __( 'Link settings' ) }>
					<TextareaControl
						value={ description || '' }
						onChange={ ( descriptionValue ) => {
							setAttributes( { description: descriptionValue } );
						} }
						label={ __( 'Description' ) }
						help={ __(
							'The description will be displayed in the menu if the current theme supports it.'
						) }
					/>
					<TextControl
						value={ title || '' }
						onChange={ ( titleValue ) => {
							setAttributes( { title: titleValue } );
						} }
						label={ __( 'Link title' ) }
						autoComplete="off"
					/>
					<TextControl
						value={ rel || '' }
						onChange={ ( relValue ) => {
							setAttributes( { rel: relValue } );
						} }
						label={ __( 'Link rel' ) }
						autoComplete="off"
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isStyle('is-style-chiclet', blockProps.className) && (
					<div class="ui basic button">
						<RichText
							ref={ ref }
							identifier="label"
							className="wp-block-navigation-link__label"
							value={ label }
							onChange={ ( labelValue ) =>
								setAttributes( { label: labelValue } )
							}
							onMerge={ mergeBlocks }
							onReplace={ onReplace }
							__unstableOnSplitAtEnd={ () =>
								insertBlocksAfter(
									createBlock( 'prc-block/menu-link' )
								)
							}
							aria-label={ __( 'Navigation link text' ) }
							placeholder={ itemLabelPlaceholder }
							keepPlaceholderOnFocus
							withoutInteractiveFormatting
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/image',
								'core/strikethrough',
							] }
						/>
					</div>
				) } 
				{ ! isStyle('is-style-chiclet', blockProps.className) && (
					<RichText
						ref={ ref }
						identifier="label"
						className="wp-block-navigation-link__label"
						value={ label }
						onChange={ ( labelValue ) =>
							setAttributes( { label: labelValue } )
						}
						onMerge={ mergeBlocks }
						onReplace={ onReplace }
						__unstableOnSplitAtEnd={ () =>
							insertBlocksAfter(
								createBlock( 'prc-block/menu-link' )
							)
						}
						aria-label={ __( 'Navigation link text' ) }
						placeholder={ itemLabelPlaceholder }
						keepPlaceholderOnFocus
						withoutInteractiveFormatting
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						] }
					/>
				) } 
				{ isLinkOpen && (
					<Popover
						position="bottom center"
						onClose={ () => setIsLinkOpen( false ) }
					>
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={ link }
							showInitialSuggestions={ true }
							withCreateSuggestion={ userCanCreate }
							createSuggestion={ handleCreate }
							createSuggestionButtonText={ ( searchTerm ) => {
								let format;
								if ( type === 'post' ) {
									/* translators: %s: search term. */
									format = __(
										'Create post: <mark>%s</mark>'
									);
								} else {
									/* translators: %s: search term. */
									format = __(
										'Create page: <mark>%s</mark>'
									);
								}
								return createInterpolateElement(
									sprintf( format, searchTerm ),
									{ mark: <mark /> }
								);
							} }
							noDirectEntry={ !! type }
							noURLSuggestion={ !! type }
							suggestionsQuery={ getSuggestionsQuery( type ) }
							onChange={ ( {
								title: newTitle = '',
								url: newURL = '',
								opensInNewTab: newOpensInNewTab,
								id,
							} = {} ) =>
								setAttributes( {
									url: encodeURI( newURL ),
									label: ( () => {
										const normalizedTitle = newTitle.replace(
											/http(s?):\/\//gi,
											''
										);
										const normalizedURL = newURL.replace(
											/http(s?):\/\//gi,
											''
										);
										if (
											newTitle !== '' &&
											normalizedTitle !==
												normalizedURL &&
											label !== newTitle
										) {
											return escape( newTitle );
										} else if ( label ) {
											return label;
										}
										// If there's no label, add the URL.
										return escape( normalizedURL );
									} )(),
									opensInNewTab: newOpensInNewTab,
									id,
								} )
							}
						/>
					</Popover>
				) }
			</div>
		</Fragment>
	);
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const {
			getBlockAttributes,
			getClientIdsOfDescendants,
			hasSelectedInnerBlock,
			getBlockParentsByBlockName,
			getSelectedBlockClientId,
			getSettings,
		} = select( 'core/block-editor' );
		const { clientId } = ownProps;
		const hasDescendants = !! getClientIdsOfDescendants( [ clientId ] )
			.length;

		const isImmediateParentOfSelectedBlock = hasSelectedInnerBlock(
			clientId,
			false
		);
		const selectedBlockId = getSelectedBlockClientId();
		const selectedBlockHasDescendants = !! getClientIdsOfDescendants( [
			selectedBlockId,
		] )?.length;

		return {
			isImmediateParentOfSelectedBlock,
			hasDescendants,
			selectedBlockHasDescendants,
			userCanCreatePages: select( 'core' ).canUser( 'create', 'pages' ),
			userCanCreatePosts: select( 'core' ).canUser( 'create', 'posts' ),
		};
	} ),
	withDispatch( ( dispatch, ownProps, registry ) => {
		return {
			insertLinkBlock() {
				const { clientId } = ownProps;

				const { insertBlock } = dispatch( 'core/block-editor' );

				const { getClientIdsOfDescendants } = registry.select(
					'core/block-editor'
				);
				const navItems = getClientIdsOfDescendants( [ clientId ] );
				const insertionPoint = navItems.length ? navItems.length : 0;

				const blockToInsert = createBlock( 'prc-block/menu-link' );

				insertBlock( blockToInsert, insertionPoint, clientId );
			},
		};
	} ),
] )( NavigationLinkEdit );
