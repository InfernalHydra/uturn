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
    'orders.add'(car, position)
    {
        check(car, Object);
        check(position, Object);
        Orders.insert({car, position, userID : this.userId});
    }
});