"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.User = void 0;

var dbData = require('../db.json');

var User =
/** @class */
function () {
  function User(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  User.prototype.matches = function (another) {
    return another !== undefined && another.email === this.email && another.password === this.password;
  };

  return User;
}();

exports.User = User;
var users = dbData.users; // new User('', 'Luis Alberto', '123456'),
//      new User('meg@gmail.com', 'Meguita', '123456'),
//      new User('apolo@gmail.com', 'Apolo', '123456'),

var userCall = function userCall(email, name, password) {
  var mail = "'".concat(email, "'");
  console.log(User.prototype);
  console.log(new User(email, name, password), email, name, password, "here print");
  users = users.push({
    email: email,
    name: name,
    password: password
  });
  console.log(this.users, "users");
};

exports.users = users;
exports.userCall = userCall;