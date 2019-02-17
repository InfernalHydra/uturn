import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export default Orders = new Mongo.Collection('orders');

if(Meteor.isServer)
{
    Meteor.publish('orders', () => {
        return Orders.find({});
    })
}

function getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
    var R = 3959; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

Meteor.methods({
    'orders.add'(location, destination)
    {
        check(position, Object);
        check(destination, Object);
        const currUser = Meteor.users.find({_id : this.userId});
        console.log(currUser);
        Orders.insert({car : currUser.car, location, destination, userID : this.userId});
    },
    'orders.findNearMe'(lat, lng)
    {
        check(lat, Number);
        check(lng, Number);
        var ret = [];
        Orders.find({}).fetch().forEach((order) => {
            // console.log(order);
            var foo = getDistanceFromLatLonInMi(lat, lng, order.location.lat, order.location.lng);
            //console.log(foo);
            ret.push(order);
        })
        // console.log(ret)
        return ret.slice(0, 5);
    }
});