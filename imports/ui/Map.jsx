import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import GoogleMapReact from 'google-map-react'
import { Meteor } from 'meteor/meteor';
import Orders from '../api/orders.js'
import Pin from './Pin'


const pick = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});

async function coordsToAddress(lat, lng)
{
    Geocode.setApiKey("AIzaSyDwycw2h_XzL94n0bSXRxbXX8rrSXOaD3w");
    Geocode.enableDebug();
    let promise = Geocode.fromLatLng(lat, lng).then((result, err) => {
        console.log(result);
        Session.set('address', result[0].formatted_address)
    });
    let data = await promise;
    return data[0].formatted_address;
    
} 
// coordsToAddress(32.8359936, -97.3160448);
class Map extends Component
{
    render()
    {
        if(!this.props.isReady)
        {
            return <div>loading...</div>
        }
        console.log(this.props.orders);
        //console.log(this.props.points.map(pick('lat', 'lng')));
        // Meteor.call('points.findNearby', 32.8359936, -97.3160448);        
        return(
            <div id="map-container" style={{height : "90vh"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key : "AIzaSyDwycw2h_XzL94n0bSXRxbXX8rrSXOaD3w"}}
                    defaultCenter = {this.props.center}
                    defaultZoom = {this.props.zoom}
                >
                {this.props.orders.map((point,index) => {
                    return (
                        <Pin key={index} path='/map-marker-green.svg' lat = {point.destination.lat} lng = {point.destination.lng} />
                    );
                })}
                                {this.props.orders.map((point,index) => {
                    return (
                        <Pin key={index} path='/map-marker-red.svg' lat = {point.location.lat} lng = {point.location.lng} />
                    );
                })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('orders');
    return ({
        isReady : subscription.ready(),
        orders : Orders.find({}).fetch()
    })
})(Map);