/** WordPress Dependencies */
import { Fragment, useState } from '@wordpress/element';
import { cleanForSlug } from '@wordpress/url';

/** Third Party Dependencies */
import {
    List,
    Divider,
    Dropdown,
    Icon,
    Flag,
    Accordion,
} from 'semantic-ui-react';
import { useMediaQuery } from 'beautiful-react-hooks';

const MobileTOC = () => {
    const { prcToc } = window;
    return (
        <List small selection link>
            {prcToc.data.map(item => {
                if (true === item.active) {
                    return <List.Item active>{item.title}</List.Item>;
                }
                return (
                    <List.Item as="a" href={item.link}>
                        {item.title}
                    </List.Item>
                );
            })}
        </List>
    );
};

const ListMenu = ({ items, enableFlags, isSmall = false }) => {
    return (
        <List
            link
            celled={!isSmall}
            horizontal={!isSmall}
            selection={isSmall}
            className="sans-serif"
        >
            {items.map(item => (
                <List.Item as="a" href={item.url} active={item.active}>
                    {true === enableFlags && (
                        <Flag name={item.label.toLowerCase()} />
                    )}
                    {item.label}
                </List.Item>
            ))}
        </List>
    );
};

const DropdownMenu = ({ items }) => {
    return (
        <Dropdown
            placeholder="Select Fact Sheet"
            fluid
            search
            selection
            options={items}
            onChange={(e, { value }) => {
                window.location.href = value;
            }}
        />
    );
};

const FactSheetCollection = ({
    altPost,
    collectionName,
    collectionTerms,
    download,
    enableFlags,
    style,
}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const isSmall = useMediaQuery('(max-width: 767px)');

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    const MenuItems = ({ styleOverride }) => {
        let s = style;
        if (undefined !== styleOverride) {
            s = styleOverride;
        }
        const elms = [];
        collectionTerms.forEach(elm => {
            const obj = {
                active: elm.classList.contains('active'),
            };
            if ('is-style-list' === s) {
                obj.label = elm.innerText;
                obj.url = elm.href;
            } else {
                obj.key = cleanForSlug(elm.innerText);
                obj.value = elm.href;
                obj.text = elm.innerText;
                if (true === enableFlags) {
                    obj.flag = elm.innerText.toLowerCase();
                }
            }
            elms.push(obj);
        });
        return (
            <Fragment>
                {'is-style-dropdown' === s && <DropdownMenu items={elms} />}
                {'is-style-list' === s && (
                    <ListMenu
                        items={elms}
                        enableFlags={enableFlags}
                        isSmall={isSmall}
                    />
                )}
            </Fragment>
        );
    };

    const DesktopView = () => {
        if (isSmall) {
            return <Fragment />;
        }
        return (
            <Fragment>
                <Divider />
                <div className="ui sub header" style={{ marginTop: 0 }}>
                    {collectionName}
                </div>
                <MenuItems />
                <Divider />
                {false !== download && (
                    <a
                        href={download.href}
                        download
                        style={{ color: 'black' }}
                        className="sans-serif"
                    >
                        <i className="icon file pdf outline" />
                        Download a PDF version of this fact sheet
                    </a>
                )}
            </Fragment>
        );
    };

    const MobileView = () => {
        if (!isSmall) {
            return <Fragment />;
        }
        return (
            <Accordion styled>
                <Accordion.Title
                    active={0 === activeIndex}
                    index={0}
                    onClick={handleClick}
                >
                    <Icon name="dropdown" />
                    Table Of Contents
                </Accordion.Title>
                <Accordion.Content active={0 === activeIndex}>
                    <MobileTOC />
                </Accordion.Content>
                <Accordion.Title
                    active={1 === activeIndex}
                    index={1}
                    onClick={handleClick}
                >
                    <Icon name="dropdown" />
                    {collectionName}
                </Accordion.Title>
                <Accordion.Content active={1 === activeIndex}>
                    <MenuItems styleOverride="is-style-list" />
                </Accordion.Content>
                {false !== download && (
                    <Accordion.Title
                        active={2 === activeIndex}
                        index={2}
                        onClick={() => {
                            window.location.href = download.href;
                        }}
                    >
                        <i className="icon file pdf outline" />
                        Download a PDF version of this fact sheet
                    </Accordion.Title>
                )}
            </Accordion>
        );
    };

    return (
        <div>
            <p className="sans-serif">
                <a href={altPost.href}>{altPost.innerText}</a>
            </p>
            <DesktopView />
            <MobileView />
        </div>
    );
};

export default FactSheetCollection;
