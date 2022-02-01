/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	console.log("postType", postType);
	if ( 'staff' !== postType ) {
		alert('This block can only be used on a staff post type.')
	}
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

    const { bio } = attributes;

	console.log("getting meta...", meta);

	if ( undefined === meta ) {
		return <div {...blockProps}>Bio Loading...</div>;
	}

	const jobTitle = meta[ 'job_title' ];
	const miniJobTitle = meta['job_title_mini_bio'];
	const twitter = meta['twitter'];

    const blockProps = useBlockProps();

	// jobTitle we should use entity prop meta to get and save the job title as post meta not as an attribute per say?
	// same for mini job title??
	// all these attributes should really come from post meta I believe...

    return (
		<div {...blockProps}>
			<TextControl
				label={ __( 'Job Title' ) }
				value={ jobTitle }
				onChange={ ( value ) => {
					setMeta( { ...meta, job_title: value } );
				} }
			/>
			<TextControl
				label={ __( 'Twitter' ) }
				value={ twitter }
				placeholder="@sethrubenstein"
				onChange={ ( value ) => {
					setMeta( { ...meta, twitter: value } );
				} }
			/>
			<pre>Enter Bio Below:</pre>
			<RichText
				tagName="div"
				className="bio"
				value={bio}
				onChange={(value) => setAttributes({ bio: value })}
				placeholder={__('Bio...', 'prc-block-library')}
				keepPlaceholderOnFocus
			/>
		</div>
	);
};

export default edit;
