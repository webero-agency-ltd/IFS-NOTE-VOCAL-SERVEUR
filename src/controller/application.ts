import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import to from '../libs/promise';

/*
 * Importation de tout les elements de modele a utiliser 
*/
import * as Sequelize from 'sequelize';
import { TeamInstance , TeamAttributes } from '../models/team';
import { UserAttributes, UserInstance } from '../models/user';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
/////////////////

const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');

const urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 

export function check( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User } = this.db as DBInterface ;
	//récupération 
	let { id , type } = req.params  ;
	let { token } = req.query ; 
	User.findOne({
	    where: { rememberToken : token }
    })
    	.then( u => {
	    	if ( u ) {
	    		if (type=='infusionsoft') {
	    			Application.find( { where: { compteId : id } } )
						.then(i => {
							if ( i ) {
								u.getTeams( { where: { ApplicationId : i.id as number } })
									.then(t => {
										if ( t.length > 0 ) {
											return res.json( {success : true} )
										}
										res.json( {error : true , code : 'CA0001' } )
									})
									.catch( e => res.json({ error : true , code : 'CA0002'}) );
							}else{
								res.json( {error : true , code : 'CA0001' } )
							}
						})
						.catch( e => res.json({ error : true , code : 'CA0002'}) );
	    		}else if( type == 'trello' ){
	    			//@todo : méthode de validation a cherche encore 
	    			return res.json( {success : true} )
	    		}
	    	}else{
	    		res.json({ error : true , code : 'CA0003'} )
	    	}
		})
		.catch( e => {
	  		e => res.json({ error : true , code : 'CA0004'} )
	  	});
	
}

//récupération d'un infusionsoft en particuler avec tout ces statistique 
export async function item( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Application , User } = this.db as DBInterface ;
	//récupération 
	let { id } = req.params  ;
	//@TODO : récupération de tout les autres informations de la statistique qui son utile 
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id } } )) 
    if ( err ) {
    	return res.error('AIT001') ; 
    }
    return res.success( data );

}

//récupération de tout les compte infusionsoft d'un utilisateur en question 
export async function index( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , Team , User } = this.db as DBInterface ;
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    if ( err ) {
    	return res.error('AID001') ; 
    }
    //récupération de tout les teams que l'utilisateur est connecter 
    data as Sequelize.HasManyGetAssociationsMixin<TeamInstance> ;
    [ err , data ] = await to(data.getTeams()) 
	if ( err ) {
    	return res.error('AID002') ; 
    }
    //a partire des teams de l'utilisateur, on fait la recherche des 
    //application qui correspond au teams 
    let apps = [] ; 
    for (const e of data) {
		[ err , data ] = await to(e.getApplication()) 
    	if ( !err ) {
    		let app = data.toJSON() ;
    		app = { user_role : e.role , ...app }
    		apps = [ app , ...apps ]
    	}
	}
    return res.success( apps );
	
}

//ici on a un redirection qui vien d'infusionsoft
export async function redirect( req:Request, res:Response ) {
	//@todo: utilisation des sessions ici, vérifier que l'utilisateur a bien un session InfusionsoftNull
	//on enregistre l'accessToken du compte infusionsoft en question
	let { Application , User , Team } = this.db as DBInterface ;
	let err = null ; 
	let data = null ;
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    let user = data ; 
    if ( err ) {
    	return res.error('AID000') ; 
    } 
	let lang = req.lang() ; 
	let { id , code } = req.query ; 
	let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+id  ;
	let url = 'https://api.infusionsoft.com/token' ; 
	let form = {
		client_id: site.clientId , 
    	client_secret: site.clientSecret, 
    	code , 
    	grant_type: 'authorization_code', 
    	redirect_uri : redirect_uri 
	};
	let formData = querystring.stringify(form);
	let contentLength = formData.length;
	request({
	    headers: {
	      'Content-Length': contentLength,
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    uri: url ,
	    body: formData,
	    method: 'POST'
	}, async function (error, _res , body) {
        //ici on enregistre ce token dans la base de donner infusionsoft en particulier  
		if (!error && _res.statusCode == 200) {
			let err = null ; 
			let data : ApplicationInstance ;
			[ err , data ] = await to( Application.find({ where: { id } }) ) 
		    if ( err ) {
		    	return res.error('ARE001') ; 
		    }
		    let i = data ;
            //update de l'access token dans le compte de l'application 
            //redirection a la page home de l'application 
      		//@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
      		//soket ouvert de l'application 
      		//s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application
            [ err , data ] = await to( i.update({ accessToken: body }) ) ;
		    if ( err ) { 
		    	return res.error('ARE003') ; 
		    }
		    let jsont : any; 
			try{
				jsont = JSON.parse( body ) ; 
			}catch( e ){
				jsont = {} ; 
			}
		    //récupération de l'information de l'utilisateur qui est connecté actuelement 
		    let url = urlAPI + '/users/?access_token='+jsont['access_token']  ; 
			return request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url,
			    method: 'GET'
			}, async function (error, _res, body) {	
				if (!error && _res.statusCode == 200) {
					let reponse : any[]; 
					try{
						reponse = JSON.parse( body ) ; 
					}catch( e ){
						reponse = [] ; 
					}
					if ( reponse['users'] ) {
						let { id } = reponse['users'][0] ;
						//récupération de la team de l'utilisateur en question 
						let data = null ; 
						data as TeamInstance ; 
						[ err , data ] = await to( Team.findOne({
						    where: { ApplicationId : i.id }
					    }) ) ;
					    let T = data ; 
					    [ err , data ] = await to( T.update({ contactid: id }) ) ;
					}
					return res.redirect('/') ;
		        }
		        return res.error('ARE004') ;  
			});
        }
        return res.error('ARE002') ; 
	});
}

