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
            currLocation: {},
            destination: {},
            currLocationRaw: "",
            destinaitonRaw: "",
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
        Meteor.call('orders.add', currLocation, destination);
    }
    render()
    {
        if(!this.props.currentUser)
        {
            return <Redirect to="/" />
        }

        return(
            <div id = 'register-container' style = {{width : '80%', margin : 'auto'}}>
                <h1 style={{textAlign : "center"}}>Order a Driver</h1>
                    <TextField
                        label="Car Location"
                        value={this.state.fullName}
                        onChange={this.handleChange.bind(this, 'currLocationRaw')}
                        error={this.state.nameError}
                        helperText={this.state.nameError}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Car Destination"
                        value={this.state.username}
                        onChange={this.handleChange.bind(this, 'destinaitonRaw')}
                        error={this.state.usernameError}
                        helperText={this.state.usernameError}
                        fullWidth
                    >
                    </TextField>
                    <Button variant="contained" color="primary" onClick = {this.handleSubmit.bind(this)}>Submit</Button>
            </div>
        );
    }
}