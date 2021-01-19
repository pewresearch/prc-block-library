import { Fragment, RawHTML } from '@wordpress/element';
import { Segment, Divider, Flag, Accordion } from 'semantic-ui-react';
// import { getAlpha2Code } from 'i18n-iso-countries';

const CountryFlagMenuItem = ({label, url}) => {

}

const FactSheetCollection = ({altPost, collectionTerms, download, enableFlags}) => {
    console.log('collection props', altPost, collectionTerms, download, enableFlags);

    const MenuItems = () => {
        const elms = [];
        collectionTerms.forEach( elm => {
            elms.push({label: elm.innerText, url: elm.href});
        } );
        return(
            <Fragment>
                {elms.map( elm => (<a className="item" href={elm.url}>{enableFlags && <Flag name={elm.label.toLowerCase()}/>}{elm.label}</a>)) }
            </Fragment>
        )
    }

    return(
        <Segment color="beige" inverted>
            <a href={altPost.href}>{altPost.innerText}</a>
            <Divider/>
            <div class="ui sub header">Fact Sheets: News Media and Political Attitudes in Western Europe</div>
            <div className="ui celled horizontal link list sans-serif">
                <MenuItems/>
            </div>
            <Divider/>
            <a href={download.href} download style={{color: 'black'}}><i class="icon file pdf outline"></i>Download a PDF version of this fact sheet</a>
        </Segment>
    );
}

export default FactSheetCollection;
