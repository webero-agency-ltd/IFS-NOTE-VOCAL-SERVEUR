import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class pour {

	constructor(){
		this.stade = {
			pours : [] , 
		}
	}

	allPour( id ){
		let [ err , { data } ] = await api( '/pour/'+id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.pours = [ ...data ]  ; 
		return [ null , this.stade.pours ]
	}

	deletePour( id ){
		let [ err , { data } ] = await api( '/pour/'+id , 'DELETE' )  ; 
		if ( err ) 
			return [ err , null ]
		return [ null , this.stade.pours ]
	}

	createPour( id , body ){
		let [ err , {data} ] = await api( '/pour/' , 'POST' , body )  ; 
		return this.allPour( id )
	}
} 