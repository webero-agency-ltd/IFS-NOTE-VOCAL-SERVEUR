import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class exoption {

	constructor(){
		this.stade = {
			external: { infusionsoft : null , trello : null }, 
		}
	}

	findOption(){
		let [ err , { data } ] = await api( '/external' ) ;
		if ( err ) 
			return [ err , null ] ; 
		this.stade.external = Object.assign({},{ ...data }) ;
		return [ null , this.stade.external ]
	}

	createOption(){
		let [ err , { data } ] = await api( '/external/note' , 'POST' , op ) ;
		if ( err ) 
			return [ err , null ] ; 
		return this.findOption() ;
	}

} 