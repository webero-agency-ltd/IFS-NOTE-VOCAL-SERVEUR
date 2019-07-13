import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class pour {

	constructor(){
		this.stade = {
			lists : [] , 
			labels : [] , 
			trello : [] , 
			infusionsoft : [] , 
		}
	} 

	filterPour(){
		if ( this.stade.lists.length ) {
			this.stade.labels = this.stade.lists.filter( e => e.type == 'label' )
			this.stade.trello = this.stade.lists.filter( e => e.type == 'trello' )
			this.stade.infusionsoft = this.stade.lists.filter( e => e.type == 'infusionsoft' )
			this.stade.infusionsoft.push({ id : 'default' , name : 'Note' })
		};
	}

	async allPour( id ){
		let [ err , { data } ] = await api( '/pour/'+id )  ; 
		if ( err ) 
			return [ err , null ]
		console.log( data )
		this.stade.lists = data ; 
		this.filterPour()
		return [ null , this.stade.lists ]
	}

	async deletePour( id ){
		let [ err , { data } ] = await api( '/pour/'+id , 'DELETE' )  ; 
		if ( err ) 
			return [ err , null ]
		return [ null , this.stade.lists ]
	}

	async createPour( body ){
		console.log( body )
		let [ err , {data} ] = await api( '/pour/' , 'POST' , body )  ; 
		return this.allPour( body.application )
	}

} 

export default new pour() ;