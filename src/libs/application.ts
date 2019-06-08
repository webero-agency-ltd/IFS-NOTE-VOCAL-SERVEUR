var site = require('../config/site') ;
var request = require('../libs/request') ;
var user = require('../libs/user');
var team = require('../libs/team');
import to from '../libs/promise';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import { UserAttributes, UserInstance } from '../models/user';
import * as Sequelize from 'sequelize';
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
var AppError = require('../libs/AppError');

/*
 * Classe de manipulation des actions vers trello 
*/

class app {
	
	/*
	 * Récupération de tout les information d'un application en particulier 
	 * et ce avec tout les statistique qui va avec 
	*/
	async item( id ){
		let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Application } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Application.findOne({
		    where 
	    })) 
		data as ApplicationInstance ;
		if (err) 
	    	throw new AppError('A0001');
	    return data ;  
	}

	/*
	 * Récupération de tout les applications d'un user, celle qu'il a crée 
	 * et aussi tout celle dans ma quelle il est membres 
	 * ou si la fonction na pas d'utilisateur passer en paramètre 
	 * on cherche tout les applications de cette platforme  
	*/
	async all( id ){
		let teams = await team.all( id ) ; 
		if ( !teams ) {
			return [];
		}
	    //a partire des teams de l'utilisateur, on fait la recherche des 
	    //application qui correspond au teams 
	    let apps = [] ; 
	    for (const e of teams ) {
			let [ err , data ] = await to(e.getApplication()) 
	    	if ( !err ) {
	    		let app = data.toJSON() ;
	    		//ajout de role dans l'objectapplication qui est récupére 
	    		app = { user_role : e.role , ...app }
	    		apps = [ app , ...apps ]
	    	}
		}
		return  apps ;
	}

	/*
	 * Mise a jour d'un information d'un application en question
	*/
	async update( id , objs ){
		let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Application } = global['db'] as DBInterface ;
		let [ err , data ] = await to( Application.find({ where }) ) 
		data as ApplicationInstance ;
	    if (err) 
	    	throw new AppError('ARE001');
	    let i = data ;
	    [ err , data ] = await to( i.update( objs ) ) ;
	    if ( err )  
	    	throw new AppError('ARE003');
	    return data ;
	}

	/*
	 * Création d'application 
	*/
	async create( obj , user_id ){

		let unique = makeid(26)+makeid(3); 
		let { Application } = global['db'] as DBInterface ;
		//création de compte infusionsoft 
		let [ err , data ] = await to(Application.create( { ...obj , unique } )) 
	    if ( err )  
	    	throw new AppError('AC001');
		let app : ApplicationInstance ;
		app = data ; 
		//récupération de l'utilisateur et ajout de cette application a l'utilisateur 
		let u = await user.findById( user_id ) ;
	    if (!u) 
	    	throw new AppError('AC002');
	    //ajoute de l'utilisateur courant a l'application crée que ce soire un infusionsoft ou un trello 
	    data as Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
		[ err , data ] = await to(app.setAuthor( u )) 
	    if ( err ) 
	    	throw new AppError('AC003');
	    let newteam = await team.create( { type : obj.type } ) ; 
		if ( !newteam ) 
	    	throw new AppError('AC004');
	    //ratacher la team aux compte infusionsoft courant 
		[ err , data ] = await to(newteam.setApplication( app )) 
	    data as Sequelize.BelongsToSetAssociationMixin<ApplicationInstance, ApplicationInstance['id']> ;
	    if ( err ) 
	    	throw new AppError('AC005');
	    //ratacher la team a l'utilisateur courant 
		[ err , data ] = await to(newteam.setUser( u )) 
	    data as Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
	    if ( err ) 
	    	throw new AppError('AC006');
	    let url = null ; 
	    if ( obj.type == 'infusionsoft' ) {
			let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+app.id  ; 
			url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
			url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';		
		}else{
			let redirect_uri = site.urlapp + '/application/trello/redirect/'+app.id  ; 
			url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 
		}
	    return url ;

	}

	/*
 	 * Création de l'URL de réauthorisation de token
	*/
	async reauthorize( id ){
		let url = null ; 
		let app = await this.item( id ) as ApplicationInstance ; 
		if (!app) 
	    	throw new AppError('ARA001');
		if ( app.type == 'infusionsoft' ) {
			let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+app.id  ; 
			url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
			url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';
		}else{
			let redirect_uri = site.urlapp + '/application/trello/redirect/'+app.id  ; 
			url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 		
		}
		return url ;
	}

	/*
	 * Checker si un utilisateur un admin ou team d'une page ou non 
	*/
	async chackuser( token , id , type ){
		let u = await user.find( { rememberToken : token } ) ;
	    if (!u) 
	    	throw new AppError('ARA002');
	    let where = {} ; 
	    if (type=='infusionsoft') {
	    	where['compteId'] = id ; 
	    }else if( type == 'trello' ){
	    	where['url'] = id ; 
		}
	    console.log( where )
		let app = await this.item( where ) as ApplicationInstance ; 
		if (!app) 
	    	throw new AppError('ARA003');
	    let [ err , data ] = await to( u.getTeams( { where: { ApplicationId : app.id as number } }) ) 
	   	if ( err || !data ) 
	    	throw new AppError('ARA004');
	   	if ( data.length > 0 ) {
			return app
		}
		return null ;
	}

}

module.exports = new app() ; 