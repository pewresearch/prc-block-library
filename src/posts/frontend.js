import { render, Component, Fragment } from '@wordpress/element';
import PostsList from './styles/list';
import FactTankList from './styles/fact-tank';

class DynamicPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: false,
			fetchInterval: 5000, // In minutes
		}
		this.setState = this.setState.bind(this);
	}
	componentDidMount = () => {
		setInterval( () => {
			this.getPosts(this.props.per_page, this.props.format, this.props.program);
		}, this.state.fetchInterval);
	}
	getPosts = (perPage, format, program) => {
		const setState = this.setState;
		const formatDate = function( dateString ) {
			return moment(dateString).format("MMM D, YYYY");
		}
		const collection = new wp.api.collections.Stub();

		let args = { 'per_page': Number(perPage), 'formats': [ Number(format) ] };
		if ( 0 !== program ) {
			args.programs = Number(program);
		}
		let data = [];

		collection.fetch( { data: args } ).then( ( posts ) => {
			for ( let index = 0; index < posts.length; index++ ) {
				data.push({
					title: posts[index].title.rendered,
					date: formatDate(posts[index].date),
					link: posts[index].link,
				});
			}
			setState({ posts: data });
		});
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
		return(
			<Fragment>
				{ true === isFactTank && (
					<FactTankList {...data}/>
				) }
				{ true === isList && (
					<PostsList {...data}/>
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
