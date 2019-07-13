import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class application {

	constructor(){
		this.stade = {
			applications : [] , 
			trellos : [] , 
			infusionsofts : [] , 
			item : {} , 
		}
	}

	/*
	 * Add borad a l'application trello
	*/
	async addBoard( op ){
		let { id , compte , url } = op ; 
		console.log( id , compte , url )
        let [ err , { data } ] = await api(  '/trello/boards/'+id , 'POST' , { compteId : compte , url } ) ;
        if ( err ) 
			return [ err , null ]
       	return [ null , true ]
	}

	async destroyApplication( id ){
        let [ err , { data } ] = await api( '/application/delete/'+id , 'DELETE' ) ;
        if ( err ) 
			return [ err , null ]
       	return [ null , true ]
	}

	async addApplication( option ){
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
	async reAuthorize( id ){
		let [ err , { data } ] = await api( `/application/reauthorize/all/${id}` ) ;
		if ( err ) 
			return [ err , null ]
		let win = window.open( data, '_blank');
        return win.focus();
	}

	/*
	 * Récupération de tout les applications 
	*/
	async allApplication(){
		let [ err , { data } ] = await api( '/application' ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.applications = [ ...data ]
		this.trellos()
		this.infusionsofts()
		return [ null , this.stade.applications ]
	}

	/*
	 * Focus sur une application en particulier pour récupérer ces donners 
	*/
	async itemApplication( id ){
		let [ err , { data } ] = await api( '/application/item/'+id ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.item =  Object.assign( {},{ ...data } ) ;
		return [ null , this.stade.item ]
	}

	/*
	 * Liste de tout les applications trellos 
	*/
	trellos(){
		if ( this.stade.applications.length ) {
			return this.stade.trellos = this.stade.applications.filter( e => e.type == 'trello' )
		}
		return [] ; 
	}

	/*
	 * Liste de tout les applications infusionsoft  
	*/
	infusionsofts(){
		if ( this.stade.applications.length ) {
			return this.stade.infusionsofts = this.stade.applications.filter( e => e.type == 'infusionsoft' )
		}
		return [] ; 
	}
} 

export default new application() ;