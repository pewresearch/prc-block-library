/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, Fragment, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const getGAMostPopular = () => {
    return new Promise((resolve, reject) => {
        resolve('yes');
        apiFetch( { path: '/prc-api/v2/analytics/get-popular-posts' } ).then( ( posts ) => {
            resolve(posts);
        } );
    });
}

const GoogleAnalyticsMostPopular = ({onPick = false}) => {
    // No onPick function passed in, so we don't need to do anything.
    if ( false === onPick ) {
        return <Fragment/>;
    }

    // We'll construct our own rest api endpoint and query it really quickly.
    const [mostPopular, setMostPopular] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGAMostPopular().then(data => {
            setMostPopular(data);
            setIsLoading(false);
        });
    }
    , []);

    return (
        <Fragment>
            <p>Google Analytics Results Will Appear Here</p>
        </Fragment>
    );
}

export default GoogleAnalyticsMostPopular;