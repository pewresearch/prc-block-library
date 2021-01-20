import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import FactSheetCollection from './component';

const factSheetCollectionLoader = () => {
    const collections = document.querySelectorAll('.wp-block-prc-block-fact-sheet-collection');
    collections.forEach(collection => {
        const props = {
            altPost: false,
            collectionName: '',
            collectionTerms: false,
            download: false,
            enableFlags: false,
            style: collection.getAttribute('data-style'),
        }

        if ( collection.querySelector('.fact-sheet-alt-url') ) {
            props.altPost = collection.querySelector('.fact-sheet-alt-url');
        }

        if ( collection.querySelector('.fact-sheet-collection-terms') ) {
            props.collectionTerms = collection.querySelectorAll('.fact-sheet-collection-terms > .item');
            props.collectionName = collection.querySelector('.fact-sheet-collection-terms').getAttribute('data-collection-name');
            props.enableFlags = Boolean(collection.querySelector('.fact-sheet-collection-terms').getAttribute('data-enable-flags'));
        }

        if ( collection.querySelector('.fact-sheet-download') ) {
            props.download = collection.querySelector('.fact-sheet-download');
        }

        render(<FactSheetCollection {...props} />, collection);
    });
}

domReady(() => factSheetCollectionLoader());