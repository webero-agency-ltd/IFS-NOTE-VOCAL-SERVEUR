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
	 * Récupération des membres d'infusionsoft 
	*/
	async membre( id ){
	    let app = await application.item( id )
	    let jsont = json( app.accessToken , {} ) 
		var { error, info , body } = await request.get( this.api + '/users/?access_token='+jsont['access_token'] ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('IM0003');
	    let reponse = json( body , {} ) ; 
		return reponse['users']?reponse['users']:[];
	}

	/*
	 * Récupération des listes des contacts d'infusionsoft 
	*/
	async contacts( id ){
	    let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
		var { error, info , body } = await request.get( this.api + '/contacts/?access_token='+token['access_token'] ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('IC0003');
	    let reponse = json( body , {} ) ; 
		return reponse['contacts']?reponse['contacts'].map( function (e) {
			return { text : e.family_name + ' ' + e.given_name , value : e.id , ...e }
		}):[];
	}

	/*
	 * Récupération des listes des contacts d'infusionsoft 
	*/
	async notes( id , note ) {
	    let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
	    var { error, info , body } = await request.get( this.api + '/notes/'+note+'/?access_token='+token['access_token'] ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('IC0007');
	    let reponse = json( body , {} ) ;
		return reponse.id?reponse:{};
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

	/*
	 *	Création de tache infusionsoft 
	*/
	async createTasks( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/tasks/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0005');
	    return json( body , {} );
	}

	/*
	 *	Création de notes infusionsoft 
	*/
	async createNotes( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/notes/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0007');
	    return json( body , {} );
	}
}

module.exports = new infusionsoft() ; 