/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	PlainText,
	HeadingLevelDropdown,
	useBlockEditingMode,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';


/**
 * Displays the post title of the parent post. Does not actually offer any editing ability.
 * @param {*} param0
 * @returns
 */
export default function ParentPostTitleEdit( {
	attributes: { level, textAlign, isLink, rel, linkTarget },
	setAttributes,
	context: { postType, postId, queryId },
} ) {
	const TagName = 'h' + level;
	const [ postParentId ] = useEntityProp(
		'postType',
		postType,
		'post_parent',
		postId
	);
	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postParentId
	);
	const [ link ] = useEntityProp( 'postType', postType, 'link', postParentId );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	const blockEditingMode = useBlockEditingMode();

	let titleElement = <TagName { ...blockProps }>{ __( 'Parent Post Title' ) }</TagName>;

	if ( postParentId && postParentId && fullTitle ) {
		titleElement = (
			<TagName { ...blockProps }>
				{ fullTitle?.rendered }
			</TagName>
		);
	}

	if ( isLink && postParentId && link && fullTitle ) {
		titleElement = (
			<TagName { ...blockProps }>
				<a
					href={ link }
					target={ linkTarget }
					rel={ rel }
					onClick={ ( event ) => event.preventDefault() }
					dangerouslySetInnerHTML={ {
						__html: fullTitle?.rendered,
					} }
				/>
			</TagName>
		);
	}

	if ( postParentId === 0 ) {
		titleElement = (
			<TagName { ...blockProps }>
				{ __( 'No parent post found' ) }
			</TagName>
		);
	}

	return (
		<Fragment>
			{ blockEditingMode === 'default' && (
				<BlockControls group="block">
					<HeadingLevelDropdown
						value={ level }
						onChange={ ( newLevel ) =>
							setAttributes( { level: newLevel } )
						}
					/>
					<AlignmentControl
						value={ textAlign }
						onChange={ ( nextAlign ) => {
							setAttributes( { textAlign: nextAlign } );
						} }
					/>
				</BlockControls>
			) }
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Make title a link' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
					{ isLink && (
						<Fragment>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Open in new tab' ) }
								onChange={ ( value ) =>
									setAttributes( {
										linkTarget: value ? '_blank' : '_self',
									} )
								}
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								__nextHasNoMarginBottom
								label={ __( 'Link rel' ) }
								value={ rel }
								onChange={ ( newRel ) =>
									setAttributes( { rel: newRel } )
								}
							/>
						</Fragment>
					) }
				</PanelBody>
			</InspectorControls>
			{ titleElement }
		</Fragment>
	);
}
