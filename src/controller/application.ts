import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
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
export function item( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Application , User } = this.db as DBInterface ;
	//récupération 
	let { id } = req.params  ;
	//@TODO : récupération de tout les autres informations de la statistique qui son utile 
	Application.find( { where: { id } } )
		.then(i => {
			res.json(i)
		})
		.catch( e => res.json({}) );
}

//récupération de tout les compte infusionsoft d'un utilisateur en question 
export function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Application , Team , User } = this.db as DBInterface ;
	//récupération 
	let id = req.user.id ;
	User.findOne({
	    where: { id }
    })
    	.then( u => {
	    	u.getTeams()
		    	.then( ts => {
			    	//on a maintenant la liste des
			    	let ifs = [] ; 
			    	ts.forEach( ( e , i ) => {
			    		e.getApplication().then( r => {
			    			let re = r.toJSON() ;	 
			    			re['user_role'] = e.role ; 
			    			ifs.push( re )
			    			if ( i == ts.length - 1 ) {
			    				return res.json( ifs );
			    			}
			    		}).catch(e=>{
			    			if ( i == ts.length - 1 ) {
			    				return res.json( ifs );
			    			}
			    		})
			    	})
				})
				.catch( e => res.json([1]));
		})
		.catch( e => res.json([3]));
	
}

//Récupération des différent information d'Infusionsoft 
export function infos( req:Request, res:Response ) {
	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	//récupération des info en utilisant l'API infusionsoft et l'accessToken 
	Application.find({ where: { id } })
    	.then(i => {
    		let token : any[]; 
			try{
				token = JSON.parse( i.accessToken ) ; 
			}catch( e ){
				token = [] ; 
			}
    		if ( i && token && token['access_token']) {
    			let url = urlAPI + '/merchants/?access_token='+token['access_token']  ; 
				request({
				    headers: {
				      'Content-Type': 'application/json'
				    },
				    uri:url,
				    method: 'GET'
				}, function (error, _res, body) {	
					if (!error && _res.statusCode == 200) {
						let reponse : any[]; 
						try{
							reponse = JSON.parse( body ) ; 
						}catch( e ){
							reponse = [] ; 
						}
						res.json( reponse )
			        }else{
			        	res.json( { error : lang['InfusionsoftAPINull'] , code : '0011'} ) 
			        }
				});
		    }else{
		    	res.json( { error : lang['MessageAppGlobalErreur'] , code : '0012'} ) 
		    }
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] , code : '0013'} ) );
}

//ici on a un redirection qui vien d'infusionsoft
export function redirect( req:Request, res:Response ) {

	//@todo: utilisation des sessions ici, vérifier que l'utilisateur a bien un session InfusionsoftNull
	//on enregistre l'accessToken du compte infusionsoft en question 
	let { Application , User } = this.db as DBInterface ;
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
	}, function (error, _res , body) {
        //ici on enregistre ce token dans la base de donner infusionsoft en particulier  
		if (!error && _res.statusCode == 200) {
            Application.find({ where: { id } })
		    	.then(i => {
		    		if (i) {
				      	return i.update({ accessToken: body })
				      	.then(t => {
				      		//redirection a la page home de l'application 
				      		//@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
				      		//soket ouvert de l'application 
				      		//s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application 
				      		res.redirect('/') ;
						})
						.catch( e => res.send( lang['InfusionsoftNull'] ) );
				    }
				})
				.catch( e => res.send( lang['InfusionsoftNull'] ) );
        }else{
        	//ici on a une erreur d'infusionsoft
        	return res.send( lang['MessageAppGlobalErreur'] ); 
        }
	});
}

//re-Récupération des url pour l'obtention des token API infusionsoft et API trello 
export function reauthorize( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { type , id } = req.params ; 

	Application.findOne({
	    where: { id }
    })
    	.then(function(I) {
    		if ( type == 'infusionsoft' ) {
				let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+I.id  ; 
				let url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
				url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';
				return res.json({success:url});			
			}else{
				let redirect_uri = site.urlapp + '/application/trello/redirect/'+I.id  ; 
				let url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 
				return res.json({success:url});	
			}
    	})
    	.catch( e => res.send( lang['InfusionsoftNull'] ) )

}


//tache chrone de mise a joure de accessToken
export function update( req:Request, res:Response ) {
	
}

//création d'URL d'authentification dans fusedesk 
export function create( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	//récupération 
	let { name , compteId , type } = req.body ; 
	let userid = req.user.id;  
	//@todo: ICI, on change le méthode de création de ID 
	//on ne sais jamain si on tombe dans deux foix sur un id unique 
	let unique = makeid(7)+'-'+makeid(7); 
	Application.create( { name , unique , compteId , type , url : '' } )
	  	.then( I => {
	  		//puis on récupère l'utilisateur actuel et attacher l'utilisateur a cette instance d'infusionsoft 
	  		//dans la table pivot 
	  		User.findOne({
			    where: { id : userid }
		    })
			    .then(function(user) {
			    	//attacher cette utilisateur a la table pivo de cette compte infusionsoft 
			    	I.setAuthor( user )
			    		.then(function() {
			    			Team.create( { role : 'admin' } )
					    		.then( newteam => {
					    			//attache le team a l'utilisateur en question 
					    			newteam.setApplication( I )
					    				.then( x => {
					    					//attache le team a infusionsoft
							    			newteam.setUser( user )
							    				.then( x => { 
							    					if ( type == 'infusionsoft' ) {
										    			let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+I.id  ; 
														let url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
														url+= '?client_id='+site.clientId+'&redirect_uri='+encodeURIComponent( redirect_uri )+'&response_type=code&scope=full';
														return res.json({success:url});			
							    					}else{
										    			let redirect_uri = site.urlapp + '/application/trello/redirect/'+I.id  ; 
														let url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&read,write=read&response_type=token&key='+site.trelloKey+'&return_url='+encodeURIComponent( redirect_uri ) ; 
														return res.json({success:url});	
							    					}
									    		})
									    		.catch( e => {
							    					return res.json({error:lang['MessageAppGlobalErreur'], code : '0005'});
												});	
							    		})
							    		.catch( e => {
							    			return res.json({error:lang['MessageAppGlobalErreur'], code : '0006'});
										});
					    		})
					    		.catch( e => {
							    	return res.json({error:lang['MessageAppGlobalErreur'], code : '0007'});
								});
			    		})
			    		.catch( e => {
							return res.json({error:lang['MessageAppGlobalErreur'], code : '0008'});
						});
			    })
			    .catch( e => {
					return res.json({error:lang['MessageAppGlobalErreur'], code : '0009'});
				});
	  	}) 
	  	.catch( e => {
	  		console.log( e )
			return res.json({error:lang['MessageAppGlobalErreur'], code : '0010'});
	  	});
}

export function redirectTrello( req:Request, res:Response ) {

	//@todo: utilisation des sessions ici, vérifier que l'utilisateur a bien un session InfusionsoftNull
	//on enregistre l'accessToken du compte infusionsoft en question 
	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { token } = req.query ; 
	if ( token ){
		Application.find({ where: { id } })
	    	.then(i => {
	    		if (i) {
			      	return i.update({ accessToken: token })
				      	.then(t => {
				      		//redirection a la page home de l'application 
				      		//@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
				      		//soket ouvert de l'application 
				      		//s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application 
				      		res.redirect('/') ;
						})
						.catch( e => res.send( lang['InfusionsoftNull'] ) );
			    }
			})
			.catch( e => res.send( lang['InfusionsoftNull'] ) );
	}else{
		res.render( 'trello_r.ejs' ) ;  
	}

}