//re-Récupération des url pour l'obtention des token API infusionsoft et API trello 
export async function reauthorize( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { type , id } = req.params ; 
	let err = null ; 
	let data : ApplicationInstance ;
	[ err , data ] = await to( Application.findOne({
	    where: { id }
    }) ) 
    if ( err ) {
    	return res.error('ARA001') ; 
    }
    let I = data ;
    if ( I.type == 'infusionsoft' ) {
		let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+I.id  ; 
		let url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
		url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';
		return res.success(url);			
	}else{
		let redirect_uri = site.urlapp + '/application/trello/redirect/'+I.id  ; 
		let url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 
		return res.success(url);			
	}

}


//tache chrone de mise a joure de accessToken
export function update( req:Request, res:Response ) {
	
}

//création d'URL d'authentification dans fusedesk 
export async function create( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	//récupération 
	let { name , compteId , type } = req.body ; 
	let userid = req.user.id;  
	//@todo: ICI, on change le méthode de création de ID 
	//on ne sais jamain si on tombe dans deux foix sur un id unique 
	let unique = makeid(7)+'-'+makeid(7)+'-'+makeid(7); 

	let err : any ; 
	let data  ;
	//création de compte infusionsoft 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.create({ name , unique , compteId , type , url : '' })) 
    if ( err ) {
    	return res.error('AC001') ; 
    }
    let I = data ; 

	//récupération des utilisateur courant 
    data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    if ( err ) {
    	return res.error('AC002') ; 
    }
    let user = data ; 

    //ajoute de l'utilisateur courant a l'application crée que ce soire un infusionsoft ou un trello 
    data as Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
	[ err , data ] = await to(I.setAuthor( user )) 
    if ( err ) {
    	return res.error('AC003') ; 
    }

    //Création de team de l'applications 
    data as TeamInstance ;
	[ err , data ] = await to(Team.create( { role : 'admin' , type } )) 
    if ( err ) {
    	return res.error('AC004') ; 
    }
    let newteam = data ; 

    //ratacher la team aux compte infusionsoft courant 
    data as Sequelize.BelongsToSetAssociationMixin<ApplicationInstance, ApplicationInstance['id']> ;
	[ err , data ] = await to(newteam.setApplication( I )) 
    if ( err ) {
    	return res.error('AC005') ; 
    }

    //ratacher la team a l'utilisateur courant 
    data as Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
	[ err , data ] = await to(newteam.setUser( user )) 
    if ( err ) {
    	return res.error('AC006') ; 
    }

    if ( type == 'infusionsoft' ) {
		let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+I.id  ; 
		let url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
		url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';
		return res.success(url);			
	}else{
		let redirect_uri = site.urlapp + '/application/trello/redirect/'+I.id  ; 
		let url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 
		return res.success(url);	
	}

}

export async function redirectTrello( req:Request, res:Response ) {

	//@todo: utilisation des sessions ici, vérifier que l'utilisateur a bien un session InfusionsoftNull
	//on enregistre l'accessToken du compte infusionsoft en question 
	let { Application , User , Team } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { token } = req.query ; 

	let err : any ; 
	let data  ;
	//création de compte infusionsoft 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find({ where: { id } })) 
    if ( err ) {
    	return res.error('ART001') ; 
    }
    let i = data ; 
	//récupération des utilisateur courant 
    data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    if ( err ) {
    	return res.error('ART002') ; 
    }
    let user = data ; 
	if ( token ){
	    [ err , data ] = await to( i.update({ accessToken: token }) ) ;
	    if ( err ) { 
	    	return res.error('ART004') ; 
	    }
		let urlAPI = 'https://api.trello.com/1/' ; 
		let url = urlAPI+'members/me?key='+site.trelloKey+'&token='+ token ; 
		request({
		    uri: url ,
		    method: 'GET'
		}, async function (error, _res , body) {
    		let jsonp : any; 
			try{
				jsonp = JSON.parse( body ) ; 
			}catch( e ){
				jsonp = [] ; 
			}
			let { id } = jsonp ; 
			//ajoute de l'id de l'user qui est connecté aux compte trello team 
			[ err , data ] = await to( Team.findOne({
			    where: { ApplicationId : i.id }
		    }) ) ;
		    let T = data ; 
		    [ err , data ] = await to( T.update({ contactid: id }) ) ;
			//redirection a la page home de l'application 
	  		//@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
	  		//soket ouvert de l'application 
	  		//s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application 
	  		res.redirect('/') ;
		});
	}else{
		res.render( 'trello_r.ejs' ) ; 
	}

}