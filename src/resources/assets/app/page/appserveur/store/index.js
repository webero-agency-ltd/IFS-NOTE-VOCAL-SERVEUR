import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class index {

	constructor(){
		this.stade = {
			forms : [] , 
		}
	}

	async setFlash( body ){
		let [ err , { data } ] = await api( '/flash' , 'POST' , body ) ;
		if ( err ) 
			return [ err , null ] ; 
		return [ null , data ]
	}

} 

export default new index() ;