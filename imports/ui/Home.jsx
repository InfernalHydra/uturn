import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';



class Home extends Component {
    constructor (props) {
        super(props);
        console.log(this.props);
    }
    render() {
        let theme = this.props.theme.palette;
        console.log (theme);
        return (
        <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} >
                <p style={{textAlign:'center'}}>
                Are you a ...?
                </p>                
                
            </Grid>
            <Grid item xs={6} style={{height:'25vh', textAlign:'center'}}>
                <div style={{border: "1px solid " + theme.primary.main}}>
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
                <div style={{border: "1px solid " + theme.secondary.main}}>
                    Responder
                </div>
            </Grid>
        </Grid>
        )
    }
}

export default withTheme()(Home)