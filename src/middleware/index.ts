import { Express ,  Application }  from 'express' ; 
const bcrypt = require('bcrypt-nodejs') ; 
import express from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
const bodyParser = require('body-parser') ; 
const path = require('path') ; 
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const passport = require('passport') ; 
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy ; 
const cors = require('cors');

module.exports = async function ( app : Application , db : DBInterface ) :Promise<boolean>{
	
	//méthode de l'extenssion chrome 
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
	   	next();
	});
	/*  On fait la délaration de tout les midleware ICI */
	app.use(express.json());
	app.use('/assets',express.static(path.join(__dirname, '../resources/assets'), {
	 	maxAge : 3600000 // 3600000msec == 1hour
	})) ;
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	// parse application/json
	app.use(bodyParser.json())
	app.use(cookieParser());
	app.use(session({
	  	secret: 'secret',
	  	saveUninitialized: true,
	  	resave: true
	})); 
	app.use(cors({ origin: 'https://trello.com' }));
	//inection de remember token
	app.use(require('./flash'));
	app.use(require('./lang')) ;
	app.use(require('./response')) ;
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(passport.authenticate('remember-me'));
	//app.use(require('./response')) ;

	/*
	 * 	Authentification sur passport JS 
	*/
	passport.use( new LocalStrategy(
		{  usernameField: "email" },
		function(  email, password, done) {
		   	db.User.findOne({
			    where: { email }
		    }).then(function(dbUser) {
		      	if (!dbUser) {
			        return done(null, false , ''  );
			    }
			    else if ( ! bcrypt.compareSync(password, dbUser.password) ) {
		    		return done(null, false , '' );
			    }
		      	return done(null, dbUser);
		    });
		}
	));
	passport.use( new RememberMeStrategy(
		function(rememberToken, done) {
			if (typeof rememberToken !== 'string') {
				return done(null, rememberToken);
			}
		    db.User.findOne({ 
			    where: { rememberToken }
		    }).then(function(dbUser) {
		    	if (!dbUser) {
			        return done(null, false);
			    }
		      	return done(null, dbUser);
		    });
		}, 
		function ( user,done ) {
			if ( user.rememberToken ) {
				return done( null, user.rememberToken ); 
			}
		}
	));
	passport.serializeUser(function(user, cb) {
	  	cb(null, user);
	});
	passport.deserializeUser(function(obj, cb) {
	  	cb(null, obj);
	});
	return new Promise<boolean>( resolve => resolve( true ));
};