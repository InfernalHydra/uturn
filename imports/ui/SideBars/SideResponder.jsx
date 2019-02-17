import React, {Component} from 'react';
import anime from 'animejs';
class SideResponder extends Component {
    constructor (props) {
        super(props); 
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show != this.props.show) {
            console.log('up')
            let timeline = anime.timeline({
                targets:'#resbar',
                easing: 'easeInOutQuad',
                duration:1000,
                complete: (anim) => {
                    //this.setState({ttBox:nextProps.show})
                }
            });
            if (nextProps.show) {
                timeline.add({
                    scaleX: 1
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
                    scaleX: 0,
                })
                
            }
            
            
                        
            return true;
        }
        return true;
    }
    render() {
        return (
            <div id="resbar" style={{transformOrigin: '100% 50%', transform:'scaleX(0)', color: 'rgba(0,0,0,0)', height:'90vh', width:'50vw', left:'-2.2%', position:"absolute", backgroundColor:"blue"}}>
                This is some stuff;
            </div>
        )    
    }
}
export default SideResponder;