import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class exoption {

	constructor(){
		this.stade = {
			external: { infusionsoft : null , trello : null }, 
		}
	}

	async findOption(){
		let [ err , { data } ] = await api( '/external' ) ;
		if ( err ) 
			return [ err , null ] ; 
		this.stade.external = Object.assign({},{ ...data }) ;
		return [ null , this.stade.external ]
	}

	async createOption( body ){
		let [ err , { data } ] = await api( '/external' , 'POST' , body ) ;
		if ( err ) 
			return [ err , null ] ; 
		return this.findOption() ;
	}

} 

export default new exoption() ;