import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import GoogleMapReact from 'google-map-react'
import { Meteor } from 'meteor/meteor';
import Orders from '../api/orders.js'
import Pin from './Pin'
import MapSideBar from './SideBars/MapSideBar'

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
    constructor(props)
    {
        super(props)
        this.state = {
            centerLat : 0,
            centerLng : 0,
            otherLat : 0,
            otherLng : 0,
        };
    }

    componentWillMount()
    {
        // console.log(window.location.search);
        let foo = window.location.search.split(",");
        console.log(foo);
        let a = parseFloat(foo[0].substr(6));
        let b = parseFloat(foo[1].substr(5));
        let c = parseFloat(foo[2].substr(5));
        let d = parseFloat(foo[3].substr(4));
        this.setState({centerLat : a, centerLng : b, otherLat : c, otherLng : d}, () => {
            console.log(this.state);
        });
    }
    render()
    {
        if(!this.props.isReady)
        {
            return <div>loading...</div>
        }
        // console.log(this.props.orders);
        //console.log(this.props.points.map(pick('lat', 'lng')));
        // Meteor.call('points.findNearby', 32.8359936, -97.3160448);
        return(
            <div id="map-container" style={{height : "90vh"}}>
                <MapSideBar centerLat = {this.state.centerLat} centerLng = {this.state.centerLng} otherLat = {this.state.otherLat} otherLng = {this.state.otherLng}/>
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