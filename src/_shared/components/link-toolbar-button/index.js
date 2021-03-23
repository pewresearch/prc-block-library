import { __ } from '@wordpress/i18n';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { ToolbarButton, Popover } from '@wordpress/components';

/**
 * Link control in a toolbar button that defaults to searching for topic terms
 */
const LinkToolbarButton = ({
    url,
    onChange,
    query = { type: 'term', subtype: 'topic' },
}) => {
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    return (
        <Fragment>
            <ToolbarButton
                aria-expanded={isLinkOpen}
                aria-haspopup="true"
                label={__('Set Link')}
                icon="admin-links"
                onClick={() => setIsLinkOpen(!isLinkOpen)}
                showTooltip
            />
            {true === isLinkOpen && (
                <Popover
                    position="bottom center"
                    onClose={() => setIsLinkOpen(false)}
                >
                    <LinkControl
                        className="wp-block-navigation-link__inline-link-input"
                        value={{ url }}
                        showInitialSuggestions
                        suggestionsQuery={query}
                        onChange={p => onChange(p)}
                        settings={[]}
                    />
                </Popover>
            )}
        </Fragment>
    );
};

export default LinkToolbarButton;
