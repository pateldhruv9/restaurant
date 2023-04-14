"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = void 0;
var jwt = require("jsonwebtoken");
var users_1 = require("../model/users");
var api_config_1 = require("./api-config");
var handleAuthentication = function (req, resp) {
    console.log("Entered");
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({
            sub: dbUser.email,
            iss: 'restaurant-api'
        }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Invalid data' });
    }
};
exports.handleAuthentication = handleAuthentication;
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
