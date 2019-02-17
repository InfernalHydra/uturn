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

Meteor.methods({
    'orders.add'(location, destination)
    {
        check(position, Object);
        check(destination, Object);
        const currUser = Meteor.users.find({_id : this.userId});
        console.log(currUser);
        Orders.insert({car : currUser.car, location, destination, userID : this.userId});
    }
});