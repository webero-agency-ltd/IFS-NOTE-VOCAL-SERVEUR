import { Express ,  Application }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import ensureAuth from '../middleware/ensureAuth';
import strategy from '../middleware/strategy';
//const passport = require('passport');
//const validator = require("../request/");  
const signup = require('../controller/signup') ;
const login = require('../controller/login') ;
const application = require('../controller/application') ;
const team = require('../controller/team') ;
const note = require('../controller/note') ;
const tansvase = require('../controller/tansvase') ;
const trello = require('../controller/trello') ;
const home = require('../controller/index') ;
const infusionsoft = require('../controller/infusionsoft') ;
const external = require('../controller/external') ;
const pour = require('../controller/pour') ;

module.exports = async function ( app : Application , db : DBInterface , str ) : Promise<boolean> {

	//controlleur de base de l'application qui vous affiche votre application  
	app.get('/',ensureAuth,home.index.bind({db})) ;
	app.get('/vocal-note',ensureAuth,home.vocalNote.bind({db})) ;
	
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

	app.get('/application',ensureAuth,application.index.bind({db})) ;
	app.get('/application/item/:id',ensureAuth,application.item.bind({db})) ;
	app.get('/application/check/:id/:type',application.check.bind({db})) ;
	//app.get('/application/infusionsoft/findid',ensureAuth,application.create.bind({db})) ;
	app.get('/application/infusionsoft/redirect',ensureAuth,application.redirect.bind({db})) ;
	app.get('/application/infusionsoft/info/:id',ensureAuth,application.infos.bind({db})) ;
	app.get('/application/trello/redirect/:id',application.redirectTrello.bind({db,str})) ;
	app.post('/application',ensureAuth,application.create.bind({db})) ;
	app.get('/application/reauthorize/:type/:id',application.reauthorize.bind({db,str})) ;
	
	app.get('/team/application/:id',ensureAuth,team.index.bind({db})) ;
	app.get('/team/:id/:type/:contactid',ensureAuth,team.create.bind({db})) ;

	//champ utiliser par infusionsoft 
	app.get('/infusionsoft/membre/:id',ensureAuth,infusionsoft.membre.bind({db})) ;
	app.get('/infusionsoft/contacts/:id',ensureAuth,infusionsoft.contacts.bind({db})) ;

	//route des notes
	app.get('/note/:id',note.item.bind({db,str})) ;
	app.get('/note/check/:id',note.check.bind({db,str})) ;
	app.post('/note/checks',note.checks.bind({db,str})) ;
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
	
	//trello ICI 
	app.get('/trello',trello.view.bind({db,str})) ;
	app.get('/trello/boards/:id',ensureAuth,trello.boards.bind({db,str})) ;
	app.get('/trello/lists/:id',ensureAuth,trello.lists.bind({db,str})) ;
	app.post('/trello/boards/:id',ensureAuth,trello.boardsUpdate.bind({db,str})) ;
	app.get('/trello/membre/:id',ensureAuth,trello.membre.bind({db})) ;

	app.get('/external',ensureAuth,external.index.bind({db})) ;
	//ici on fait la création de notes 
	app.post('/external',ensureAuth,external.create.bind({db})) ;

	//application externale autre celle
	app.get('/pour',ensureAuth,pour.index.bind({db})) ;
	app.post('/pour',ensureAuth,pour.create.bind({db})) ;
	app.delete('/pour/:id',ensureAuth,pour.delet.bind({db})) ;

	return new Promise<boolean>( resolve => resolve( true ));
	
} 