
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { List } from 'semantic-ui-react';

class PostsList extends Component {
	constructor(props) {
		super(props);
	}

	posts({loaded, setState, clientID, data, disableLink}){
		return(
			<List relaxed="very" link divided>
			{ false !== data && data.map((item, index) => {
				if ( true === disableLink ) {
					return <List.Item><span className="meta">{item.date}</span><RawHTML>{item.title}</RawHTML></List.Item>
				} else {
					return <List.Item><span className="meta">{item.date}</span><a href={item.link}><RawHTML>{item.title}</RawHTML></a></List.Item>
				}
			}) }
			</List>
		)
	}

	render() {
		const Posts = this.posts;
		return(
			<Fragment>
				<Posts data={this.props.posts} disableLink={this.props.disableLink}/>
			</Fragment>
		)
	}	
}

export default PostsList;