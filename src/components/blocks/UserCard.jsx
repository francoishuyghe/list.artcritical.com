import React from 'react';
import ListActions from '../../actions/ListActions';
import AuthActions from '../../actions/AuthActions';
//Components
import ImageBlock from './imageBlock'
import DateBlock from './DateBlock'
import UserEdit from '../forms/UserEdit'
import { Form, FormGroup, Label, Input, Alert, Button, Collapse } from 'reactstrap';


export default class UserCard extends React.Component {

	constructor (props){
        super(props);

    	this.state = { collapse: false };

        this.saveChanges = this.saveChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)){
           	console.log(nextProps.user);
        }
    }
    
    handleChange(event) {
        //Update values of inputs
       AuthActions.userInfoChange(event, this.props.index);
    }

    saveChanges(event){
    	event.preventDefault();
        AuthActions.updateUser(this.props.user)
    }

    toggleForm() {
    	this.setState({ collapse: !this.state.collapse });
  	}


    render() {
		
    	let user = this.props.user;
		let userAccess = accessCode => ({
			3: 'Super Admin',
			2: 'Admin',
			1: 'Editor',
			0 : 'Subscriber'
		})[accessCode]


        
    return (
        <div className="user">
      
			<div className="image">
				<ImageBlock image={user.avatar} />

			</div>
			  	<div>
        		<p>{`${user['firstname']} ${user['lastname']}`}</p>
				<p>{user.local.username}</p>
				<p>{userAccess([this.props.user.userAccess])}</p>
        	</div>
			<div className="info">
			<Button color="primary" onClick={this.toggleForm}>{this.state.collapse? 'Close': 'Edit'}</Button>
			<Collapse isOpen={this.state.collapse}>

				<UserEdit 
					user={user} 
					handleChange={this.handleChange}
					saveChanges={this.saveChanges}
					/>
			
			</Collapse>
			</div>
		</div>
    );
  }
}