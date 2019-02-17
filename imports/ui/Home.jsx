import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom'

import SideDriver from './SideBars/SideDriver';
import SideResponder from './SideBars/SideResponder';
import anime from 'animejs';

const ReactSVG = require('react-svg')


class Home extends Component {
    constructor (props) {
        super(props);        
        this.state = {res:false, dri:false};
    }
    render() {
        let theme = this.props.theme.palette;
        console.log(this.state);
        return (
            <div style={{margin:'10% 0'}}>                
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} >            
                        
                    </Grid>
                    <Grid item xs={6} style={{height:'25vh', textAlign:'center'}}>
                        <NavLink to='/driver'>
                            <div id='driver'>
                                <ReactSVG src="/Drivers.svg"></ReactSVG>
                            </div>
                        </NavLink>
                    </Grid>
                    <Grid item xs = {6}></Grid>
                    <Grid item xs = {6} style={{height:'25vh'}}></Grid>
                    <Grid item xs = {6} style={{height:'25vh'}}></Grid>
                    <Grid item xs = {6}></Grid>
                    <Grid  item xs={6} style={{height:'20vh', textAlign:'center'}}>
                        <NavLink to='/res'>
                            <div>
                                <ReactSVG src="/Responders.svg"></ReactSVG>
                            </div>
                        </NavLink>

                    </Grid>
                </Grid>
        
            </div>
        
        )
    }
}

export default withTheme()(Home)