import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Checkbox } from '@material-ui/core';
import {Accounts} from 'meteor/accounts-base';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom'
import { Meteor } from 'meteor/meteor';

const emailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
export default class Register extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fullName: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            termsInputValue: false,
            success : false,
        }
    }
    handleChange(field, event)
    {
        //console.log("field: " + field + " val: " + event.target.value);
        this.setState({
            [field] : event.target.value
        }); 
        //console.log(this.state);
    }
    handleSubmit()
    {
        var {
            fullName,
            username,
            email,
            password,
            passwordConfirm,
            termsInputValue,
            success
        } = this.state;
        console.log(this.state);

        if(!termsInputValue) {
            alert("Please agree to the terms and conditions.");
            return;
          }
      
          if(!email || !emailRegex.test(email)){
            this.setState({
              emailError: "Please enter a valid email"
            });
            return;
          }
          
          if(password.length < 7){
            this.setState({
              passError: 'Please enter a password with at least 7 characters'
            });
            return;
          }
      
          if(passwordConfirm !== password) {
            this.setState({
              passConfirmError: "The two passwords don't match"
            });
            return;
          }

          var option = {
            profile : {fullName},
            username,
            email,
            password,
          };
          Accounts.createUser(option, function createUserCallback(err) {
            if(err){
              switch(err.error) {
                case 'bad-username': 
                  this.setState({usernameError: err.reason});
                  break;
                case 'bad-name':
                  this.setState({nameError: err.reason});
                  break;
                case 'bad-key':
                  this.setState({keyError: err.reason});
                  break;
                default:
                  alert(err);
              }
            }else{
              this.setState({ success: true });
            }
          }.bind(this))

    }
    handleCheckboxChange()
    {
        this.setState({termsInputValue : !this.state.termsInputValue});
    }
    render()
    {
        if(this.state.success) <Redirect to='/' />
        if(Meteor.user()) <Redirect to='/' />
        
        return(
            <div id = 'register-container' style = {{width : '80%', margin : 'auto'}}>
                <h1 style={{textAlign : "center"}}>Register for an Account</h1>
                    <TextField
                        label="Name"
                        value={this.state.fullName}
                        onChange={this.handleChange.bind(this, 'fullName')}
                        error={this.state.nameError}
                        helperText={this.state.nameError}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleChange.bind(this, 'username')}
                        error={this.state.usernameError}
                        helperText={this.state.usernameError}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}
                        error={this.state.emailError}
                        helperText={this.state.emailError}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this, 'password')}
                        fullWidth
                        error={this.state.passError}
                        helperText={this.state.passError}
                    >
                    </TextField>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={this.state.passwordConfirm}
                        onChange={this.handleChange.bind(this, 'passwordConfirm')}
                        fullWidth
                        error={this.state.passConfirmError}
                        helperText={this.state.passConfirmError}
                    >
                    </TextField>
                    <div style = {{display : 'flex'}}>
                        <Checkbox 
                            value = {this.state.termsInputValue}
                            onChange = {this.handleCheckboxChange.bind(this)}
                        />
                        <p> I have read and agree to the Terms and Conditions</p>
                    </div>
                    <Button variant="contained" color="primary" onClick = {this.handleSubmit.bind(this)}>Register</Button>
            </div>
        );
    }
}