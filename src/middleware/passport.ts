import { Request , Response , NextFunction }  from 'express' ; 
const passport = require('passport') ; 
import * as bcrypt from 'bcrypt' ;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function ( req : Request , res : Response , next : NextFunction ) {

	passport.use(new LocalStrategy(
		{  usernameField: "email" },
		function(email, password, done) {
		   	db.User.findOne({
			    where: { email: email }
		    }).then(function(dbUser) {
		      	if (!dbUser) {
			        return done(null, false);
			    }
			    else if ( ! bcrypt.compareSync(password, dbUser.password) ) {
		    		return done(null, false);
			    }
		      	return done(null, dbUser);
		    });
		}
	));

	passport.use('token-local',new LocalStrategy(
		{ usernameField: "rememberToken" },
		function(rememberToken, password, done) {
		    db.User.findOne({
			    where: { rememberToken : rememberToken }
		    }).then(function(dbUser) {
		    	if (!dbUser) {
			        return done(null, false);
			    }
		      	return done(null, dbUser);
		    });
		}
	));

	passport.serializeUser(function(user, cb) {
	  	cb(null, user);
	});

	passport.deserializeUser(function(obj, cb) {
	  	cb(null, obj);
	});
	
} 

