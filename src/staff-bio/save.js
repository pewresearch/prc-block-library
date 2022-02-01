/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const save = ({attributes}) => {
	const { bio } = attributes;
    return (
		<Fragment>
			<RichText.Content
				tagName="div"
				className="bio"
				value={bio}
			/>
		</Fragment>
	);
};

export default save;
