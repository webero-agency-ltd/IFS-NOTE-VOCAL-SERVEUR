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

export function post( url , body , headers = {} ) : Promise <object> {
	let formData = querystring.stringify( body );
	let contentLength = formData.length;
	return new Promise<object>( async (resolve) => { 
		request({
		    headers: {
		      'Content-Length': contentLength,
		      'Content-Type': 'application/x-www-form-urlencoded',
		      ...headers
		    },
		    uri: url ,
		    body: formData,
		    method: 'POST'
		}, async function (error, info , body) {
			resolve( { error, info , body } )  
		});
	});
}