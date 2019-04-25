"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var bcrypt = __importStar(require("bcrypt"));
var LocalStrategy = require('passport-local').Strategy;
module.exports = function (req, res, next) {
    passport.use(new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
        db.User.findOne({
            where: { email: email }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false);
            }
            else if (!bcrypt.compareSync(password, dbUser.password)) {
                return done(null, false);
            }
            return done(null, dbUser);
        });
    }));
    passport.use('token-local', new LocalStrategy({ usernameField: "rememberToken" }, function (rememberToken, password, done) {
        db.User.findOne({
            where: { rememberToken: rememberToken }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false);
            }
            return done(null, dbUser);
        });
    }));
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
