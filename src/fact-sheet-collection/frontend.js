import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import FactSheetCollection from './component';

const factSheetCollectionLoader = () => {
    console.log("StoryItemsRender...");
    const collections = document.querySelectorAll('.fact-sheet-collection');
    collections.forEach(collection => {
        const props = {
            altPost: false,
            collectionTerms: false,
            download: false,
            enableFlags: true,
        }

        if ( collection.querySelector('.fact-sheet-alt-url') ) {
            props.altPost = collection.querySelector('.fact-sheet-alt-url');
        }

        if ( collection.querySelector('.fact-sheet-collection-terms') ) {
            props.collectionTerms = collection.querySelectorAll('.fact-sheet-collection-terms > .item');
            props.enableFlags = Boolean(collection.querySelector('.fact-sheet-collection-terms').getAttribute('data-enable-flags'));
        }

        if ( collection.querySelector('.fact-sheet-download') ) {
            props.download = collection.querySelector('.fact-sheet-download');
        }

        render(<FactSheetCollection {...props} />, collection);
    });
}

domReady(() => factSheetCollectionLoader());