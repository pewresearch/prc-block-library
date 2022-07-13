/**
 * External Dependencies
 */
import classnames from 'classnames';
import { getTermsAsTree } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { TreeSelect } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';

function CollectionTermControl({ termId, setAttributes }) {
	const [terms, setTerms] = useState(false);
	const { editPost } = useDispatch('core/editor');

	useEffect(() => {
		getTermsAsTree('collection').then((options) => {
			console.log("collection terms...", options);
			setTerms(options);
		});
	}, []);

	if (false === terms) {
		return null;
	}

	return (
		<TreeSelect
			noOptionLabel="Select Collection"
			onChange={(selected) => {
				console.log('selected', selected);
				editPost({ collection: [parseFloat(selected)] });
				setAttributes({ termId: parseFloat(selected) });
			}}
			selectedId={termId}
			tree={terms}
		/>
	);
}

const edit = ({ attributes, className, setAttributes }) => {
	const { termId } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	return (
		<div {...blockProps}>
			<CollectionTermControl termId={termId} setAttributes={setAttributes} />
		</div>
	);
};

export default edit;
