/**
 * WordPress dependencies
 */
import { Fragment, RawHTML } from '@wordpress/element';

import AudioSVG from './audio.svg';
import DonateSVG from './donate.svg';
import ElectionSVG from './election.svg';
import MailSVG from './mail.svg';

const Icon = ({ icon }) => {
    return (
        <Fragment>
            {'audio' === icon && <RawHTML>{AudioSVG}</RawHTML>}
            {'election' === icon && <RawHTML>{ElectionSVG}</RawHTML>}
            {'mail' === icon && <RawHTML>{MailSVG}</RawHTML>}
            {'donate' === icon && <RawHTML>{DonateSVG}</RawHTML>}
        </Fragment>
    );
};

export default Icon;
