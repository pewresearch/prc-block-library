/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, setAttributes }) => {
    const { className, streamUrl, chatUrl } = attributes;
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    return (
        <div {...blockProps}>
            <div className="prc-livestream-stream">
                Livestream video embed URL:
                <Input
                    type="text"
                    placeholder="e.g. https://vimeo.com/event/1352567/embed"
                    value={streamUrl}
                    onChange={(e) =>
                        setAttributes({ streamUrl: e.target.value })
                    }
                />
            </div>
            <div className="prc-livestream-chat">
                Livestream chat embed URL:
                <Input
                    type="text"
                    placeholder="e.g. https://app.sli.do/event/2jtxhrzn"
                    value={chatUrl}
                    onChange={(e) => setAttributes({ chatUrl: e.target.value })}
                />
            </div>
        </div>
    );
};

export default edit;
