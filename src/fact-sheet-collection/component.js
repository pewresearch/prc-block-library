import { Fragment, RawHTML } from '@wordpress/element';
import { List, Divider, Dropdown, Flag, Accordion } from 'semantic-ui-react';
import { cleanForSlug } from '@wordpress/url';
// import { getAlpha2Code } from 'i18n-iso-countries';

const MobileTOC = () => {
    const { prcToc } = window;
    return (
        <List small selection link>
            {prcToc.data.map((item, index) => {
                if (true === item.active) {
                    return (
                        <List.Item active key={index}>
                            {item.title}
                        </List.Item>
                    );
                }
                return (
                    <List.Item as="a" href={item.link} key={index}>
                        {item.title}
                    </List.Item>
                );
            })}
        </List>
    );
};

const ListMenu = ({ items, enableFlags }) => {
    return (
        <div className="ui celled horizontal link list sans-serif">
            {items.map(item => (
                <a className="item" href={item.url}>
                    {true === enableFlags && (
                        <Flag name={item.label.toLowerCase()} />
                    )}
                    {item.label}
                </a>
            ))}
        </div>
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
    const MenuItems = () => {
        const elms = [];
        collectionTerms.forEach(elm => {
            if ('is-style-list' === style) {
                elms.push({ label: elm.innerText, url: elm.href });
            } else {
                const obj = {
                    key: cleanForSlug(elm.innerText),
                    value: elm.href,
                    text: elm.innerText,
                };
                if (true === enableFlags) {
                    obj.flag = elm.innerText.toLowerCase();
                }
                elms.push(obj);
            }
        });
        return (
            <Fragment>
                {'is-style-dropdown' === style && <DropdownMenu items={elms} />}
                {'is-style-list' === style && (
                    <ListMenu items={elms} enableFlags={enableFlags} />
                )}
            </Fragment>
        );
    };

    return (
        <div>
            <MobileTOC />
            <a href={altPost.href}>{altPost.innerText}</a>
            <Divider />
            <div className="ui sub header">{collectionName}</div>
            <MenuItems />
            <Divider />
            <a href={download.href} download style={{ color: 'black' }}>
                <i className="icon file pdf outline" />
                Download a PDF version of this fact sheet
            </a>
        </div>
    );
};

export default FactSheetCollection;
