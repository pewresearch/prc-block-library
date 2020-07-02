import { render, Component, Fragment } from '@wordpress/element';

import { getPosts } from '../_shared';

import PostsList from './styles/list';
import FactTankList from './styles/fact-tank';
import PostsColumns from './styles/columns';

class DynamicPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: false,
            fetchInterval: 50000, // In minutes @TODO on production change this to 5 minutes and not 5 seconds
        };
        this.setState = this.setState.bind(this);
    }

    componentDidMount = () => {
        const { setState } = this;
        // Fetch immediately, then fetch every x milliseconds.
        getPosts(
            this.props.per_page,
            this.props.formatID,
            this.props.programID,
            'formats',
            true,
        ).then(posts => {
            setState({ posts });
        });

        setInterval(() => {
            getPosts(
                this.props.per_page,
                this.props.formatID,
                this.props.programID,
                'formats',
                true,
            ).then(posts => {
                setState({ posts });
            });
        }, this.state.fetchInterval);
    };

    render() {
        const data = this.props;
        data.posts = this.state.posts;
        data.disableLiink = false;

        let isFactTank = false;
        if (
            undefined !== this.props.style &&
            this.props.style.includes('is-style-fact-tank')
        ) {
            isFactTank = true;
        }
        let isList = false;
        if (
            undefined !== this.props.style &&
            this.props.style.includes('is-style-list')
        ) {
            isList = true;
        }
        let isColumns = false;
        if (
            undefined !== this.props.style &&
            this.props.style.includes('is-style-columns')
        ) {
            isColumns = true;
        }
        return (
            <Fragment>
                {true === isFactTank && <FactTankList {...data} />}
                {true === isList && <PostsList {...data} />}
                {true === isColumns && <PostsColumns {...data} />}
            </Fragment>
        );
    }
}

// When DOM is fully loaded load the filters
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.js-react-posts-block')) {
        const elms = document.querySelectorAll('.js-react-posts-block');
        elms.forEach(elm => {
            console.log('Dynamic Posts');
            console.log(elm);
            const props = {
                title: elm.getAttribute('data-title'),
                format: elm.getAttribute('data-format'),
                formatID: elm.getAttribute('data-format-id'),
                formatSlug: elm.getAttribute('data-format-slug'),
                program: elm.getAttribute('data-program'),
                programID: elm.getAttribute('data-program-id'),
                programSlug: elm.getAttribute('data-program-slug'),
                per_page: elm.getAttribute('data-number'),
                backgroundColor: elm.getAttribute('data-background'),
                style: elm.getAttribute('data-style'),
            };
            console.log(props);
            render(<DynamicPosts {...props} />, elm);
        });
    }
});
