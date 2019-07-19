var site = require('../config/site') ;
var request = require('../libs/request') ;
var json = require('../libs/json');
var application = require('../libs/application');
var team = require('../libs/team'); 
var AppError = require('../libs/AppError');

/*
 * Classe de manipulation des actions vers trello 
*/
class trello {
	
	api : string  ;

	constructor() {
		this.api = 'https://api.trello.com/1/' ; 
	}

	/*
	 * Récupération des borads de trello  
	*/
	async boards( { token , id } ){
	    let url = this.api+'members/'+( id?id:'me' )+'/boards?key=' + site.trelloKey + '&token=' + token ; 
	    let { error, info , body } = await request.get( url ) ; 
		if ( !error && info.statusCode == 200 ) {
			let data = json( body , [] )
	    	return { success : data };
	    }
	    return { error };
	}

	async board( { token , id } ){
	    let url = this.api+'boards/'+ id +'?key=' + site.trelloKey + '&token=' + token ; 
	    let { error, info , body } = await request.get( url ) ; 
		if ( !error && info.statusCode == 200 ) {
			let data = json( body , [] )
	    	return { success : data };
	    }
	    return { error };
	}

	/*
	 * Récupération des listes de trello 
	*/
	async lists({ board , token }){
		let url = this.api + 'boards/' + board + '/lists?key=' + site.trelloKey + '&token=' + token ; 
		console.log( url )
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
	    	return { success : reponse };
	    }
	    return { error };
	}

	/*
	 * Récupération des card de trello 
	*/
	async card({ card , token }){
		let url = this.api + 'cards/' + card + '?key=' + site.trelloKey + '&token=' + token ; 
		console.log( url )
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
	    	return { success : reponse };
	    }
	    return { error };
	}


	/*
	 * Membre des board de trello
	*/
	async membres({ board , token }){
		let url = this.api + '/boards/'+ board +'/members/?token='+ token + '&key=' + site.trelloKey  ; 
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
	    	return { success : reponse };
	    }
	    return { error };
	}

	/*
	 * Liste des label de trello 
	*/
	async labels({ board , token }){
		let url = this.api+'boards/' + board + '/labels?fields=all&key=' + site.trelloKey + '&token=' + token ; 
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
	    	return { success : reponse };
	    }
	    return { error };
	}

	/*
	 * Récupération de tout les cards de trello 
	*/
	async cards({ board , token }){
		let url = this.api+'boards/' + board + '/cards?fields=all&key=' + site.trelloKey + '&token=' + token ; 
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
	    	return { success : reponse };
	    }
	    return { error };
	}

	/*
 	 * Récupération de tout les token trello
	*/
	async findtoken( { id , token } ){
	    let app = await application.item( id ) ;  
	    if ( !app )  
	    	throw new AppError('ART001');
	    //récupération de tout les card ce cette application
	    await application.update( id , { accessToken: token } )
	    let url = this.api+'members/me?key='+site.trelloKey+'&token='+ token ; 
	    let { error, info , body } = await request.get( url )
		if ( error && info.statusCode != 200 ) 
	    	throw new AppError('ART003');
	    let jsonp = json( body , [] )
	    //mise a jour de l'id utilisateur dans trello team
		await team.update( { ApplicationId : id } , { contactid : jsonp.id } ) ; 
		return true ;
	}

	/*
	 * Supression de vos webhook 
	*/
	async deleteWebhook( { board , token } ){
		let url = this.api+`tokens/${token}/webhooks/?key=${site.trelloKey}`; 
	    let { error, info , body } = await request.get( url )
		if ( error && info.statusCode != 200 ) 
	    	throw new AppError('ART004');
	    var jsonp = json( body , [] );
	    if ( jsonp.length > 0 ) {
			let url = this.api+`webhooks/${jsonp[0].id}/?key=${site.trelloKey}&token=${token}`; 
	    	await request.destroy( url )
		    let { error, info , body } = await request.get( this.api+`tokens/${token}/webhooks/?key=${site.trelloKey}` )
			if ( error && info.statusCode != 200 ) 
		    	throw new AppError('ART004');
		    var jsonp = json( body , [] );
		    if ( jsonp.length > 0 ) {
		    	throw new AppError('ART005');
		    }
	    }
	}

	/*
 	 * Ajout de webhook
	*/
	async webhook( { board , token , app } ){
		let url = this.api+`tokens/${token}/webhooks/?key=${site.trelloKey}`; 		
	    let form = {
			idModel: board , 
			description: 'Event Board Vocal Note' , 
			callbackURL: 'https://therapiequantique.net/trello/on/'+app , 
		};
		var { error, info , body } = await request.post( url , form ) ;
		if ( error && info.statusCode != 200 ) 
	    	throw new AppError('ART006');
	}

	/*
 	 * API trello création de note 
	*/
	async createCards( body , token ){
		let url = this.api+'cards?fields=all&key='+site.trelloKey+'&token='+token ; 
	    var { error, info , body } = await request.post( url , body ) ;
		if ( error && info.statusCode != 200 ) 
	    	throw new AppError('ART008');
	    return json( body , [] )
	}

	/*
	 * Récupération de l'ID de card trello a partire d'un short URL 
	*/
	async findCardIdByUrl( urlSearch , board , token ){
		let noteID = 'https://trello.com'+decodeURIComponent( urlSearch ).split('_').join('/').replace('_' , '/').normalize('NFD').replace(/[\u0300-\u036f]/g, "") 
		let url = this.api + 'boards/' + board + '/cards?fields=id,url&key=' + site.trelloKey + '&token=' + token ; 
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse = json( body , [] )
			for( let { url , id } of reponse ){
				if ( url == noteID ) {
					return id ;
				}
			}
	    }
	    return null ;
	}
	
}

module.exports = new trello() ; 