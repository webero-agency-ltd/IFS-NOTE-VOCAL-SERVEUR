import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class infusionsoft {

	constructor(){
		this.stade = {
			contacts : [] , 
		}
	}

	/*
 	 * Récupèration de tout les boards de trello 
	*/
	async allContact( id , text = '' , def = null ){
		let [ err , { data } ] = await api( `/infusionsoft/contacts/${id}?size=20&text=${text}&page=1&def=${def}` )  ; 
		console.log( data )
		if ( err ) 
			return [ err , null ]
		this.stade.contacts = [] ; 
		this.stade.contacts = [ ...data['data'] ]
		return [ null , data ]
	}

	/*
	 * Récupération de la liste suivant d'un liste de trello  
	*/
	async moreContact( id , text , page , def = null ){
		let [ err , { data } ] = await api( `/infusionsoft/contacts/${id}?size=20&text=${text}&page=${page}&def=${def}` )  ; 
		console.log( data )
		if ( err ) 
			return [ err , null ]
		let contact = this.stade.contacts ; 
		this.stade.contacts = [] ; 
		this.stade.contacts = [ ...contact , ...data['data'] ]
		return [ null , data ]
	}

	/*
	 * Création de notes infusionsoft 
	*/
	async note( body ){
		let [ err , { data } ] = await api(  '/infusionsoft/note/' , 'POST' , body )  ; 
		if ( err || !data || ( data && !data.id )) 
			return [ err?err:data , null ]
		return [ null , data ]
	}

	async itemNote( id , appId ){
		let [ err , { data } ] = await api( '/infusionsoft/note/' + id + '/?appId='+appId )  ; 
		console.log( err , data )
		if ( err ) 
			return [ err , null ]
		return  [ err , data ]
	}

	async itemTask( id , appId ){
		let [ err , { data } ] = await api( '/infusionsoft/task/' + id + '/?appId='+appId )  ; 
		console.log( err , data )
		if ( err ) 
			return [ err , null ]
		return  [ err , data ]
	}
	
}

export default new infusionsoft() ;