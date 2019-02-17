import React, {Component} from 'react';
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
                targets:'#dribar',
                easing: 'easeInOutQuad',
                duration:1000,
                complete: (anim) => {
                    //this.setState({ttBox:nextProps.show})
                }
            });
            if (nextProps.show) {
                timeline.add({
                    width: '50vw',
                })
                timeline.add({
                    color: 'rgba(0, 0, 0, 1)',
                })
            }
            else {
                timeline.add({
                    color: 'rgba(0, 0, 0, 0)',
                })
                timeline.add({
                    width: '0vw',
                })
                
            }
            
            
                        
            return true;
        }
        return true;
    }
    render() {
        
        
            return (
                <div id="dribar" style={{color: 'rgba(0,0,0,0)', height:'90vh', width:'0vw', left:'47.8%', position:"absolute", backgroundColor:"#8E0202"}}>
                    This is some stuff;
                </div>
            )        
        
    }
}
export default SideDriver;