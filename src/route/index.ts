import { Express ,  Application }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';

//const passport = require('passport');
//const validator = require("../request/"); 

module.exports = async function ( app : Application , db : DBInterface ) : Promise<boolean> {
	//controlleur de base de l'application qui vous affiche votre application  
	app.get('/',require('../controller/index').bind({db})) ;
	app.get('/audio/:filename', require('../controller/notes/listen').bind({db}));
	app.post('/upload', require('../controller/notes/upload').bind({db}));

	return new Promise<boolean>( resolve => resolve( true ));
} 