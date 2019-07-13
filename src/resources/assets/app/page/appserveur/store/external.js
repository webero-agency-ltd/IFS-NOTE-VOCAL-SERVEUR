import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class external {

	constructor(){
		this.stade = {
			note: {}, 
		}
	}

	async createNote( note ){
		let [ err , { data } ] = await api( '/external/note' , 'POST' , note ) ;
		if ( err ) 
			return [ err , null ] ; 
		this.stade.external = Object.assign({},{ ...data }) ;
		return [ null , this.stade.external ]
	}

	/*
	 * Récupération des informations des note en paramètre
	*/
	async findNote(){
		
	}

} 

export default new external() ;