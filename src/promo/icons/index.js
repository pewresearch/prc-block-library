import { Fragment } from '@wordpress/element';
import electionIconURL, {
    ReactComponent as electionSVG,
} from './election-icon.svg';
import standardIconURL, {
    ReactComponent as standardSVG,
} from './standard-icon.svg';

const SvgAsImg = ({ svg, sizeInPX }) => {
    // Go ahead and sanitize the output here instead of waiting for WP to do it, otherwise you'll get a diff error.
    return <img src={svg} width={sizeInPX} height={sizeInPX} />;
};

const Icon = ({ icon }) => {
    const ElectionIcon = () => {
        return <SvgAsImg svg={electionIconURL} sizeInPX="45" />;
    };
    const MailIcon = () => {
        return <SvgAsImg svg={standardIconURL} sizeInPX="45" />;
    };
    return (
        <Fragment>
            {'election' === icon && <ElectionIcon />}
            {'mail' === icon && <MailIcon />}
        </Fragment>
    );
};

export default Icon;
