
import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';
import StoryItem from '../../story-item/component';

class PostsColumns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultOptions: {
				emphasis: false,
				enableHeader: true,
				enableExcerpt: true,
				headerSize: 'small',
			}
		}
	}

	componentDidMount = () => {
		console.log("Columns Mounted");
		console.log(this.props);
	}

	render = () => {
		const data = this.props.posts;
		return(
			<div style={{marginBottom: '2rem'}}>
			<div className="ui sub header" style={{marginBottom: '1rem'}}>{this.props.title}</div>
			<Grid divided padded stackable columns='equal' style={{backgroundColor: this.props.backgroundColor}}>
				<Grid.Row>
				{ false !== data && data.map((item, index) => {
					let storyItemArgs = {
						attributes: {
							title: item.title,
							image: item.image,
							excerpt: item.excerpt,
							link: item.link,
							label: item.label,
							date: item.date,
							extra: '',
							// Post Meta Data:
							postID: item.id,
							// Item Options
							emphasis: false,
							isChartArt: false,
							imageSlot: 'top',
							horizontal: false,
							stacked: true,
							enableHeader: true,
							enableExcerpt: false,
							enableExtra: false,
							enableProgramsTaxonomy: false,
							headerSize: 'normal',
							classNames: 'is-style-top',
						},
					};
					return <Grid.Column><StoryItem {...storyItemArgs}/></Grid.Column>
				}) }
				</Grid.Row>
			</Grid>
			</div>
		)
	}	
}

export default PostsColumns;