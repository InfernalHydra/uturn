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

Accounts.onCreateUser((user) => {
    user.balance = 0;
    return user;
})

Meteor.publish("user", (username) => {
  return Meteor.users.find({username: username}, {fields: userFields});
});

Meteor.publish("user.byId", (userId) => {
  return Meteor.users.find(userId, {fields: userFields})
});