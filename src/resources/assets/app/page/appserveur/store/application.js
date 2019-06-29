import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class application {

	constructor(){
		this.stade = {
			applications : [] , 
			application : {} , 
		}
	}

	addApplication( id , option ){
		let { compteId , name , type } = option ; 
        let body = {} ;
        if ( name && compteId ) {
            body = { name , compteId , type } ; 
        }else if( name ){ 
            body = { name , type } ; 
        }else{
        	//@TODO: ajoute une erreur dans cette element 
            return [ err , null ]
        }
		let [ err , { data } ] = await api( '/application' , 'POST' , body ) ;
		if ( err ) 
			return [ err , null ]
		let win = window.open( data , '_blank');
        return win.focus();
	}

	/*
 	 * Reresh token manuelement 
	*/
	reAuthorize( id ){
		let [ err , { data } ] = await api( `/application/reauthorize/all/${id}` ) ;
		if ( err ) 
			return [ err , null ]
		let win = window.open( data, '_blank');
        return win.focus();
	}

	/*
	 * Récupération de tout les applications 
	*/
	allApplication(){
		let [ err , { data } ] = await api( '/application' ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.applications = [ ...data ]
		return [ null , this.stade.applications ]
	}

	/*
	 * Focus sur une application en particulier pour récupérer ces donners 
	*/
	itemApplication( id ){
		let [ err , { data } ] = await api( '/application/item/'+id ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.application =  Object.assign( {},{ ...data } ) ;
		return [ null , this.stade.application ]
	}
} 