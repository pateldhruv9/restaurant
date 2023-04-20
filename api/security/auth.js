"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = void 0;
var jwt = require("jsonwebtoken");
var users_1 = require("../model/users");
var api_config_1 = require("./api-config");
var dbUsers = require('../db.json')
var handleAuthentication = function (req, resp) {
    console.log("Entered");
    var user = req.body;
    users_1.users = dbUsers.users
    var dbUser = users_1.users;
    console.log(dbUser,"dbUser",users_1.users,"user",user);
    dbUser.forEach((users)=>{
        console.log(users,"from here ----------->",user.email);
        if(users.email == user.email){
            console.log("true here ");
            var token = jwt.sign({
                sub: users.email,
                iss: 'restaurant-api'
            }, api_config_1.apiConfig.secret);
            resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
        }
    })
    // if (isValid(user)) {
    //     var dbUser =user;
       
    // }

};
exports.handleAuthentication = handleAuthentication;
// function isValid(user) {
//     if (!user) {
//         return false;
//     }

//     // return dbUser !== undefined && dbUser.includes(user.email)
// }

// function truedata() {
//     return true;
// }
