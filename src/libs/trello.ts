const site = require('../config/site') ;
const request = require('../libs/request') ;

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
	    console.log( url )
	    let { error, info , body } = await request.get( url ) ; 
	    console.log( info.statusCode )
		if ( !error && info.statusCode == 200 ) {
			let data : any[]; 
			try{
				data = JSON.parse( body ) ; 
			}catch( e ){
				data = [] ; 
			}
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
			let data : any[]; 
			try{
				data = JSON.parse( body ) ; 
			}catch( e ){
				data = [] ; 
			}
	    	return { success : data };
	    }
	    return { error };
	}

	/*
	 * Membre des board de trello
	*/
	async membres({ board , token }){
		let url = this.api + '/boards/'+ board +'/members/?token='+ token + '&key=' + site.trelloKey  ; 
		console.log( url )
		let { error, info , body } = await request.get( url )
		if ( !error && info.statusCode == 200 ) {
			let reponse : any[]; 
			try{
				reponse = JSON.parse( body ) ; 
			}catch( e ){
				reponse = [] ; 
			} 
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
		console.log( url ) 
		if ( !error && info.statusCode == 200 ) {
			let reponse : any[]; 
			try{
				reponse = JSON.parse( body ) ; 
			}catch( e ){
				reponse = [] ; 
			} 
	    	return { success : reponse };
	    }
	    return { error };
	}
}

module.exports = new trello() ; 