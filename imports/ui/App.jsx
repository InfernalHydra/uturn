import React, {Component} from 'react'
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {createMuiTheme} from '@material-ui/core/styles/'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {red} from '@material-ui/core/colors/red'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, ExpansionPanelSummary } from '@material-ui/core';
import {withTracker} from 'meteor/react-meteor-data'

import Home from './Home';

const muiTheme = createMuiTheme({
    typography: {        
        fontFamily: "'Barlow Condensed', sans-serif",
        textTransform: "none"
    },
    palette: {
      primary: {
            main: '#c1666b',
      },
      secondary: {
            main: '#575d90',
      },
    },
  });

  class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            open : false,
            iOS : process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
        }
    }
    logout()
    {
        Meteor.logout((err) => {if(err) alert(err);});
    }

    login()
    {
        Meteor.loginWithFacebook((err) => {
            if(err) alert(err);
        });
    }

    render()
    {
        return(
        <MuiThemeProvider theme = {muiTheme}>
            <BrowserRouter>
                <div id = "content">
                    <AppBar>
                        <Toolbar color = 'secondary' style = {{display : 'flex', flexFlow : 'row nowrap', justifyContent : "space-between"}}>
                            pass
                        </Toolbar>
                    </AppBar>

                    <div id = "main-content" style = {{paddingTop : '50px', fontFamily : "'Barlow Condensed', sans-serif"}}>
                        <Switch>
                            <Route exact path = '/' component = {Home}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
        );
    }
}

export default App;