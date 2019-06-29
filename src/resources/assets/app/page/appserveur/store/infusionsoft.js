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
	allContact( id ){
		let [ err , { data } ] = await api( '/infusionsoft/contacts/' + id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.contacts = [ ...data ]
		return [ null , this.stade.contacts ]
	}

} 