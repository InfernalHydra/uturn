import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

import anime from 'animejs';

class SideDriver extends Component {
    constructor (props) {
        super(props);        
        //license
        //insurance
        //model
        //color
        this.state = {ttBox:false}
        //
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show != this.props.show) {
            console.log('up')
            let timeline = anime.timeline({
                easing: 'easeInOutQuad',
                duration:1000,
                complete: (anim) => {
                    //this.setState({ttBox:nextProps.show})
                }
            });
            if (nextProps.show) {
                timeline.add({
                    targets:'#dribar',
                    width: '50vw',
                })
                timeline.add({
                    targets:'#driform',
                    opacity: 1,
                })
            }
            else {
                timeline.add({
                    targets:'#driform',
                    opacity: 0,
                })  
                timeline.add({
                    targets:'#dribar',
                    width: '0vw',
                })
                
            }
            return true;
        }
        return true;
    }
    render() {
        
        
            return (
                <div id="dribar" style={{color: 'rgba(0,0,0,0)', height:'90vh', width:'0vw', left:'47.8%', position:"absolute", backgroundColor:"#ff4365"}}>
                    <div id='driform' style={{opacity:0}}>
                        <Grid container alignItems='center' spacing={8} style={{padding: '10px'}}>
                            <Grid item xs = {12}>
                                <TextField
                                        style = {{width : '250px'}}
                                        id = 'title'
                                        label = "Title"
                                        type = 'text'
                                ></TextField>
                            </Grid>
                            <Grid item xs = {12}>
                                <TextField
                                        style = {{width : '250px'}}
                                        id = 'title'
                                        label = "Title"
                                        type = 'text'
                                ></TextField>
                            </Grid>    
                        </Grid>
                        
                    </div>
                    
                </div>
            )        
        
    }
}
export default SideDriver;