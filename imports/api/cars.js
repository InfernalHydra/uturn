import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export default Cars = new Mongo.Collection('cars');

if(Meteor.isServer)
{
    Meteor.publish('cars', () => {
        return Cars.find({});
    })
}

Cars.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

Meteor.methods({
    'cars.add'(licensePlateNumber, insuranceNumber, carModel, carColor)
    {
        check(licensePlateNumber, String)
        check(insuranceNumber, String)
        check(carModel, String)
        check(carColor, String)
        if(!this.userId)
        {
            throw new Meteor.Error('not-authorized', "You are not logged in");
        }
        Cars.insert({licensePlateNumber, insuranceNumber, carModel, carColor, user : this.userId});
    },
    'cars.update'(carID, licensePlateNumber, insuranceNumber, carModel, carColor)
    {
        check(licensePlateNumber, String)
        check(insuranceNumber, String)
        check(carModel, String)
        check(carColor, String)
        if(!this.userId)
        {
            throw new Meteor.Error('not-authorized', "You are not logged in");
        }
        Cars.update({_id : carID}, {$set : {licensePlateNumber, insuranceNumber, carModel, carColor}});
    }
});