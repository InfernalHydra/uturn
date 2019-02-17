import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export default Users = Meteor.users;

Users.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

Meteor.methods({
});