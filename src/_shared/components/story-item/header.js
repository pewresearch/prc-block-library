// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

import { Item } from 'semantic-ui-react';
import { Kicker, KickerEditor } from 'shared';

const Header = ({
    title,
    label,
    date,
    link,
    size,
    enabled,
    taxonomy,
    setAttributes,
}) => {
    if (true !== enabled) {
        return <Fragment />;
    }
    return (
        <Fragment>
            <Item.Meta>
                {false !== setAttributes && (
                    <KickerEditor
                        date={date}
                        label={label}
                        taxonomy={taxonomy}
                        setAttributes={setAttributes}
                    />
                )}
                {false === setAttributes && (
                    <Kicker label={label} date={date} />
                )}
            </Item.Meta>
            <Item.Header className={size}>
                {false !== setAttributes && (
                    <Fragment>
                        <BlockControls>
                            <Toolbar
                                controls={[
                                    {
                                        icon: 'editor-textcolor',
                                        title: `Size: Small`,
                                        isActive: 'small' === size,
                                        onClick: () => {
                                            setAttributes({
                                                headerSize: 'small',
                                            });
                                        },
                                    },
                                    {
                                        icon: 'editor-textcolor',
                                        title: `Size: Medium`,
                                        isActive: 'medium' === size,
                                        onClick: () => {
                                            setAttributes({
                                                headerSize: 'medium',
                                            });
                                        },
                                    },
                                    {
                                        icon: 'editor-textcolor',
                                        title: `Size: Large`,
                                        isActive: 'large' === size,
                                        onClick: () => {
                                            setAttributes({
                                                headerSize: 'large',
                                            });
                                        },
                                    },
                                ]}
                            />
                        </BlockControls>
                        <RichText
                            tagName="div"
                            value={title}
                            onChange={t => setAttributes({ title: t })}
                            formattingControls={['bold', 'italic']}
                            placeholder="Title"
                            multiline="br"
                        />
                    </Fragment>
                )}
                {false === setAttributes && (
                    <a href={link}>
                        <RawHTML>{title}</RawHTML>
                    </a>
                )}
            </Item.Header>
        </Fragment>
    );
};

export default Header;
