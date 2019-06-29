import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class user {

	constructor(){
		this.stade = {
			teams : [] , 
			membreTrello : [] , 
			membreInfusionsoft : [] , 
		}
	}

	/*
 	 * Récupèration de tout les teams de l'application 
	*/
	allTeam( id ){
		let [ err , {data} ] = await api( '/team/application/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.teams = data.map(( { contactid , fullname , email , role } ) => {
            return { id : contactid , fullname , email , role }
        })
		return [ null , this.stade.teams ]
	}

	/*
 	 * si l'application est un trello alors Récupèration de tout les teams trello réel de l'application 
	*/
	membreTrello( id ){
		let [ err , {data} ] = await api( '/trello/membre/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.membreTrello = data.map(( { id , fullName }) => {
            return { id , fullName , add : id }
        })
        .filter(( { id }) => id ? true : false ) ; 
		return [ null , this.stade.membreTrello ]
	}

	membreInfusionsoft( id ){
		let [ err , { data } ] = await api( '/infusionsoft/membre/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.membreInfusionsoft = data.map(({ id , preferred_name }) => {
            return { id , fullName : preferred_name , add : id }
        })
        .filter(( { id }) => id ? true : false ) ; 
		return [ null , this.stade.membreInfusionsoft ]
	}
} 