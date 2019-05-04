import { Express ,  Application }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import ensureAuth from '../middleware/ensureAuth';
import strategy from '../middleware/strategy';
//const passport = require('passport');
//const validator = require("../request/");  
const signup = require('../controller/signup') ;
const login = require('../controller/login') ;
const infusionsoft = require('../controller/infusionsoft') ;
const team = require('../controller/team') ;
const note = require('../controller/note') ;
const tansvase = require('../controller/tansvase') ;

module.exports = async function ( app : Application , db : DBInterface , str ) : Promise<boolean> {

	//controlleur de base de l'application qui vous affiche votre application  
	app.get('/',ensureAuth,require('../controller/index').bind({db})) ;
	
	//page d'authentification 
	app.get('/login',strategy,login.page.bind({db})) ;
	app.post('/login',strategy,login.create.bind({db})) ;
	app.get('/signup',signup.page.bind({db})) ;
	app.post('/signup',signup.create.bind({db})) ;
	app.get('/logout', function(req, res){
		//destruction de cookie rememberToken  
		res.clearCookie("me_identity");
		res.clearCookie("remember_me");
	  	req.logout();
	  	res.redirect('/');
	});

	app.get('/infusionsoft',ensureAuth,infusionsoft.index.bind({db})) ;
	app.get('/infusionsoft/check/:id',infusionsoft.check.bind({db})) ;
	app.get('/infusionsoft/item/:id',ensureAuth,infusionsoft.item.bind({db})) ;
	app.get('/infusionsoft/redirect',ensureAuth,infusionsoft.redirect.bind({db})) ;
	app.post('/infusionsoft',ensureAuth,infusionsoft.create.bind({db})) ;
	app.get('/infusionsoft/findid',ensureAuth,infusionsoft.create.bind({db})) ;
	app.get('/infusionsoft/info/:id',ensureAuth,infusionsoft.infos.bind({db})) ;
	
	app.get('/team/infusionsoft/:id',ensureAuth,team.index.bind({db})) ;
	app.get('/team/:id',ensureAuth,team.create.bind({db})) ;

	//route des notes
	app.get('/note/:id',note.item.bind({db,str})) ;
	app.get('/note/infusionsoft/:id',note.index.bind({db,str})) ;
	app.get('/close/:id',ensureAuth,note.close.bind({db,str})) ;
	app.get('/audio/:id',ensureAuth,note.listen.bind({db,str})) ;
	app.get('/audio/delete/:id',ensureAuth,note.deleteNote.bind({db,str})) ;
	app.post('/upload',ensureAuth,note.upload.bind({db,str})) ;
	app.post('/save/:id',note.save.bind({db,str})) ;

	//tansvase notes 
	//transvase task 
	app.get('/tansvase/notes/:id',tansvase.notes.bind({db,str})) ;
	app.get('/tansvase/tasks/:id',tansvase.tasks.bind({db,str})) ;
	return new Promise<boolean>( resolve => resolve( true ));
	
} 