import api from '../libs/api' ; 
import lang from '../libs/lang' ; 

class note {

	constructor(){
		this.stade = {
			notes : [] , 
			item : {} , 
		}
	}

	async find( unique ){
		let [ err , { data } ] = await api( '/note/itenUnique/'+unique ) ;
		if ( err ) 
			return [ err , null ] ; 
		this.stade.item = Object.assign({},{ ...data }) ;
		return [ null , this.stade.item ]
	}

	/*
	 * Création de note dans l'application IFS vocal note
	*/
	async noteCreate( url , body ){
		console.log( body )
		let upload = await fetch( url , {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            body: body
        })
		if ( upload.ok ) {
            let json = null ; 
			try {
			  	json = await upload.json() ;
			} catch(e) {
			  	return [ true, null];
			}
		    if ( json && json.type == 'ERROR' ) {
		    	return [json, null];
		    }
		    if ( !json.data || (json.data && !json.data.id) ) {
		    	return [ true , null ]
		    }
		    return [null, json.data ];
        }else {
			return [ true , null ]
        }
	}

} 

export default new note() ;