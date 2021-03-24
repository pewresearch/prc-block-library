/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    useBlockProps,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
    Button,
    Flex,
    FlexItem,
    FlexBlock,
    Placeholder,
} from '@wordpress/components';

const TermSelectField = ({ value = false, searchLabel, setAttributes }) => {
    const { label } = value;

    const onChange = e => {
        console.log(e);
        setAttributes({ url: e.url, label: e.title, id: e.id });
    };

    const onClear = () => {
        setAttributes({ url: '', label: '', id: '' });
    };

    if (undefined !== label && '' !== label) {
        return (
            <Flex>
                <FlexBlock>{label}</FlexBlock>
                <FlexItem>
                    <Button isSecondary onClick={onClear}>
                        Clear
                    </Button>
                </FlexItem>
            </Flex>
        );
    }

    return (
        <LinkControl
            searchInputPlaceholder={searchLabel}
            settings={[]}
            onChange={onChange}
            suggestionsQuery={{ type: 'term', subtype: 'topic' }}
            noDirectEntry
            withCreateSuggestion={false}
        />
    );
};

const edit = ({ attributes, className, setAttributes }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    return (
        <div {...blockProps}>
            <Placeholder label="Configure Topic Search Field" isColumnLayout>
                <TermSelectField
                    value={attributes}
                    setAttributes={setAttributes}
                    searchLabel={__(`Search for Topic`)}
                />
            </Placeholder>
        </div>
    );
};

export default edit;
