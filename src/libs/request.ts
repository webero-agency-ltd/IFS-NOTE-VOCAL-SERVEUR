const request = require('request');
const querystring = require('querystring');

export function get( url , headers = {} ) : Promise <object> {
	return new Promise<object>( async (resolve) => { 
		return request({
		    headers :  { 'Content-Type': 'application/json' , ...headers } ,
		    uri:url,
		    method: 'GET'
		}, function ( error, info , body ) {	
			resolve( { error, info , body } )
		});
	});
}

export function destroy( url , headers = {} ) : Promise <object> {
	return new Promise<object>( async (resolve) => { 
		return request({
		    headers :  { 'Content-Type': 'application/json' , ...headers } ,
		    uri:url,
		    method: 'DELETE'
		}, function ( error, info , body ) {	
			resolve( { error, info , body } )
		});
	});
}

export function post( url , body , headers = {} , jsforce = false ) : Promise <object> {
	let formData = querystring.stringify( body );
	let contentLength = formData.length;
	headers = {
      	//'Content-Length': contentLength,
      	'Content-Type': 'application/x-www-form-urlencoded',
      	...headers
    }
    body = jsforce==false?formData:JSON.stringify( body )
	return new Promise<object>( async (resolve) => { 
		request({
		    headers ,
		    uri: url ,
		    body ,
		    method: 'POST'
		}, async function (error, info , body) {
			resolve( { error, info , body } )  
		});
	});
}