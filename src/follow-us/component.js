import { Component, Fragment } from '@wordpress/element';
import { Card as SemanticCard, Checkbox, Button, Form, Input } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import apiFetch from '@wordpress/api-fetch';

class FollowUs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: false,
			data: [],
		}
		this.setState = this.setState.bind(this);
	}

	componentDidMount = () => {
		let data = window.prcMailchimpBlock.interests;
		this.setState({data});
	}

	submitHandler = () => {

	}

	isSelected = ( ID ) => {
		let newsletters = this.props.newsletters.split(',');
		if ( newsletters.includes(ID) ) {
			return true;
		} else {
			return false;
		}
	}

	render = () => {
		let classes = classNames(this.props.className);
		const data = this.state.data;
		return(
			<SemanticCard fluid className={classes}>
				<SemanticCard.Header>Follow Us</SemanticCard.Header>

				<SemanticCard.Content>
				<Form>
					{ data.map((item, index) => {
						if ( this.isSelected(item.value) ) {
							return <Form.Field><Checkbox label={item.label} value={item.value}/></Form.Field>
						}
					}) }
					<Form.Field>
						<Input fluid 
						size="mini"
						action={{
							color: 'secondary',
							size: 'mini',
							content: 'Sign Up',
						}}
						placeholder='Email Address'
						/>
					</Form.Field>
				</Form>
				</SemanticCard.Content>

			</SemanticCard>
		)
	}	
}

export default FollowUs;