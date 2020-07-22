import domReady from '@wordpress/dom-ready';
import collapsibleListHandler from '../components/collapsible-list/frontend';

domReady(() => {
    setTimeout(collapsibleListHandler, 1000);
});
