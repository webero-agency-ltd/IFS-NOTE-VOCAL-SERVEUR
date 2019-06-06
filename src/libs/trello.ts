var site = require('../config/site') ;
var request = require('../libs/request') ;
var json = require('../libs/json');
var application = require('../libs/application');
var team = require('../libs/team');

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

	/*
	 * Récupération des listes de trello 
	*/
	async lists({ board , token }){
		let url = this.api + 'boards/' + board + '/lists?key=' + site.trelloKey + '&token=' + token ; 
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
 	 * Récupération de tout les token trello
	*/
	async findtoken( { id , token } ){
	    let app = await application.item( id ) ;  
	    if ( !app )  
	    	throw new AppError('ART001');
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
}

module.exports = new trello() ; 