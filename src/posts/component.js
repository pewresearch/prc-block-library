
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { Item, List } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import * as moment from 'moment';

class PostsList extends Component {
	constructor(props) {
		super(props);
	}

	posts({data}){
		console.log(data);
		return(
			<List relaxed divided>
			{ false !== data && data.map((item, index) => {
				return <List.Item><span className="meta date">{item.date}</span><a href={item.link}><RawHTML>{item.title}</RawHTML></a></List.Item>
			}) }
			</List>
		)
	}

	render() {
		const Posts = this.posts;
		return(
			<Fragment>
				<Posts data={ this.props.posts }/>
			</Fragment>
		)
	}	
}

export default PostsList;