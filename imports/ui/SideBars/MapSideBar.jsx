import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor';

export default class MapSideBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data : [],
        }
    }
    componentDidMount()
    {
        this.tick();
        this.timer = setInterval(() => this.tick(), 5000);
    }
    tick()
    {
        var self = this;
        Meteor.call('orders.findNearMe', this.props.centerLat, this.props.centerLng, this.props.otherLat, this.props.otherLng, (err, res) => {
            if(err)
            {
                alert(err);
            }
            else
            {
                //console.log(res);
                self.setState({data : res});
            }
        })
    }
    componentWillUnmount()
    { 
        clearInterval(this.timer);
    }
    render()
    {
        return(
            <div id='map-side-bar-container' style = {{width : "30%", 
            height: "90vh", position: "absolute", zIndex: 1000000000, 
            right: 0, textAlign : "left", marginRight : "20px", backgroundColor:'rgba(255,255,255,0.5)'}}>
                <h1 style={{textAlign:'center'}}>NEARBY REQUESTS</h1>
                <div style={{textAlign:'center'}}>___________________</div>

                {this.state.data !== [] && this.state.data.map((order, index) => {
                    return (
                    <div style={{margin:'auto', padding:'5px', border:'solid black', borderTop:'1px', borderBottom:'1px', borderRadius:'2px'}} id='wrapper' key = {index}>
                        <div>{"Car Model: " + order.car.carModel}</div>
                        <div>{"Car Color: " + order.car.carColor}</div>
                        <br/>
                        <div>{"License Number: " + order.car.licenseNumber}</div>
                        <div>{"Distance Saved: " + order.weight + " mi"}</div>
                        <br/>
                        <div style={{textAlign:'center'}}>________________</div>

                    </div>
                    );
                })}
            </div>
        );
    }
}