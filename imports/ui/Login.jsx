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
            username: "",
            password: "",
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


    }
    render()
    {
        if(this.state.success) <Redirect to='/' />
        if(Meteor.user()) <Redirect to='/' />
        
        return(
            <div id = 'register-container' style = {{width : '80%', margin : 'auto'}}>
                <h1 style={{textAlign : "center"}}>Login</h1>
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
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this, 'password')}
                        fullWidth
                        error={this.state.passError}
                        helperText={this.state.passError}
                    >
                    </TextField>
                    <Button variant="contained" color="primary" onClick = {this.handleSubmit.bind(this)}>Register</Button>
            </div>
        );
    }
}