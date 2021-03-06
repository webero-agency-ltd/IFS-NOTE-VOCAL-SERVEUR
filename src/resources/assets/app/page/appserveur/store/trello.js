import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class trello {

	constructor(){
		this.stade = {
			boards : [] , 
			lists : [] , 
			labels : [] , 
		}
	}

	/*
 	 * Récupèration de tout les boards de trello 
	*/
	async allBoard( id ){
		let [ err , { data } ] = await api( '/trello/boards/'+ id ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.boards = data.map(( { id , name , url } ) => {
            return { id , title: name,  url }
        })
		return [ null , this.stade.boards ]
	}

	/*
	 * Récupération de tout les label de trello 
	*/
	async allList( id ){
		let [ err , { data } ] = await api( '/trello/lists/'+id ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.lists = data.map(( { id , name } ) => {
            return { value : id , text: name }
        })
		return [ null , this.stade.lists ]
	}

	/*
	 * Récupération de label de trello  
	*/
	async allLabel( id ){
		let [ err , { data } ] = await api( '/trello/label/'+id ) ;
		if ( err ) 
			return [ err , null ]
		this.stade.labels = data.map(( { id , name } ) => {
            return { value : id , text: name }
        })
		return [ null , this.stade.labels ]
	}

	/*
	 * Ajoute de card dans trello
	*/
	async card( body ){
		console.log( body )
		let [ err , { data } ] = await api( '/trello/card' , 'POST' , body  ) ;
		if ( err ) 
			return [ err , null ]
		return [ null , data ]
	}

	async cardUpdate( body , update ){
		console.log( 'cardUpdate' , body )
		let [ err , { data } ] = await api( '/trello/card' , 'PUT' , body  ) ;
		if ( err ) 
			return [ err , null ]
		return [ null , data ]
	}

	async itemCard( id , appId ){
		let [ err , { data } ] = await api( '/trello/card/' + id  + '/?appId='+appId )  ; 
		if ( err ) 
			return [ err , null ]
		return  [ err , data ]
	}
	
} 


export default new trello() ;