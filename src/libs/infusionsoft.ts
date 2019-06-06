var site = require('../config/site') ;
var request = require('../libs/request') ;
const querystring = require('querystring');
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var json = require('../libs/json');

/*
 * Classe de manipulation des actions vers trello 
*/

class infusionsoft {
	
	api : string  ;

	constructor() {
		this.api = 'https://api.infusionsoft.com/crm/rest/v1' ; 
	}

	/*
	 * Récupération de l'access toke  
	*/
	async findtoken( { id , code } ){
	    let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+id  ;
		let url = 'https://api.infusionsoft.com/token' ; 
		let form = {
			client_id: site.clientId , 
	    	client_secret: site.clientSecret, 
	    	code , 
	    	grant_type: 'authorization_code', 
	    	redirect_uri : redirect_uri 
		};
		var { error, info , body } = await request.post( url , form ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('ARE002')
	    await application.update( id , { accessToken: body } )
	    //récupération de l'id de l'utilisateur qui a crée le token, pour l'enregistrer 
	    //dans la base de donner des contact
	    let jsont = json( body , {} ) 
		var { error, info , body } = await request.get( this.api + '/users/?access_token='+jsont['access_token'] ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('ARE004');
	    let reponse = json( body , {} )
		if ( reponse['users'] ) {
			await team.update( { ApplicationId : id } , { contactid: reponse['users'][0].id } ) ; 
			return true;
		}
	    throw new AppError('ARE005');
	}
}

module.exports = new infusionsoft() ; 