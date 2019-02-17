import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';

import SideDriver from './SideBars/SideDriver';
import SideResponder from './SideBars/SideResponder';
import anime from 'animejs';

class Home extends Component {
    constructor (props) {
        super(props);        
        this.state = {res:false, dri:false};
    }
    openRes() {
        this.setState({res:!this.state.res});        
    }    
    openDri() {
        this.setState({dri:!this.state.dri});        
    }    
    render() {
        let theme = this.props.theme.palette;
        console.log(this.state);
        return (
            <div>
                <Grid container spacing={0} style={{position:'absolute'}}>
                    <SideResponder show={this.state.res}></SideResponder>
                    <SideDriver show={this.state.dri}></SideDriver>
                </Grid>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} >
                        <p style={{textAlign:'center'}}>
                        Are you a ...?
                        </p>                
                        
                    </Grid>
                    <Grid item xs={6} style={{height:'25vh', textAlign:'center'}}>
                        <div id='driver' onClick={this.openDri.bind(this)}style={{border: "1px solid " + theme.primary.main}}>
                            Driver
                        </div>
                    </Grid>
                    <Grid item xs = {6}></Grid>
                    <Grid item xs = {12} style={{height:'25vh'}}>
                        <p style={{textAlign:'center'}}>
                            or
                        </p>                
                    </Grid>
                    <Grid item xs = {6}></Grid>
                    <Grid  item xs={6} style={{height:'20vh', textAlign:'center'}}>
                        <div onClick={this.openRes.bind(this)} style={{border: "1px solid " + theme.secondary.main}}>
                            Responder
                        </div>
                    </Grid>
                </Grid>
        
            </div>
        
        )
    }
}

export default withTheme()(Home)