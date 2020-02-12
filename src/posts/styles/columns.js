
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
		this.insertStoryBlock = this.insertStoryBlock.bind(this);
	}

	componentDidMount = () => {
		console.log("Columns Mounted");
	}

	insertStoryBlock = (clientID, item, index) => {
		console.log('Insert Story Block');

		const parentID = window.wp.data.select('core/block-editor').getBlockHierarchyRootClientId( clientID );
		const parentBlockOrder = window.wp.data.select('core/block-editor').getBlockOrder(parentID);
		const parentBlock = window.wp.data.select('core/block-editor').getBlock(parentBlockOrder[1]);

		console.log(parentBlockOrder[1]);
		console.log(parentBlock);
		console.log(parentID);
		
		let block = window.wp.blocks.createBlock( 'prc-block/story-item', {
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
		} );

		window.wp.data.dispatch('core/block-editor').insertBlocks(block, index + 1, parentBlock.clientId);
	}

	render = () => {
		console.log(this.props);
		const data = this.props.posts;
		const insertStoryBlock = this.insertStoryBlock;
		return(
			<div style={{marginBottom: '2rem'}}>
			<div className="ui sub header" style={{marginBottom: '1rem'}}>{this.props.title}</div>
			<Grid divided padded stackable columns='equal' style={{backgroundColor: this.props.backgroundColor}}>
				<Grid.Row>
				{ false !== data && data.map((item, index) => {
					let storyItemArgs = {
						postID: '',
						title: item.title,
						link: item.link,
						date: item.date,
						label: item.label,
						excerpt: '',
						extra: '',
						image: {
							slot: 'top',
							src: item.image,
							isChartArt: false,
						},
						// These are very much 
						options: this.state.defaultOptions,
						classNames: 'is-style-top',
					};
					return <Grid.Column><StoryItem {...storyItemArgs}/></Grid.Column>
				}) }
				<InnerBlocks/>
				</Grid.Row>
			</Grid>
			</div>
		)
	}	
}

export default PostsColumns;