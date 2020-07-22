import DonateIcon from './donation';
import ElectionIcon from './election';
import MailIcon from './newsletter';

const Icon = ({ icon }) => {
    return (
        <div>
            {'election' === icon && <ElectionIcon />}
            {'mail' === icon && <MailIcon />}
            {'donate' === icon && <DonateIcon />}
        </div>
    );
};

export default Icon;
