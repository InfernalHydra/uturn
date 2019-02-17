import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

Accounts.validateNewUser((user) => {
    if(user.username === "") {
        throw new Meteor.Error('bad-username', "Username may not be empty");
      }
    
      if(user.fullName === "") {
        throw new Meteor.Error("bad-name", "Name may not be empty");
      }
    
      if(user.emails[0] === "") {
        throw new Meteor.Error('bad-email', "Email may not be empty");
      }
      return true;
});

Accounts.onCreateUser((options, user) => {
    console.log(user);
    return user;
})
const userFields = {_id: 1, emails: 1, profile: 1, username: 1, balance: 1, car : 1};

Meteor.publish("user", () => {
  return Meteor.users.find({}, {fields: userFields});
});

Meteor.publish("user.byId", (userId) => {
  return Meteor.users.find({_id : userId}, {fields: userFields})
});