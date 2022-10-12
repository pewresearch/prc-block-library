/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalInputControl as InputControl } from '@wordpress/components';

const edit = ({ attributes, setAttributes }) => {
	const { streamUrl, chatUrl } = attributes;
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<div className="wp-block-prc-block-livestream--stream">
				Livestream video embed URL:
				<InputControl
					type="text"
					placeholder="e.g. https://vimeo.com/event/1352567/embed"
					value={streamUrl}
					onChange={(val) => setAttributes({ streamUrl: val })}
				/>
			</div>
			<div className="wp-block-prc-block-livestream--chat">
				Livestream chat embed URL:
				<InputControl
					type="text"
					placeholder="e.g. https://app.sli.do/event/2jtxhrzn"
					value={chatUrl}
					onChange={(val) => setAttributes({ chatUrl: val })}
				/>
			</div>
		</div>
	);
};

export default edit;
