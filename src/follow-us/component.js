import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { Card as SemanticCard, Checkbox, Button, Form, Input } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import apiFetch from '@wordpress/api-fetch';

class FollowUs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			loading: false,
			selected: [],
		}
		this.setState = this.setState.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	componentDidMount = () => {
		if ( undefined !== this.props.editMode && true === this.props.editMode ) {
			const selected = this.props.newsletters.split(',');
			if ( 0 !== selected.length ) {
				this.setState({selected});
			}
		}
	}

	selectNewsletter = (ID) => {
		let selected = this.state.selected;

		if ( selected.includes(ID) ) {
			// If currently selected then remove
			var index = selected.indexOf(ID);
			if ( index > -1 ) {
				selected.splice(index, 1);
			}
		} else {
			selected.push(ID);
		}
		
		this.setState({ selected });
	}

	isSelected = ( ID ) => {
		let newsletters = this.props.newsletters.split(',');
		if ( newsletters.includes(ID) ) {
			return true;
		} else {
			return false;
		}
	}

	submitHandler = (e) => {
		console.log(this.state);
		this.setState({loading: true});
		// Do apifetch and return success message
	}

	selectNewsletters = () =>{
		const update = ( ID ) => {
			let selected = this.state.selected;
	
			if ( selected.includes(ID) ) {
				// If currently selected then remove "toggle"
				var index = selected.indexOf(ID);
				if ( index > -1 ) {
					selected.splice(index, 1);
				}
			} else {
				selected.push(ID);
			}
			
			// Update the selection of newsletters in the context of the sidebar:
			this.setState({ selected });
			// Covnert array to string for data storage:
			this.props.setAttributes({ newsletters: selected.join() });
		}

		const isSelected = ( ID ) => {
			let newsletters = this.state.selected;
			if ( newsletters.includes(ID) ) {
				return true;
			} else {
				return false;
			}
		}

		let newsletters = window.prcMailchimpBlock.interests;

		return(
			<Fragment>
				{ newsletters.map((item, index) => {
					return (
						<div class="item">
							<Form.Field><Checkbox label={item.label} value={item.value} checked={ isSelected(item.value)} className="sans-serif" onChange={ (e, data) => update(data.value) }/></Form.Field>
						</div>
					)
				}) }
			</Fragment>
		)
	}

	render = () => {
		let classes = classNames(this.props.className, 'inverted', 'beige');
		const newsletters = window.prcMailchimpBlock.interests;
		const SelectNewsletters = this.selectNewsletters;
		
		return(
			<SemanticCard fluid className={classes}>
				<SemanticCard.Header>Follow Us</SemanticCard.Header>

				<SemanticCard.Content>
					<div class="ui sub header">Social Media</div>
					{/* Edit */}
					{ false !== this.props.setAttributes && (
						<RichText
							tagName="ul"
							value={ this.props.socialMedia }
							onChange={ ( socialMedia ) => {
								this.props.setAttributes( { socialMedia } );
							} }
							formattingControls={ ['link'] }
							placeholder={ this.props.socialMedia }
							multiline="li"
							className="ui link list"
						/>
					) }
					{/* Display */}
					{ false === this.props.setAttributes && true === this.props.editMode && (
						this.props.children
					) }
					{ false === this.props.setAttributes && undefined === this.props.editMode && (
						<RawHTML>{this.props.children}</RawHTML>
					) }
					
					<div class="ui sub header">Newsletters</div>
					<Form onSubmit={this.submitHandler}>
						<div class="ui list">
						{ false === this.props.setAttributes && (
							newsletters.map((item, index) => {
								if ( this.isSelected(item.value) ) {
									return <div className="item"><Form.Field><Checkbox label={item.label} value={item.value} className="sans-serif" onChange={ (e, data) => this.selectNewsletter(data.value) }/></Form.Field></div>
								}
							})
						) }
						{ false !== this.props.setAttributes && (
							<SelectNewsletters/>
						) }
						</div>

						<Form.Field required>
							<Input
								fluid 
								size="mini"
								action={{
									color: 'secondary',
									size: 'mini',
									content: 'Sign Up',
									loading: this.state.loading,
									style: {justifyContent: 'center', width: 'auto'}
								}}
								type="email"
								placeholder='Email Address'
								value={this.state.email}
								onChange={ (e) => this.setState({email: e.target.value}) }
							/>
						</Form.Field>
					</Form>
				</SemanticCard.Content>

			</SemanticCard>
		)
	}	
}

export default FollowUs;