import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class user {

	constructor(){
		this.stade = {
			teams : [] , 
			membreTrello : [] , 
			membreInfusionsoft : [] , 
			//membre trello addable 
			membreTrelloNoteTeam : [] , 
			//membre infusionsoft addable
			membreIFSNoteTeam : [] , 
		}
	}

	/*
 	 * Récupèration de tout les teams de l'application 
	*/
	async allTeam( id ){
		let [ err , { data } ] = await api( '/team/application/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.teams = data
		return [ null , this.stade.teams ]
	}

	/*
 	 * si l'application est un trello alors Récupèration de tout les teams trello réel de l'application 
	*/
	async membreTrello( id ){
		let [ err , {data} ] = await api( '/trello/membre/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		console.log( data )
		this.stade.membreTrello = data.map(( { id , fullName }) => {
            return { id , fullName , add : id }
        })
        .filter(( { id }) => id ? true : false ) ; 
        this.membreTrelloNoteTeamFind() ; 
		return [ null , this.stade.membreTrello ]
	}

	async membreInfusionsoft( id ){
		let [ err , { data } ] = await api( '/infusionsoft/membre/'+ id )  ; 
		if ( err ) 
			return [ err , null ]
		this.stade.membreInfusionsoft = data.map(({ id , preferred_name }) => {
            return { id , fullName : preferred_name , add : id }
        })
        .filter(( { id }) => id ? true : false ) ; 
        this.membreIFSNoteTeamFind() ; 
        return [ null , this.stade.membreInfusionsoft ]
	}

	async membreIFSNoteTeamFind(){
		this.stade.membreIFSNoteTeam = this.stade.membreInfusionsoft.filter(({ id }) => {
            if ( this.stade.teams.filter((un) => {
                let unique = un.contactid ; 
                if ( id == unique ) {
                    return true;
                }
                return false ; 
            }).length > 0 ) {
                return false
            }
            return true ; 
        })
	}

	async membreTrelloNoteTeamFind(){
		this.stade.membreTrelloNoteTeam = this.stade.membreTrello.filter(( tr ) => {
			if ( this.stade.teams.filter((un) => {
	                let unique = un.contactid ;  
	                if ( tr.id == unique ) {
	                    return true;
	                }
	                return false ; 
	            }).length > 0 ) {
                return false
            }
            return true ; 
        })
    }

} 

export default new user() ;