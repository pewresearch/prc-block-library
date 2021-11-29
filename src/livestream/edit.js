/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [];

const edit = ({ attributes, setAttributes }) => {
    const { className, streamUrl, chatUrl } = attributes;
    const style = undefined !== className ? className.split(' ') : [];
    console.log({ attributes });
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    return (
        <div {...blockProps}>
            <div className="prc-livestream-stream">
                Livestream video URL:
                <Input
                    type="text"
                    placeholder="Livestream URL"
                    value={streamUrl}
                    onChange={(e) =>
                        setAttributes({ streamUrl: e.target.value })
                    }
                />
            </div>
            <div className="prc-livestream-chat">
                Livestream chat URL:
                <Input
                    type="text"
                    placeholder="Chat URL"
                    value={chatUrl}
                    onChange={(e) => setAttributes({ chatUrl: e.target.value })}
                />
            </div>
        </div>
    );
};

export default edit;
