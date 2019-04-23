import { Express ,  Application }  from 'express' ; 
import * as bcrypt from 'bcrypt' ;
import express from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
const bodyParser = require('body-parser') ; 
const path = require('path') ; 
const cookieParser = require('cookie-parser');
const session = require('express-session'); 

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
	app.use('/assets',express.static(path.join(__dirname, '../resources/asset'), {
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

	//app.use(passport.initialize());
	//app.use(passport.session());
	
	//app.use(require('./response')) ;
	//app.use(require('./lang')) ;

	return new Promise<boolean>( resolve => resolve( true ));
};