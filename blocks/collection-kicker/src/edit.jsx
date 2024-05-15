/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, Warning } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import useCollectionTerm from './use-collection-term';

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
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
} ) {
	const {termId} = attributes;
	const {postId, postType} = context;

	const { isLoading, collectionTerm } = useCollectionTerm( postId, termId );
	const [ kickerImage, setKickerImage ] = useState( null );
	const [ collectionName, setCollectionName ] = useState( 'Collection Term' );

	const blockProps = useBlockProps();

	useEffect(() => {
		if ( isLoading ) {
			console.log( 'loading...' );
		}
		if ( collectionTerm ) {
			console.log( 'collectionTerm', collectionTerm, collectionTerm?.kicker_image);
			// Set the collection name.
			setCollectionName( collectionTerm?.name );
			// Check if the kicker image exists, if it does and is an array then set the kicker image.
			if ( Array.isArray( collectionTerm?.kicker_image?.image ) ) {
				console.log( 'kicker image is an array' );
				setKickerImage( collectionTerm?.kicker_image?.image );
			}
		}
	}, [collectionTerm, isLoading]);

	return (
		<Fragment>
			<Controls { ...{ attributes, setAttributes, context: false } } />
			<div { ...blockProps }>
				{ isLoading && <Warning><Spinner /> { __( 'Loading Collection Kicker...' ) }</Warning> }
				{ !isLoading && (
					<Fragment>
						{null !== kickerImage && (
							<img src={ kickerImage[0] } alt={ collectionTerm?.name } width={kickerImage[1]} height={kickerImage[1]}/>
						)}
						<span>{collectionName}</span>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
}
