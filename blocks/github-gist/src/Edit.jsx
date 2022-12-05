/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/**
 * Cribbed, heavily, from Co-Blocks Gist block.
 */

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { withNotices, Placeholder, TextControl } from '@wordpress/components';
import { Fragment, useState, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import Gist from './Gist';
import Icon from './Icon';

function Edit(props) {
	const {
		attributes,
		setAttributes,
		className,
		clientId,
		isSelected,
		noticeOperations,
		noticeUI,
	} = props;
	const { url, file, meta, caption } = attributes;

	const { setNotice, removeNotice } = noticeOperations;
	const [preview, setPreview] = useState(
		attributes.preview ? attributes.preview : false,
	);
	const [gistCallbackId, setGistCallbackId] = useState('');

	useEffect(() => {
		if (false === !!gistCallbackId) {
			setGistCallbackId(Edit.__nextGist());
		}
	}, [gistCallbackId]);

	useEffect(() => {
		if (attributes.url) {
			setPreview(true);
		}
	}, []);

	const clearErrors = () => {
		noticeOperations.removeAllNotices();
	};

	const updateURL = (newURL) => {
		setAttributes({ url: newURL, file: '' });

		if ('undefined' === typeof newURL || !newURL.trim()) {
			setPreview(false);
			return;
		}

		if (!attributes.url) {
			setPreview(true);
		}

		// Check for #file in the entered URL. If it's there, let's use it properly.
		const file = newURL.split('#file-').pop();

		if (null !== newURL.match(/#file-*/)) {
			const newURLWithNoFile = newURL.replace(file, '').replace('#file-', '');

			setAttributes({ url: newURLWithNoFile });
			setAttributes({ file: file.replace(/-([^-]*)$/, '.' + '$1') });
		}

		clearErrors();
	};

	const handleErrors = () => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice('Sorry, this URL is not a GitHub Gist.');
		setPreview(false);
	};

	const blockProps = useBlockProps({
		className: classnames(className, meta ? null : 'no-meta'),
	});

	return (
		<div {...blockProps}>
			{url && 0 < url.length && isSelected && (
				<Controls {...{ attributes, setAttributes, setPreview }} />
			)}
			{preview ? (
				url && (
					<Fragment>
						<Gist
							url={url}
							file={file}
							callbackId={gistCallbackId}
							onError={() => {
								handleErrors();
							}}
						/>
						{(!RichText.isEmpty(caption) || isSelected) && (
							<RichText
								tagName="figcaption"
								placeholder={__('Write caption…')}
								value={caption}
								onChange={(value) => setAttributes({ caption: value })}
								keepPlaceholderOnFocus
								inlineToolbar
							/>
						)}
					</Fragment>
				)
			) : (
				<Placeholder
					isColumnLayout
					label="GitHub Gist"
					instructions={__('Enter the URL of a GitHub Gist to embed it here.')}
					icon={Icon}
					notices={noticeUI}
				>
					<TextControl
						id={`gist-url-input-${clientId}`}
						value={url}
						label="Gist URL"
						placeholder={__('Add GitHub Gist URL…')}
						onChange={updateURL}
					/>
				</Placeholder>
			)}
		</div>
	);
}

Edit.__gistCallbackId = 0;

// Each time we request a new Gist, we have to provide a new
// global function name to serve as the JSONP callback.
Edit.__nextGist = () => `embed_gist_callback_${Edit.__gistCallbackId++}`;

export default compose(withNotices)(Edit);
