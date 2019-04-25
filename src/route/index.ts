import { Express ,  Application }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import ensureAuth from '../libs/ensureAuth';
//const passport = require('passport');
//const validator = require("../request/");  
const signup = require('../controller/signup') ;
module.exports = async function ( app : Application , db : DBInterface ) : Promise<boolean> {
	//controlleur de base de l'application qui vous affiche votre application  
	app.get('/',ensureAuth,require('../controller/index').bind({db})) ;
	app.get('/audio/:filename', require('../controller/notes/listen').bind({db}));
	app.post('/upload', require('../controller/notes/upload').bind({db}));
	//page d'authentification 
	app.get('/login',require('../controller/login').bind({db})) ;
	app.get('/signup',signup.page.bind({db})) ;
	app.post('/signup',signup.create.bind({db})) ;
	return new Promise<boolean>( resolve => resolve( true ));
} 