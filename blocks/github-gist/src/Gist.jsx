/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */

/**
 * External Dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner, Icon as WPIcon } from '@wordpress/components';
import { useState, useEffect, RawHTML } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Icon from './Icon';

function Gist(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [gistContent, setGistContent] = useState('');
	const [stylesheetAdded, setStylesheetAdded] = useState(false);

	const { url } = props;
	const { file } = props;
	const gistCallback = props.callbackId;

	const __addStylesheet = (href) => {
		if (!stylesheetAdded) {
			const link = document.createElement('link');
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild(link);
			setStylesheetAdded(true);
		}
	};

	const _buildGist = () => {
		window[gistCallback] = (gist) => {
			__addStylesheet(gist.stylesheet);
			setIsLoading(false);
			setGistContent(gist.div);
		};

		const gistScript = document.createElement('script');
		gistScript.type = 'text/javascript';
		const transformedURL = _transformedURL(gistCallback);
		if (!transformedURL) {
			return;
		}
		gistScript.src = transformedURL;
		gistScript.onerror = function () {
			_handleError();
		};
		document.head.appendChild(gistScript);
	};

	const _handleError = () => {
		const { onError } = props;
		setIsLoading(false);
		onError();
	};

	const _getID = () => {
		// Extract a string in form `username/uniqueValue` from the provided Gist url.
		if (null === url.match(/(\.com\/)(.*?)([^#]+)/)) {
			_handleError();
			return;
		}
		return url.match(/(\.com\/)(.*?)([^#]+)/).pop();
	};

	const _getFile = () => {
		// If `file` prop was provided return that.
		if (file !== undefined) {
			return `&file=${file}`;
		}

		// Else construct the file parameter from the `url` prop.
		const fileSplit = url.split('#').pop();

		// If the file parameter exist in Gist url return that file.
		if (null !== fileSplit.match(/file*/)) {
			return `&file=${fileSplit.replace('file-', '').replace('-', '.')}`;
		}

		// Else the user wants to link the whole Gist repository.
		return '';
	};

	const _transformedURL = (callback) => {
		// Construct a gist url that will allow us to redner the Gist into our page.
		const id = _getID();
		if (!id) {
			return false;
		}
		const fileName = _getFile();
		return `https://gist.github.com/${id}.json?callback=${callback}${fileName}`;
	};

	useEffect(() => {
		_buildGist();
	}, []);

	if (isLoading) {
		return (
			<Placeholder
				key="placeholder"
				icon={<WPIcon icon={Icon} />}
				label={__('Loading Gist')}
			>
				<Spinner />
			</Placeholder>
		);
	}

	if (gistContent) {
		return <RawHTML>{gistContent}</RawHTML>;
	}

	return '';
}

export default Gist;

// - PROP TYPES -
Gist.propTypes = {
	file: PropTypes.string,
	onError: PropTypes.func,
	url: PropTypes.string.isRequired,
};