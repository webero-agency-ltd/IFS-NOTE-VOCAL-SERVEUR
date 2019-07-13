var NodeCache = require( "node-cache" ); 
const cache = new NodeCache();

export function get( id , obj ) : Promise <object> {
	return new Promise<object>( async (resolve) => { 
		cache.get( id , function( err, value ){
			if( !err ){
			    if(value == undefined){
			      	resolve( obj ) ; 
			    }else{
			      	resolve( value ) ;
			    }
			}
		});
	});
}


export function set( id , obj ) : Promise <object> {
	return new Promise<object>( async (resolve) => { 
		cache.set( id , obj , function( err, value ){
	    	console.log( id , err, value )
			if( !err ){
			    if(value == undefined){
			      	resolve( null ) ; 
			    }else{
			      	resolve( value ) ;
			    }
			}
		});
	});
}