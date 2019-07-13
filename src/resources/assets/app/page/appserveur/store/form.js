import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class form {

	constructor(){
		this.stade = {
			forms : [] , 
		}
	}

	async all( id ){
		let [ err , { data } ] = await api( '/form/'+id ) ;
		console.log( err , data )
		if ( err ) 
			return [ err , null ] ; 
		return [ null , data ]
	}

	/*
	 * Création des élements de formulaire 
	*/
	async formCreate( id , body ){
		console.log( body )
		let [ err , { data } ] = await api( '/form/'+id , 'POST' , { data : body } ) ;
		console.log( err , data )
		if ( err ) 
			return [ err , null ] ; 
		return [ null , data ]
	}

} 

export default new form() ;