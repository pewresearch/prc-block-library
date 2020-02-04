import { render, Component, Fragment } from '@wordpress/element';

import getPosts from '../_shared/get-posts';

import PostsList from './styles/list';
import FactTankList from './styles/fact-tank';
import PostsColumns from './styles/columns';


class DynamicPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: false,
			fetchInterval: 5000, // In minutes @TODO on production change this to 5 minutes and not 5 seconds
		}
		this.setState = this.setState.bind(this);
	}
	componentDidMount = () => {
		console.log('Dynamic Posts Mounted');
		// Fetch immediately, then fetch every x milliseconds.
		getPosts(this.setState, this.props.per_page, this.props.format, this.props.program);
		
		setInterval( () => {
			getPosts(this.setState, this.props.per_page, this.props.format, this.props.program);
		}, this.state.fetchInterval);
	}
	render() {
		let data = this.props;
		data.posts = this.state.posts;
		data.disableLiink = false;

		let isFactTank = false;
		if ( undefined !== this.props.style && this.props.style.includes('is-style-fact-tank') ) {
			isFactTank = true;
		}
		let isList = false;
		if ( undefined !== this.props.style && this.props.style.includes('is-style-list') ) {
			isList = true;
		}
		let isColumns = false;
		if ( undefined !== this.props.style && this.props.style.includes('is-style-columns') ) {
			isColumns = true;
		}
		return(
			<Fragment>
				{ true === isFactTank && (
					<FactTankList {...data}/>
				) }
				{ true === isList && (
					<PostsList {...data}/>
				) }
				{ true === isColumns && (
					<PostsColumns {...data}/>
				) }
			</Fragment>
		)
	}
}

// When DOM is fully loaded load the filters
document.addEventListener("DOMContentLoaded", function(){
	if ( document.querySelector('.js-react-posts-block') ) {
		const elms = document.querySelectorAll('.js-react-posts-block');
		for (const elm of elms) {
			console.log(elm);
			const props = {
				title: elm.getAttribute('data-title'),
				format: elm.getAttribute('data-format'),
				program: elm.getAttribute('data-program'),
				per_page: elm.getAttribute('data-number'),
				style: elm.getAttribute('data-style'),
			}
			render( 
				<DynamicPosts {...props}/>,
				elm
			);	
		}
	}
});
