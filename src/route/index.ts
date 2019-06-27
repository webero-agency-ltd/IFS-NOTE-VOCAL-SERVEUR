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
const form = require('../controller/form') ;
const transferwise = require('../controller/transferwise') ;
const { hangel } = require('../libs/hangel') ;

module.exports = async function ( app : Application , db : DBInterface , str ) : Promise<boolean> {

	//controlleur de base de l'application qui vous affiche votre application  
	app.get('/',ensureAuth,home.index.bind({db})) ;
	app.get('/vocal-note',ensureAuth,home.index.bind({db})) ;
	app.get('/transferwise',home.transferwise.bind({db})) ;
	
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
	app.get('/user/authenticated', function(req, res){
		if ( req.user ) {
	  		return res.success( req.user );
	  	}
	  	return res.success( null );
	});

	app.get('/application',ensureAuth, hangel.bind( { func : application.index.bind({db}) } )) ;
	app.get('/application/item/:id',ensureAuth,hangel.bind({ func : application.item.bind({db}) })) ;
	app.get('/application/check/:id/:type',hangel.bind({ func : application.check.bind({db}) })) ;
	//app.get('/application/infusionsoft/findid',ensureAuth,application.create.bind({db})) ;
	app.get('/application/infusionsoft/redirect',ensureAuth,hangel.bind({ func : application.redirect.bind({db}) })) ;
	//app.get('/application/infusionsoft/info/:id',ensureAuth,application.infos.bind({db})) ;
	app.get('/application/trello/redirect/:id',ensureAuth,hangel.bind({ func : application.redirectTrello.bind({db}) })) ;
	app.post('/application',ensureAuth,hangel.bind({ func : application.create.bind({db}) })) ;
	app.get('/application/reauthorize/:type/:id',ensureAuth,hangel.bind({ func : application.reauthorize.bind({db,str}) })) ;
	
	app.get('/team/application/:id',ensureAuth,team.index.bind({db})) ;
	app.get('/team/:id/:type/:contactid',ensureAuth,team.create.bind({db})) ;

	//champ utiliser par infusionsoft membre

	app.get('/infusionsoft/membre/:id',ensureAuth,hangel.bind({ func : infusionsoft.membre.bind({db}) })) ;
	app.get('/infusionsoft/contacts/:id',ensureAuth, hangel.bind({ func : infusionsoft.contacts.bind({db}) }) ) ;
	app.get('/infusionsoft/note/:id',ensureAuth, hangel.bind({ func : infusionsoft.notes.bind({db}) }) ) ;
	app.get('/infusionsoft/task/:id',ensureAuth, hangel.bind({ func : infusionsoft.tasks.bind({db}) }) ) ;
	app.get('/infusionsoft/on/:id',hangel.bind({ func : infusionsoft.event.bind({db,str}) })) ;
	app.post('/infusionsoft/on/:id',hangel.bind({ func : infusionsoft.event.bind({db,str}) })) ;
	app.get('/infusionsoft/destroyHook/:id',hangel.bind({ func : infusionsoft.destroyHook.bind({db,str}) })) ;
	app.get('/infusionsoft/setnote/:unique/:nativeId',hangel.bind({ func : infusionsoft.setnote.bind({db,str}) })) ;
	//route des notes
	app.get('/note/:id',hangel.bind({ func : note.item.bind({db,str}) })) ;
	app.get('/note/nativeId/:id',hangel.bind({ func : note.itemNativeId.bind({db,str}) })) ;
	app.get('/note/check/:id',hangel.bind({ func : note.check.bind({db,str}) })) ;
	app.post('/note/checks',hangel.bind({ func : note.checks.bind({db,str}) })) ;
	app.get('/notes/:id',hangel.bind({ func : note.index.bind({db,str}) })) ;
	//app.get('/close/:id',ensureAuth,note.close.bind({db,str})) ;
	app.get('/audio/:id', hangel.bind({ func : note.listen.bind({db,str}) }) ) ; 
	//app.get('/audio/delete/:id',ensureAuth,note.deleteNote.bind({db,str})) ;

	app.post('/upload',ensureAuth,hangel.bind({ func : note.upload.bind({db,str}) })) ;
	//app.post('/save/:id',note.save.bind({db,str})) ;

	//tansvase notes 
	//transvase task 
	//app.get('/tansvase/notes/:id',tansvase.notes.bind({db,str})) ;
	//app.get('/tansvase/tasks/:id',tansvase.tasks.bind({db,str})) ;
	
	//trello ICI 
	app.get('/trello',trello.view) ;
	app.post('/trello/boards/:id',ensureAuth,hangel.bind({ func : trello.boardsUpdate.bind({db,str}) })) ;
	app.get('/trello/boards/:id',ensureAuth,hangel.bind({ func : trello.boards.bind({db,str}) })) ;
	app.get('/trello/lists/:id',ensureAuth,hangel.bind({ func : trello.lists.bind({db,str}) })) ;
	app.get('/trello/label/:id',ensureAuth,hangel.bind({ func : trello.label.bind({db,str}) })) ;
	app.get('/trello/membre/:id',ensureAuth,hangel.bind({ func : trello.membre.bind({db,str}) })) ;
	app.get('/trello/on/:id',hangel.bind({ func : trello.event.bind({db,str}) })) ;
	app.post('/trello/on/:id',hangel.bind({ func : trello.event.bind({db,str}) })) ;

	app.get('/external',ensureAuth,hangel.bind({ func : external.index.bind({db}) })) ;
	app.post('/external',ensureAuth,hangel.bind({ func : external.create.bind({db}) })) ;
	app.post('/external/note',ensureAuth,hangel.bind({ func : external.note.bind({db}) })) ;

	//application externale autre celle
	app.get('/pour/:application',ensureAuth,hangel.bind({ func : pour.index.bind({db}) }) ) ;
	app.post('/pour',ensureAuth,hangel.bind({ func : pour.create.bind({db}) })) ;
	app.delete('/pour/:id',ensureAuth,hangel.bind({ func : pour.delet.bind({db}) })) ;

	//création de formulaire 
	app.get('/form/:id',ensureAuth,hangel.bind({ func : form.index.bind({db}) })) ;
	app.post('/form/:id',ensureAuth,hangel.bind({ func : form.create.bind({db}) })) ;

	//API transferwise ( seulement dans l'application du client pour ne pas crée plusieur serveur et le rendre vraiment compliquer a maintenire )
	app.get('/transferwise/profiles',ensureAuth,hangel.bind({ func : transferwise.profiles.bind({db}) })) ;
	app.get('/transferwise/transfers',ensureAuth,hangel.bind({ func : transferwise.transfers.bind({db}) })) ;
	app.post('/transferwise/transfers',ensureAuth,hangel.bind({ func : transferwise.transfers_create.bind({db}) })) ;
	app.get('/transferwise/transfers/key',ensureAuth,hangel.bind({ func : transferwise.find.bind({db}) })) ;
	app.post('/transferwise/transfers/key',ensureAuth,hangel.bind({ func : transferwise.create.bind({db}) })) ;
	//récupération des transwise 
	
	return new Promise<boolean>( resolve => resolve( true ));
	
} 